import { cellHasLetter } from "./helpers";
import { getWords } from "./words";

const cache = {};
const fetchWordListMemoized = async () => {
	return async (word) => {
		const wordLength = word.length;
		if (wordLength in cache) {
			return cache[wordLength];
		} else {
			const resource = `./wordLists/${wordLength}-letter-words.json`;
			const response = await fetch(resource);
			const wordList = await response.json();
			cache[wordLength] = wordList;

			return wordList;
		}
	};
};

const isAMatch = (lettersArray, wordString) =>
	lettersArray.every(
		(letter, index, array) =>
			array[index] === wordString[index] || array[index] === ""
	);

const getWordMatches = (word, sameLengthWords) => {
	if (!word) return;
	if (word.length < 3) return;
	const wordLetters = word.map((cell) => cell.letter);
	const wordMatches = sameLengthWords.filter((obj) => {
		const testWord = obj.word;
		if (isAMatch(wordLetters, testWord) && !/\d+/.test(testWord)) return true;
		return false;
	});

	return wordMatches;
};

const getWordsWithMatches = async (words) => {
	const getWordList = await fetchWordListMemoized();
	const wordsWithMatches = await Promise.all(
		words.map(async (word, index, array) => {
			const wordList = await getWordList(word);
			const wordMatches = getWordMatches(word, wordList);
			if (wordMatches.length < 1 && array[index].every(cellHasLetter)) {
				const wordMatches = [
					{
						word: array[index].map((cell) => cell.letter).join(""),
						score: "101",
					},
				];

				return { wordCells: word, wordMatches };
			} else {
				return { wordCells: word, wordMatches };
			}
		})
	);

	return wordsWithMatches;
};

const formatCells = (cells) => {
	const formattedCells = cells.map((cell) => {
		if (!cell.isBlackSquare) {
			const options = cell.letter ? [`${cell.letter}`] : [];
			return { id: cell.id, letter: cell.letter, options };
		} else {
			return { id: cell.id, isBlackSquare: true };
		}
	});

	return formattedCells;
};

const formatWords = (words, formattedCells) => {
	const formattedWords = words.map((word) =>
		word.map((cell) => {
			const formattedCell = formattedCells.find(
				(formattedCell) => formattedCell.id === cell.id
			);

			return formattedCell;
		})
	);

	return formattedWords;
};

const getFormattedWords = (cells, formattedCells) => {
	const initAcrossWords = getWords("across", cells);
	const initDownWords = getWords("down", cells);
	const formattedCellsSliced = formattedCells.slice();
	const acrossWords = formatWords(initAcrossWords, formattedCellsSliced);
	const downWords = formatWords(initDownWords, formattedCellsSliced);

	return { acrossWords, downWords };
};

const updateOptsFromMatches = (wordWithMatches) => {
	const { wordCells, wordMatches } = wordWithMatches;
	const wordCellsWithOpts = [];
	for (let i = 0; i < wordCells.length; i++) {
		const letters = wordMatches.map(({ word }) => word[i]);
		const wordCellWithOpts = {
			...wordCells[i],
			options: [...new Set(letters)],
		};
		wordCellsWithOpts.push(wordCellWithOpts);
	}
	const updatedWordWithMatches = {
		...wordWithMatches,
		wordCells: wordCellsWithOpts,
	};

	return updatedWordWithMatches;
};

const getOptsFromWordObjs = (wordObjs, formattedCell) => {
	const wordObj = wordObjs.find((wordObj) =>
		wordObj.wordCells.find((wordCell) => wordCell.id === formattedCell.id)
	);
	const wordCellIndex = wordObj.wordCells.findIndex(
		(wordCell) => wordCell.id === formattedCell.id
	);
	const opts = wordObj.wordCells[wordCellIndex].options;

	return opts;
};

const getOverlapOpts = (
	acrossWordsWithMatches,
	downWordsWithMatches,
	formattedCells
) => {
	const overlapOpts = formattedCells.map((formattedCell) => {
		if (formattedCell.isBlackSquare) return formattedCell;
		const acrossWordObjOpts = getOptsFromWordObjs(
			acrossWordsWithMatches,
			formattedCell
		);
		const downWordObjOpts = getOptsFromWordObjs(
			downWordsWithMatches,
			formattedCell
		);
		const opts = acrossWordObjOpts.filter((acrossOpt) =>
			downWordObjOpts.includes(acrossOpt)
		);

		return { ...formattedCell, options: opts };
	});

	return overlapOpts;
};

const isSameCell = (cell1, cell2) => cell1.id === cell2.id;

const findSameCell = (searchedCells, compareCell) =>
	searchedCells.find((searchedCell) => isSameCell(searchedCell, compareCell));

// getWordObjsWithOptsFromComp
const getWordObjsWithOverlapOpts = (wordObjs, overlapOpts) => {
	const wordObjsWithOverlapOpts = wordObjs.map((wordObj) => {
		const updatedWordCells = wordObj.wordCells.map((wordCell) => {
			const sameCellOverlap = findSameCell(overlapOpts, wordCell);

			return sameCellOverlap
				? { ...wordCell, options: sameCellOverlap.options }
				: wordCell;
		});

		return { ...wordObj, wordCells: updatedWordCells };
	});

	return wordObjsWithOverlapOpts;
};

const getLetterBlock = (opts) => `[${opts.join("")}]`;

const getWordRegExp = (wordWithMatches) => {
	const letterBlocks = wordWithMatches.wordCells.map((wordCell) =>
		getLetterBlock(wordCell.options)
	);
	const wordRegExp = new RegExp(letterBlocks.join(""));

	return wordRegExp;
};

/* const filterWordMatches = (wordObjs) => {
	const wordObjsWithFilteredMatches = wordObjs.map((wordObj) => {
		const wordRegExp = getWordRegExp(wordObj);
		const filteredWordMatches = wordObj.wordMatches.filter(({ word }) =>
			wordRegExp.test(word)
		);

		return { ...wordObj, wordMatches: filteredWordMatches };
	});

	return wordObjsWithFilteredMatches;
}; */
const filterWordMatches = async (wordObjs) => {
	try {
		const wordObjsWithFilteredMatches = await Promise.all(
			wordObjs.map(async (wordObj) => {
				const wordRegExp = getWordRegExp(wordObj);
				const filteredWordMatches = await Promise.all(
					wordObj.wordMatches.filter(({ word }) => wordRegExp.test(word))
				);

				return { ...wordObj, wordMatches: filteredWordMatches };
			})
		);

		return wordObjsWithFilteredMatches;
	} catch (error) {
		console.log(error);
		return;
	}
};

const updateWordObjs = async (wordObjsWithOptsFromMatches, overlapOpts) => {
	const wordObjsWithOverlapOpts = getWordObjsWithOverlapOpts(
		wordObjsWithOptsFromMatches,
		overlapOpts
	);
	const wordObjsWithFilteredMatches = await filterWordMatches(
		wordObjsWithOverlapOpts
	);

	return wordObjsWithFilteredMatches;
};

const getUpdatedWordObjs = async (
	acrossWordObjs,
	downWordObjs,
	formattedCells
) => {
	const acrossWordObjsWithOptsFromMatches = acrossWordObjs.map(
		(acrossWordObj) => updateOptsFromMatches(acrossWordObj)
	);
	const downWordObjsWithOptsFromMatches = downWordObjs.map((downWordObj) =>
		updateOptsFromMatches(downWordObj)
	);
	const overlapOpts = getOverlapOpts(
		acrossWordObjsWithOptsFromMatches,
		downWordObjsWithOptsFromMatches,
		formattedCells
	);
	const updatedAcrossWordObjs = await updateWordObjs(
		acrossWordObjsWithOptsFromMatches,
		overlapOpts
	);
	const updatedDownWordObjs = await updateWordObjs(
		downWordObjsWithOptsFromMatches,
		overlapOpts
	);

	return {
		acrossWordObjs: updatedAcrossWordObjs,
		downWordObjs: updatedDownWordObjs,
	};
};

const getWordObjConstraints = (wordObjs) => {
	const avgOptsPerCell = wordObjs.map((wordObj) => {
		const cellOpts = wordObj.wordCells.map(({ options }) => options);
		const optsTotal = cellOpts.reduce(
			(accumulator, currentValue) => currentValue.length + accumulator,
			0
		);
		const avgOpts = Math.round(optsTotal / wordObj.wordCells.length);

		return { wordObj, avgOpts };
	});

	return avgOptsPerCell;
};

const getUnfilledWordObjs = (wordObjs) =>
	wordObjs.filter(({ wordCells }) =>
		wordCells.some((wordCell) => !cellHasLetter(wordCell))
	);

const getNextWordToFill = (wordObjs) => {
	const unfilledWordObjs = getUnfilledWordObjs(wordObjs);
	const longUnfilledWordObjs = unfilledWordObjs.filter(
		(wordObj) => wordObj.wordCells.length > 7
	);
	const wordObjsToConstrain =
		longUnfilledWordObjs.length > 0 ? longUnfilledWordObjs : unfilledWordObjs;
	const constraints = getWordObjConstraints(wordObjsToConstrain).sort(
		(a, b) => a.avgOpts - b.avgOpts
	);
	const nextWordToFill = constraints[0];

	return nextWordToFill?.wordObj;
};

const getFilledWordObj = (wordWithMatches, matchIndex = 0) => {
	const { wordCells, wordMatches } = wordWithMatches;
	const wordMatch = wordMatches[matchIndex];
	const wordCellsFilled = wordCells.map((wordCell, index) => {
		const letter = wordMatch.word[index];

		return { ...wordCell, letter, options: [...letter] };
	});
	const filledWordObj = {
		wordCells: wordCellsFilled,
		wordMatches: [wordMatch],
	};

	return filledWordObj;
};

const isSameWord = (word1Cells, word2Cells) =>
	word1Cells.every((word1Cell, index) =>
		isSameCell(word1Cell, word2Cells[index])
	);

const getCrossingWordObjs = (filledWordObj, wordObjs) => {
	const crossingWordObjs = wordObjs.filter(({ wordCells }) => {
		if (isSameWord(filledWordObj.wordCells, wordCells)) return false;

		return wordCells.find((wordCell) => {
			const sameWordCell = filledWordObj.wordCells.find((filledWordCell) =>
				isSameCell(filledWordCell, wordCell)
			);

			return sameWordCell ? true : false;
		});
	});

	return crossingWordObjs;
};
const addFilledWordCellsToCrossingWordObjs = (
	filledWordObj,
	crossingWordObjs
) => {
	const { wordCells: filledWordCells } = filledWordObj;
	const updatedCrossingWordObjs = crossingWordObjs.map((crossingWordObj) => {
		const updatedCrossingWordCells = crossingWordObj.wordCells.map(
			(crossingWordCell) => {
				const sameWordCell = filledWordCells.find((filledWordCell) =>
					isSameCell(filledWordCell, crossingWordCell)
				);

				return sameWordCell ?? crossingWordCell;
			}
		);

		return { ...crossingWordObj, wordCells: updatedCrossingWordCells };
	});

	return updatedCrossingWordObjs;
};

const integrateWordObjs = (updatedWordObjs, baseWordObjs) => {
	return baseWordObjs.map((baseWordObj) => {
		const sameWordObj = updatedWordObjs.find(
			({ wordCells: updatedWordCells }) =>
				isSameWord(updatedWordCells, baseWordObj.wordCells)
		);

		return sameWordObj ?? baseWordObj;
	});
};

const getIntegratedWordObjs = (
	updatedWordObjs,
	acrossWordObjs,
	downWordObjs
) => {
	const acrossWordObjsIntegrated = integrateWordObjs(
		updatedWordObjs,
		acrossWordObjs
	);
	const downWordObjsIntegrated = integrateWordObjs(
		updatedWordObjs,
		downWordObjs
	);

	return { acrossWordObjsIntegrated, downWordObjsIntegrated };
};

const getCellsFromWordObjs = (wordObjs) =>
	wordObjs.map(({ wordCells }) => wordCells).flat();

const cellsHaveSameOpts = (cell1, cell2) =>
	cell1.options.every((cell1Opt) => cell2.options.includes(cell1Opt));

const getUpdatedFormattedCells = (
	formattedCells,
	acrossWordObjs,
	downWordObjs
) => {
	const updatedFormattedCells = formattedCells.map((formattedCell) => {
		if (formattedCell.isBlackSquare) return formattedCell;

		const acrossCells = getCellsFromWordObjs(acrossWordObjs);
		const downCells = getCellsFromWordObjs(downWordObjs);
		const sameAcrossCell = acrossCells.find((acrossCell) =>
			isSameCell(acrossCell, formattedCell)
		);
		const sameDownCell = downCells.find((downCell) =>
			isSameCell(downCell, formattedCell)
		);
		const cellsAgree =
			sameAcrossCell.letter === sameDownCell.letter &&
			cellsHaveSameOpts(sameAcrossCell, sameDownCell);

		if (!cellsAgree) {
			throw new Error("Cells don't agree");
		} else {
			return sameAcrossCell;
		}
	});

	return updatedFormattedCells;
};

const hasUntestedWordMatches = (wordObj, wordMatchIndex) =>
	wordMatchIndex < wordObj.wordMatches.length;

const hasMatchlessWordObj = (wordObjs) =>
	wordObjs.some(({ wordMatches }) => wordMatches.length < 1);

const getMatchlessWordObjs = (wordObjs) =>
	wordObjs.filter(({ wordMatches }) => wordMatches.length < 1);

const getPreviousArgsIndex = (argsArr, wordToFill) =>
	argsArr.findLastIndex(
		(argsObj) =>
			!isSameWord(argsObj.wordToFill.wordCells, wordToFill.wordCells) &&
			hasUntestedWordMatches(argsObj.wordToFill, argsObj.wordMatchIndex)
	);

const updateWordMatchIndexOfArgs = (args) => {
	return { ...args, wordMatchIndex: args.wordMatchIndex + 1 };
};

// const getPreviousArgsArr = (argsArr, previousArgsIndex, updatedPreviousArgs) =>
// 	argsArr.slice(0, previousArgsIndex).concat(updatedPreviousArgs);
const getPreviousArgsArr = (argsArr, previousArgsIndex) =>
	argsArr.slice(0, previousArgsIndex);

const getPreviousData = (currentArgsArr, wordToFill) => {
	const previousArgsIndex = getPreviousArgsIndex(currentArgsArr, wordToFill);
	const previousArgs = currentArgsArr[previousArgsIndex];
	const updatedPreviousArgs =
		previousArgs && updateWordMatchIndexOfArgs(previousArgs);
	// const previousArgsArr = getPreviousArgsArr(
	// 	currentArgsArr,
	// 	previousArgsIndex,
	// 	updatedPreviousArgs
	const previousArgsArr = getPreviousArgsArr(currentArgsArr, previousArgsIndex);

	return {
		argsIndex: previousArgsIndex,
		args: previousArgs,
		updatedArgs: updatedPreviousArgs,
		argsArr: previousArgsArr,
	};
};

const updateArgsArr = (argsArr) => argsArr.slice(0, -1);

/* const backtrack = (previousArgs, previousArgsArr, setCells) => {
	if (!previousArgs) return "(!previousArgs) No solutions found";

	if (
		hasUntestedWordMatches(previousArgs.wordToFill, previousArgs.wordMatchIndex)
	) {
		const updatedPreviousArgs = updateWordMatchIndexOfArgs(previousArgs);

		return autofillGrid(
			{ ...updatedPreviousArgs, argsArr: previousArgsArr },
			setCells
		);
	} else {
		const nextPreviousData = getPreviousData(
			previousArgsArr,
			previousArgs.wordToFill
		);
		if (nextPreviousData.argsIndex < 0)
			return "(nextPreviousArgsIndex < 0) No solutions found";

		return autofillGrid(
			{
				...nextPreviousData.updatedArgs,
				argsArr: nextPreviousData.argsArr,
			},
			setCells
		);
	}
}; */

/* const backtrack2 = (previousData, setCells) => {
	if (!previousData.args) return "(!previousArgs) No solutions found";

	return autofillGrid(
		{ ...previousData.updatedArgs, argsArr: previousData.argsArr },
		setCells
	);
}; */

const backtrack3 = async (previousData, setCells) => {
	if (!previousData.args) return "(!previousArgs) No solutions found";

	return await autofillGrid2(
		{ ...previousData.updatedArgs, argsArr: previousData.argsArr },
		setCells
	);
};

const doIntersect = (wordObj1, wordObj2) => {
	return wordObj1.wordCells.some((word1Cell) => {
		const sameCell = wordObj2.wordCells.find(
			(word2Cell) => word2Cell.id === word1Cell.id
		);

		return sameCell ? true : false;
	});
};

const shouldJumpBack = (matchlessWordObjs, filledWordObj, crossingWordObjs) => {
	const intersectionResults = matchlessWordObjs.map((matchlessWordObj) =>
		[...crossingWordObjs, filledWordObj].some((wordObj) =>
			doIntersect(wordObj, matchlessWordObj)
		)
	);
	console.log({ intersectionResults });
	// return intersectionResults.every((result) => !result);
	return intersectionResults.some((result) => !result);
};

const jumpBack = async (causeIndex, currentArgsArr, setCells) => {
	const jumpBackIndex = currentArgsArr.findLastIndex(
		(argsObj, index) =>
			index <= causeIndex &&
			hasUntestedWordMatches(argsObj.wordToFill, argsObj.wordMatchIndex)
	);
	const jumpBackArgs = currentArgsArr[jumpBackIndex];
	const updatedJumpBackArgs = updateWordMatchIndexOfArgs(jumpBackArgs);
	const previousArgsArr = getPreviousArgsArr(currentArgsArr, jumpBackIndex);

	return await autofillGrid2(
		{ ...updatedJumpBackArgs, argsArr: previousArgsArr },
		setCells
	);
};

/* const lookAhead = (
	// wordObjs,
	{
		wordToFill,
		wordMatchIndex,
		initialArgs,
		argsArr,
		previousArgs,
		previousArgsArr,
	},
	setCells
) => {
	// if (!hasMatchlessWordObj(wordObjs)) return;

	if (hasUntestedWordMatches(wordToFill, wordMatchIndex)) {
		return autofillGrid(
			{
				...updateWordMatchIndexOfArgs(initialArgs),
				argsArr,
			},
			setCells
		);
	} else {
		console.log("lookAhead backtrack 1", { previousArgs });
		return backtrack(previousArgs, previousArgsArr, setCells);
	}
}; */

/* const lookAhead2 = (
	{ wordToFill, wordMatchIndex, initialArgs, argsArr, previousData },
	setCells
) => {
	if (hasUntestedWordMatches(wordToFill, wordMatchIndex)) {
		return autofillGrid(
			{
				...updateWordMatchIndexOfArgs(initialArgs),
				argsArr,
			},
			setCells
		);
	} else {
		console.log("lookAhead backtrack2");
		return backtrack2(previousData, setCells);
	}
}; */

const lookAhead3 = async ({ initialArgs, argsArr, previousData }, setCells) => {
	const { wordToFill, wordMatchIndex } = initialArgs;

	if (hasUntestedWordMatches(wordToFill, wordMatchIndex)) {
		return await autofillGrid2(
			{
				...updateWordMatchIndexOfArgs(initialArgs),
				argsArr: updateArgsArr(argsArr),
			},
			setCells
		);
	} else {
		console.log("lookAhead3, backtrack3");
		return await backtrack3(previousData, setCells);
	}
};

const wordCellsAreFilled = ({ wordCells }) => wordCells.every(cellHasLetter);

const gridIsFilled = (wordObjs) => wordObjs.every(wordCellsAreFilled);

const everyWordObjHasMatch = (wordObjs) =>
	wordObjs.every(({ wordMatches }) => wordMatches.length === 1);

const updateGrid = async (formattedCells, setCells) =>
	setCells((prevState) => {
		const newState = prevState.map((cell, index) => {
			if (cell.isBlackSquare) return cell;
			return { ...cell, letter: formattedCells[index].letter };
		});

		return newState;
	});

/* const handleNoNextWordToFill = (
	allUpdatedWordObjs,
	updatedFormattedCells,
	updatedWordObjs
) => {
	if (gridIsFilled(allUpdatedWordObjs)) {
		console.log("SOLUTION FOUND");

		return { updatedFormattedCells, updatedWordObjs };
	} else {
		return "!nextWordToFill, not every cell has a letter";
	}
}; */

/* const handleNextWordToFill = (
	nextWordToFill,
	autofillGridArgsObj,
	{
		wordToFill,
		wordMatchIndex,
		initialArgs,
		argsArr,
		previousArgs,
		previousArgsArr,
	},
	setCells
) => {
	if (hasUntestedWordMatches(nextWordToFill, 0)) {
		return autofillGrid(autofillGridArgsObj, setCells);
	} else {
		if (hasUntestedWordMatches(wordToFill, wordMatchIndex)) {
			return autofillGrid(
				{ ...updateWordMatchIndexOfArgs(initialArgs), argsArr },
				setCells
			);
		} else {
			console.log("backtrack 3");
			return backtrack(previousArgs, previousArgsArr);
		}
	}
}; */

const getUpdatedCrossingWordObjs = async (filledWordObj, crossingWordObjs) => {
	const crossingWordObjsWithFilledWordCells =
		addFilledWordCellsToCrossingWordObjs(filledWordObj, crossingWordObjs);
	const crossingWordObjsFiltered = await filterWordMatches(
		crossingWordObjsWithFilledWordCells
	);
	const updatedCrossingWordObjs = crossingWordObjsFiltered.map(
		updateOptsFromMatches
	);

	return updatedCrossingWordObjs;
};

/* const getUpdatedWordObjsWrapper = async ({
	formattedCells,
	acrossWordObjs,
	downWordObjs,
	wordToFill,
	wordMatchIndex,
}) => {
	const allWordObjs = [...acrossWordObjs, ...downWordObjs];
	const filledWordObj = getFilledWordObj(wordToFill, wordMatchIndex);
	const crossingWordObjs = getCrossingWordObjs(filledWordObj, allWordObjs);
	console.log({ filledWordObj, crossingWordObjs });
	const updatedCrossingWordObjs = await getUpdatedCrossingWordObjs(
		filledWordObj,
		crossingWordObjs
	);
	console.log({ updatedCrossingWordObjs });
	const { acrossWordObjsIntegrated, downWordObjsIntegrated } =
		getIntegratedWordObjs(
			[...updatedCrossingWordObjs, filledWordObj],
			acrossWordObjs,
			downWordObjs
		);
	const updatedWordObjs = await getUpdatedWordObjs(
		acrossWordObjsIntegrated,
		downWordObjsIntegrated,
		formattedCells
	);
	console.log({ updatedWordObjs });
	console.log(
		`hasMatchlessWordObj: 
		(updatedCrossingWordObjs): ${hasMatchlessWordObj(updatedCrossingWordObjs)},
		(updatedWordObjs): ${hasMatchlessWordObj([
			...updatedWordObjs.acrossWordObjs,
			...updatedWordObjs.downWordObjs,
		])}`
	);

	return updatedWordObjs;
}; */
const getUpdatedWordObjsWrapper2 = async ({
	formattedCells,
	acrossWordObjs,
	downWordObjs,
	filledWordObj,
	updatedCrossingWordObjs,
}) => {
	const { acrossWordObjsIntegrated, downWordObjsIntegrated } =
		getIntegratedWordObjs(
			[...updatedCrossingWordObjs, filledWordObj],
			acrossWordObjs,
			downWordObjs
		);
	const updatedWordObjs = await getUpdatedWordObjs(
		acrossWordObjsIntegrated,
		downWordObjsIntegrated,
		formattedCells
	);
	console.log({ updatedWordObjs });
	console.log(
		`hasMatchlessWordObj: 
		(updatedCrossingWordObjs): ${hasMatchlessWordObj(updatedCrossingWordObjs)},
		(updatedWordObjs): ${hasMatchlessWordObj([
			...updatedWordObjs.acrossWordObjs,
			...updatedWordObjs.downWordObjs,
		])}`
	);

	return updatedWordObjs;
};

const handleNextWordToFill = async (
	{ updatedFormattedCells, updatedWordObjs, nextWordToFill },
	{ initialArgs, previousData },
	argsArr,
	setCells
) => {
	const { acrossWordObjs, downWordObjs } = updatedWordObjs;

	if (!nextWordToFill) {
		const allUpdatedWordObjs = [...acrossWordObjs, ...downWordObjs];

		if (!gridIsFilled(allUpdatedWordObjs)) return "!nextWordToFill";
		return { updatedFormattedCells, updatedWordObjs };
	} else {
		if (hasUntestedWordMatches(nextWordToFill, 0)) {
			return await autofillGrid2(
				{
					formattedCells: updatedFormattedCells,
					acrossWordObjs: updatedWordObjs.acrossWordObjs,
					downWordObjs: updatedWordObjs.downWordObjs,
					wordToFill: nextWordToFill,
					wordMatchIndex: 0,
					argsArr,
				},
				setCells
			);
		} else {
			return await lookAhead3({ initialArgs, argsArr, previousData }, setCells);
		}
	}
};

const getConsoleGrid = (formattedCells) => {
	const l = (index) => {
		const letter = formattedCells[index].letter;
		const isBlackSquare = formattedCells[index].isBlackSquare;

		return isBlackSquare ? "#" : letter ? letter : " ";
	};

	const consoleGrid = `
	0   |${l(0)}|${l(1)}|${l(2)}|${l(3)}|${l(4)}|${l(5)}|${l(6)}|${l(7)}|${l(
		8
	)}|${l(9)}|${l(10)}|${l(11)}|${l(12)}|${l(13)}|${l(14)}|
	15  |${l(15)}|${l(16)}|${l(17)}|${l(18)}|${l(19)}|${l(20)}|${l(21)}|${l(
		22
	)}|${l(23)}|${l(24)}|${l(25)}|${l(26)}|${l(27)}|${l(28)}|${l(29)}|
	30  |${l(30)}|${l(31)}|${l(32)}|${l(33)}|${l(34)}|${l(35)}|${l(36)}|${l(
		37
	)}|${l(38)}|${l(39)}|${l(40)}|${l(41)}|${l(42)}|${l(43)}|${l(44)}|
	45  |${l(45)}|${l(46)}|${l(47)}|${l(48)}|${l(49)}|${l(50)}|${l(51)}|${l(
		52
	)}|${l(53)}|${l(54)}|${l(55)}|${l(56)}|${l(57)}|${l(58)}|${l(59)}|
	60  |${l(60)}|${l(61)}|${l(62)}|${l(63)}|${l(64)}|${l(65)}|${l(66)}|${l(
		67
	)}|${l(68)}|${l(69)}|${l(70)}|${l(71)}|${l(72)}|${l(73)}|${l(74)}|
	75  |${l(75)}|${l(76)}|${l(77)}|${l(78)}|${l(79)}|${l(80)}|${l(81)}|${l(
		82
	)}|${l(83)}|${l(84)}|${l(85)}|${l(86)}|${l(87)}|${l(88)}|${l(89)}|
	90  |${l(90)}|${l(91)}|${l(92)}|${l(93)}|${l(94)}|${l(95)}|${l(96)}|${l(
		97
	)}|${l(98)}|${l(99)}|${l(100)}|${l(101)}|${l(102)}|${l(103)}|${l(104)}|
	105 |${l(105)}|${l(106)}|${l(107)}|${l(108)}|${l(109)}|${l(110)}|${l(111)}|${l(
		112
	)}|${l(113)}|${l(114)}|${l(115)}|${l(116)}|${l(117)}|${l(118)}|${l(119)}|
	120 |${l(120)}|${l(121)}|${l(122)}|${l(123)}|${l(124)}|${l(125)}|${l(126)}|${l(
		127
	)}|${l(128)}|${l(129)}|${l(130)}|${l(131)}|${l(132)}|${l(133)}|${l(134)}|
	135 |${l(135)}|${l(136)}|${l(137)}|${l(138)}|${l(139)}|${l(140)}|${l(141)}|${l(
		142
	)}|${l(143)}|${l(144)}|${l(145)}|${l(146)}|${l(147)}|${l(148)}|${l(149)}|
	150 |${l(150)}|${l(151)}|${l(152)}|${l(153)}|${l(154)}|${l(155)}|${l(156)}|${l(
		157
	)}|${l(158)}|${l(159)}|${l(160)}|${l(161)}|${l(162)}|${l(163)}|${l(164)}|
	165 |${l(165)}|${l(166)}|${l(167)}|${l(168)}|${l(169)}|${l(170)}|${l(171)}|${l(
		172
	)}|${l(173)}|${l(174)}|${l(175)}|${l(176)}|${l(177)}|${l(178)}|${l(179)}|
	180 |${l(180)}|${l(181)}|${l(182)}|${l(183)}|${l(184)}|${l(185)}|${l(186)}|${l(
		187
	)}|${l(188)}|${l(189)}|${l(190)}|${l(191)}|${l(192)}|${l(193)}|${l(194)}|
	195 |${l(195)}|${l(196)}|${l(197)}|${l(198)}|${l(199)}|${l(200)}|${l(201)}|${l(
		202
	)}|${l(203)}|${l(204)}|${l(205)}|${l(206)}|${l(207)}|${l(208)}|${l(209)}|
	210 |${l(210)}|${l(211)}|${l(212)}|${l(213)}|${l(214)}|${l(215)}|${l(216)}|${l(
		217
	)}|${l(218)}|${l(219)}|${l(220)}|${l(221)}|${l(222)}|${l(223)}|${l(224)}|
	`;
	return consoleGrid;
};

/* const autofillGrid = (
	{
		formattedCells,
		acrossWordObjs,
		downWordObjs,
		wordToFill,
		wordMatchIndex = 0,
		argsArr = [],
	},
	setCells
) => {
	const allWordObjs = [...acrossWordObjs, ...downWordObjs];
	if (gridIsFilled(allWordObjs) && everyWordObjHasMatch(allWordObjs)) {
		return { formattedCells, acrossWordObjs, downWordObjs };
	}

	const initialArgs = {
		formattedCells,
		acrossWordObjs,
		downWordObjs,
		wordToFill,
		wordMatchIndex,
	};
	argsArr.push(initialArgs);
	console.log(structuredClone(argsArr));

	const previousData = getPreviousData(argsArr, wordToFill);

	if (!hasUntestedWordMatches(wordToFill, wordMatchIndex)) {
		console.log("backtrack 2");
		// return backtrack(previousData.args, previousData.argsArr, setCells);
		return backtrack2(previousData, setCells);
	}

	// const filledWordObj = getFilledWordObj(wordToFill, wordMatchIndex);
	// const crossingWordObjs = getCrossingWordObjs(filledWordObj, allWordObjs);
	// const updatedCrossingWordObjs = getUpdatedCrossingWordObjs(
	// 	filledWordObj,
	// 	crossingWordObjs
	// );

	// if (hasMatchlessWordObj(updatedCrossingWordObjs)) {
	// 	// return lookAhead(
	// 	// 	{
	// 	// 		wordToFill,
	// 	// 		wordMatchIndex,
	// 	// 		initialArgs,
	// 	// 		argsArr,
	// 	// 		previousArgs: previousData.args,
	// 	// 		previousArgsArr: previousData.argsArr,
	// 	// 	},
	// 	// 	setCells
	// 	// );
	// 	return lookAhead2(
	// 		{ wordToFill, wordMatchIndex, initialArgs, argsArr, previousData },
	// 		setCells
	// 	);
	// }

	// const { acrossWordObjsIntegrated, downWordObjsIntegrated } =
	// 	getIntegratedWordObjs(
	// 		[...updatedCrossingWordObjs, filledWordObj],
	// 		acrossWordObjs,
	// 		downWordObjs
	// 	);
	// const updatedWordObjs = getUpdatedWordObjs(
	// 	acrossWordObjsIntegrated,
	// 	downWordObjsIntegrated,
	// 	formattedCells
	// );
	// const allUpdatedWordObjs = [
	// 	...updatedWordObjs.acrossWordObjs,
	// 	...updatedWordObjs.downWordObjs,
	// ];

	const updatedWordObjs = getUpdatedWordObjsWrapper(initialArgs);
	console.log({ updatedWordObjs });
	const allUpdatedWordObjs = [
		...updatedWordObjs.acrossWordObjs,
		...updatedWordObjs.downWordObjs,
	];

	if (hasMatchlessWordObj(allUpdatedWordObjs)) {
		// return lookAhead(
		// 	{
		// 		wordToFill,
		// 		wordMatchIndex,
		// 		initialArgs,
		// 		argsArr,
		// 		previousArgs: previousData.args,
		// 		previousArgsArr: previousData.argsArr,
		// 	},
		// 	setCells
		// );
		return lookAhead2(
			{ wordToFill, wordMatchIndex, initialArgs, argsArr, previousData },
			setCells
		);
	}

	const updatedFormattedCells = getUpdatedFormattedCells(
		formattedCells,
		updatedWordObjs.acrossWordObjs,
		updatedWordObjs.downWordObjs
	);

	updateGrid(updatedFormattedCells, setCells);

	const nextWordToFill = getNextWordToFill(allUpdatedWordObjs);
	console.log(structuredClone(nextWordToFill));

	if (!nextWordToFill) {
		return handleNoNextWordToFill(
			allUpdatedWordObjs,
			updatedFormattedCells,
			updatedWordObjs
		);
	} else {
		// return handleNextWordToFill(
		// 	nextWordToFill,
		// 	{
		// 		formattedCells: updatedFormattedCells,
		// 		acrossWordObjs: updatedWordObjs.acrossWordObjs,
		// 		downWordObjs: updatedWordObjs.downWordObjs,
		// 		wordToFill: nextWordToFill,
		// 		wordMatchIndex: 0,
		// 		argsArr,
		// 	},
		// 	{
		// 		wordToFill,
		// 		wordMatchIndex,
		// 		initialArgs,
		// 		argsArr,
		// 		previousArgs: previousData.args,
		// 		previousArgsArr: previousData.argsArr,
		// 	},
		// 	setCells
		// );
		if (hasUntestedWordMatches(nextWordToFill, 0)) {
			return autofillGrid(
				{
					formattedCells: updatedFormattedCells,
					acrossWordObjs: updatedWordObjs.acrossWordObjs,
					downWordObjs: updatedWordObjs.downWordObjs,
					wordToFill: nextWordToFill,
					wordMatchIndex: 0,
					argsArr,
				},
				setCells
			);
		} else {
			return lookAhead2(
				{ wordToFill, wordMatchIndex, initialArgs, argsArr, previousData },
				setCells
			);
		}
	}
}; */

/* const getMatchlessWordObjCauseIndex = (
	matchlessWordObj,
	allWordObjs,
	argsArr
) => {
	// const causeArgsObj = argsArr.findIndex((argsObj) => {
	const causeArgsObj = argsArr.findLastIndex((argsObj) => {
		const argsChunk = [
			...getCrossingWordObjs(argsObj.wordToFill, allWordObjs),
			argsObj.wordToFill,
		];
		const argsCells = getCellsFromWordObjs(argsChunk);
		const matchlessChunk = [
			...getCrossingWordObjs(matchlessWordObj, allWordObjs),
			matchlessWordObj,
		];
		const matchlessCells = getCellsFromWordObjs(matchlessChunk);
		const isCause = argsCells.some((argsCell) =>
			matchlessCells.find((matchlessCell) => matchlessCell.id === argsCell.id)
		);
		console.log(argsCells, matchlessCells, isCause);
		console.log(
			hasUntestedWordMatches(argsObj.wordToFill, argsObj.wordMatchIndex)
		);

		return isCause;
	});

	return causeArgsObj;
}; */

const getMatchlessCauseIndexes = (matchlessWordObjs, argsArr) => {
	const causeIndexes = matchlessWordObjs.map((matchlessWordObj) => {
		const causeIndex = argsArr.findIndex((argsObj) => {
			const matchlessCells = getCellsFromWordObjs([matchlessWordObj]);
			const fillWordCells = getCellsFromWordObjs([argsObj.wordToFill]);
			const isCause = fillWordCells.some((fillWordCell) =>
				matchlessCells.find((matchlessCell) =>
					isSameCell(matchlessCell, fillWordCell)
				)
			);

			return isCause;
		});

		return causeIndex;
	});

	return causeIndexes;
};

const getMatchlessCauseIndexes2 = (matchlessWordObjs, allWordObjs, argsArr) => {
	const causeIndexes = matchlessWordObjs.map((matchlessWordObj) => {
		const causeIndex = argsArr.findIndex((argsObj) => {
			const matchlessCells = getCellsFromWordObjs([matchlessWordObj]);
			const argsChunk = [
				...getCrossingWordObjs(argsObj.wordToFill, allWordObjs),
				argsObj.wordToFill,
			];
			const argsCells = getCellsFromWordObjs(argsChunk);
			const isCause = argsCells.some((argsCell) =>
				matchlessCells.find((matchlessCell) =>
					isSameCell(matchlessCell, argsCell)
				)
			);

			return isCause;
		});

		return causeIndex;
	});

	return causeIndexes;
};

const getPotentialCauses = (matchlessWordObjs, argsArr) => {
	const allPotentialCauses = matchlessWordObjs.map((matchlessWordObj) => {
		const potentialCauses = argsArr.filter((argsObj) => {
			const matchlessCells = getCellsFromWordObjs([matchlessWordObj]);
			const fillWordCells = getCellsFromWordObjs([argsObj.wordToFill]);
			const isPotentialCause = fillWordCells.some((fillWordCell) =>
				matchlessCells.find((matchlessCell) =>
					isSameCell(matchlessCell, fillWordCell)
				)
			);

			return isPotentialCause;
		});

		return potentialCauses;
	});

	return allPotentialCauses;
};

const autofillGrid2 = async (
	{
		formattedCells,
		acrossWordObjs,
		downWordObjs,
		wordToFill,
		wordMatchIndex = 0,
		argsArr = [],
	},
	setCells
) => {
	const allWordObjs = [...acrossWordObjs, ...downWordObjs];

	if (gridIsFilled(allWordObjs) && everyWordObjHasMatch(allWordObjs)) {
		return { formattedCells, acrossWordObjs, downWordObjs };
	}

	const initialArgs = {
		formattedCells,
		acrossWordObjs,
		downWordObjs,
		wordToFill,
		wordMatchIndex,
	};
	argsArr.push(initialArgs);
	console.log(`
		argsArr.length: ${argsArr.length}
		wordLength: ${wordToFill.wordCells.length},
		firstCell: ${wordToFill.wordCells[0].id},
		wordMatchIndex: ${wordMatchIndex},
		wordMatchesCount: ${wordToFill.wordMatches.length}
	`);

	const previousData = getPreviousData(argsArr, wordToFill);

	// if (!hasUntestedWordMatches(wordToFill, wordMatchIndex)) {
	// 	return backtrack3(previousData, setCells);
	// }
	if (
		!hasUntestedWordMatches(wordToFill, wordMatchIndex) ||
		wordMatchIndex > 100
	) {
		return await backtrack3(previousData, setCells);
	}

	const updatedWordObjs = await getUpdatedWordObjsWrapper(initialArgs);
	console.log({ updatedWordObjs });
	const allUpdatedWordObjs = [
		...updatedWordObjs.acrossWordObjs,
		...updatedWordObjs.downWordObjs,
	];

	if (hasMatchlessWordObj(allUpdatedWordObjs)) {
		console.log(
			`hasMatchlessWordObj(allUpdatedWordObjs): ${hasMatchlessWordObj(
				allUpdatedWordObjs
			)}`
		);
		return await lookAhead3({ initialArgs, argsArr, previousData }, setCells);
	}

	const updatedFormattedCells = getUpdatedFormattedCells(
		formattedCells,
		updatedWordObjs.acrossWordObjs,
		updatedWordObjs.downWordObjs
	);

	await updateGrid(updatedFormattedCells, setCells);

	const nextWordToFill = getNextWordToFill(allUpdatedWordObjs);

	return await handleNextWordToFill(
		{ updatedFormattedCells, updatedWordObjs, nextWordToFill },
		{ initialArgs, previousData },
		argsArr,
		setCells
	);
};

export const initAutofillGrid = async (cells, setCells) => {
	const formattedCells = formatCells(cells);
	const { acrossWords, downWords } = getFormattedWords(cells, formattedCells);
	const acrossWordsWithMatches = await getWordsWithMatches(acrossWords);
	const downWordsWithMatches = await getWordsWithMatches(downWords);
	const { acrossWordObjs, downWordObjs } = await getUpdatedWordObjs(
		acrossWordsWithMatches,
		downWordsWithMatches,
		formattedCells
	);
	console.log({ acrossWordObjs, downWordObjs });
	const wordToFill = getNextWordToFill([...acrossWordObjs, ...downWordObjs]);
	const argsObj = {
		formattedCells,
		acrossWordObjs,
		downWordObjs,
		wordToFill,
	};
	// console.time("autofillGrid");
	// const autofilledGrid = autofillGrid(argsObj, setCells);
	// console.log({ autofilledGrid });
	// console.timeEnd("autofillGrid");
	console.time("autofillGrid2");
	const autofilledGrid2 = await autofillGrid2(argsObj, setCells);
	console.log({ autofilledGrid2 });
	console.timeEnd("autofillGrid2");
};
