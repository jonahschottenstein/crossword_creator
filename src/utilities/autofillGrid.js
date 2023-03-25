import { cellHasLetter } from "./helpers";

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

const filterWordMatches = (wordObjs) => {
	const wordObjsWithFilteredMatches = wordObjs.map((wordObj) => {
		const wordRegExp = getWordRegExp(wordObj);
		const filteredWordMatches = wordObj.wordMatches.filter(({ word }) =>
			wordRegExp.test(word)
		);

		return { ...wordObj, wordMatches: filteredWordMatches };
	});

	return wordObjsWithFilteredMatches;
};

const updateWordObjs = (wordObjsWithOptsFromMatches, overlapOpts) => {
	const wordObjsWithOverlapOpts = getWordObjsWithOverlapOpts(
		wordObjsWithOptsFromMatches,
		overlapOpts
	);
	const wordObjsWithFilteredMatches = filterWordMatches(
		wordObjsWithOverlapOpts
	);

	return wordObjsWithFilteredMatches;
};

const getUpdatedWordObjs = (acrossWordObjs, downWordObjs, formattedCells) => {
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
	const acrossWordObjs = updateWordObjs(
		acrossWordObjsWithOptsFromMatches,
		overlapOpts
	);
	const downWordObjs = updateWordObjs(
		downWordObjsWithOptsFromMatches,
		overlapOpts
	);

	return { acrossWordObjs, downWordObjs };
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

const updateCrossingWordObjs = (filledWordObj, crossingWordObjs) => {
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

const cellsHaveSameOpts = (cell1, cell2) => {
	cell1.options.every((cell1Opt) => cell2.options.includes(cell1Opt));
};

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
