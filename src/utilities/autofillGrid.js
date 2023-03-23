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
