import {
	cellHasLetter,
	wordIsOpen,
	isSameWord,
	isSelectedWord,
} from "./helpers";

/* Get Cells */
const getStartCells = (direction, cells) => {
	const startCells = cells.filter((cell) => cell[direction] === true);
	return startCells;
};

const getNextBlackSquare = (direction, cells, startCell) => {
	const nextBlackSquare = cells.find((cell, index) => {
		const isInSameCellGroup =
			direction === "across"
				? cell.row === startCell.row
				: cell.column === startCell.column;
		return index > startCell.index && isInSameCellGroup && cell.isBlackSquare;
	});
	return nextBlackSquare;
};

const getGridSectionEnd = (direction, cells, startCell) => {
	const gridSection = direction === "across" ? "row" : "column";
	const gridSectionIndex = startCell[gridSection];
	const gridSectionCells = cells.filter(
		(cell) => cell[gridSection] === gridSectionIndex
	);
	const gridSectionEnd = gridSectionCells[gridSectionCells.length - 1];

	return gridSectionEnd;
};

/* Get Words */
// Don't know if better to have getWords & getOpenWords separate or if should have optional parameter
export const getWords = (direction, cells) => {
	const startCells = getStartCells(direction, cells);
	const words = startCells.map((startCell) => {
		const nextBlackSquare = getNextBlackSquare(direction, cells, startCell);
		const gridSectionEnd = getGridSectionEnd(direction, cells, startCell);
		const wordEndIndex = nextBlackSquare
			? nextBlackSquare.index - 1
			: gridSectionEnd.index;
		const word = cells.filter((cell, index) => {
			return direction === "across"
				? index >= startCell.index && index <= wordEndIndex
				: index >= startCell.index &&
						index <= wordEndIndex &&
						cell.column === startCell.column;
		});
		return word;
	});
	return words;
};

export const getOpenWords = (direction, cells) => {
	const words = getWords(direction, cells);
	const openWords = words.filter((word) => !word.every(cellHasLetter));
	return openWords;
};

/* Word Objects */
const createWordObjs = (direction, cells) => {
	const words = getWords(direction, cells);
	const firstWord = words[0];
	const lastWord = words[words.length - 1];
	const openWords = getOpenWords(direction, cells);
	const firstOpenWord = openWords[0];
	const lastOpenWord = openWords[openWords.length - 1];
	const wordObjects = words.map((word, index, array) => {
		const selectedWordIndex = array.findIndex(isSelectedWord);
		const wordBefore = array.findLast(
			(word, index) => index < selectedWordIndex
		);
		const wordAfter = array.find((word, index) => index > selectedWordIndex);
		const openWordBefore = array.findLast(
			(word, index) => wordIsOpen(word) && index < selectedWordIndex
		);
		const openWordAfter = array.find(
			(word, index) => wordIsOpen(word) && index > selectedWordIndex
		);

		return {
			word,
			index,
			direction,
			clueNumber: word[0].number,
			isOpen: wordIsOpen(word),
			openWordIndex: wordIsOpen(word)
				? openWords.findIndex((openWord) => isSameWord(openWord, word))
				: null,
			isFirstWord: isSameWord(firstWord, word),
			isLastWord: isSameWord(lastWord, word),
			isFirstOpenWord: firstOpenWord && isSameWord(firstOpenWord, word),
			isLastOpenWord: lastOpenWord && isSameWord(lastOpenWord, word),
			isWordBefore: wordBefore && isSameWord(wordBefore, word),
			isWordAfter: wordAfter && isSameWord(wordAfter, word),
			isOpenWordBefore: openWordBefore && isSameWord(openWordBefore, word),
			isOpenWordAfter: openWordAfter && isSameWord(openWordAfter, word),
			isSelected: index === selectedWordIndex,
			firstCell: word[0],
			lastCell: word[word.length - 1],
			firstBlank: word.find((cell) => !cellHasLetter(cell)) ?? null,
		};
	});

	return wordObjects;
};

export const getWordObjs = (direction, cells) =>
	createWordObjs(direction, cells);

export const getWordObj = (direction, cells) => {
	const wordObjs = getWordObjs(direction, cells);
	const findWordObj = (prop) => wordObjs.find((wordObj) => wordObj[prop]);

	return {
		firstWordObj: findWordObj("isFirstWord"),
		lastWordObj: findWordObj("isLastWord"),
		firstOpenWordObj: findWordObj("isFirstOpenWord"),
		lastOpenWordObj: findWordObj("isLastOpenWord"),
		wordObjBefore: findWordObj("isWordBefore"),
		wordObjAfter: findWordObj("isWordAfter"),
		openWordObjBefore: findWordObj("isOpenWordBefore"),
		openWordObjAfter: findWordObj("isOpenWordAfter"),
		selectedWordObj: findWordObj("isSelected"),
	};
};

export const getWhiteSquares = (direction, cells) => {
	const whiteSquares = getWordObjs(direction, cells)
		.map((obj) => obj.word)
		.flat();

	return whiteSquares;
};
