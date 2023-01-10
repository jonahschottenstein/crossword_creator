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

const getRowOrColumnEnd = (direction, cells, startCell) => {
	const rowOrColumn = direction === "across" ? "row" : "column";
	const rowOrColumnIndex = startCell[rowOrColumn];
	const rowOrColumnCells = cells.filter(
		(cell) => cell[rowOrColumn] === rowOrColumnIndex
	);
	const rowOrColumnEnd = rowOrColumnCells[rowOrColumnCells.length - 1];
	return rowOrColumnEnd;
};

/* Cell Descriptors */
const cellHasLetter = (cell) => cell.letter.length > 0;

/* Get Words */
export const getWords = (direction, cells) => {
	const startCells = getStartCells(direction, cells);
	const words = startCells.map((startCell) => {
		const nextBlackSquare = getNextBlackSquare(direction, cells, startCell);
		const rowOrColumnEnd = getRowOrColumnEnd(direction, cells, startCell);
		const wordEndIndex = nextBlackSquare
			? nextBlackSquare.index - 1
			: rowOrColumnEnd.index;
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

const getOpenWords = (direction, cells) => {
	const words = getWords(direction, cells);
	const openWords = words.filter((word) => !word.every(cellHasLetter));
	return openWords;
};

/* Word Descriptors */
const wordIsOpen = (word) => !word.every(cellHasLetter);

const isSameWord = (openWord, word) => {
	if (openWord.length !== word.length) return false;
	for (let i = 0; i < openWord.length; i++) {
		return openWord[i].id === word[i].id;
	}
};

const isSelectedWord = (word) => word.find((cell) => cell.isSelected);

/* Word Objects */
const createWordObjects = (direction, cells) => {
	const words = getWords(direction, cells);
	const openWords = getOpenWords(direction, cells);
	const firstOpenWord = openWords[0];
	const lastOpenWord = openWords[openWords.length - 1];
	const wordObjects = words.map((word, index, array) => {
		const selectedWordIndex = array.findIndex(isSelectedWord);
		const previousOpenWord = array.findLast(
			(word, index) => wordIsOpen(word) && index < selectedWordIndex
		);
		const nextOpenWord = array.find(
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
			isFirstOpenWord: isSameWord(firstOpenWord, word),
			isLastOpenWord: isSameWord(lastOpenWord, word),
			isPreviousOpenWord:
				previousOpenWord && isSameWord(previousOpenWord, word),
			isNextOpenWord: nextOpenWord && isSameWord(nextOpenWord, word),
			isSelected: index === selectedWordIndex,
			firstBlankCell: word.find((cell) => !cellHasLetter(cell)) ?? null,
		};
	});

	return wordObjects;
};

/* Get Specific Words */
export const getFirstOpenWord = (direction, cells) =>
	createWordObjects(direction, cells).find((obj) => obj.isFirstOpenWord);

export const getLastOpenWord = (direction, cells) =>
	createWordObjects(direction, cells).find((obj) => obj.isLastOpenWord);

export const getPreviousOpenWord = (direction, cells) =>
	createWordObjects(direction, cells).find((obj) => obj.isPreviousOpenWord);

export const getNextOpenWord = (direction, cells) =>
	createWordObjects(direction, cells).find((obj) => obj.isNextOpenWord);

const getSelectedWord = (direction, cells) =>
	createWordObjects(direction, cells).find((obj) => obj.isSelected);

export const getRemainingOpenWords = (direction, cells) => {
	return {
		before: createWordObjects(direction, cells).filter(
			(obj) => obj.isOpen && obj.index < getSelectedWord(direction, cells).index
		),
		after: createWordObjects(direction, cells).filter(
			(obj) => obj.isOpen && obj.index > getSelectedWord(direction, cells).index
		),
	};
};
