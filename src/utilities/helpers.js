/* Get specific cell */

/* export const getSelectedCell = (direction, cells) => {
	const selectedWord = getSelectedWord(direction, cells).word;
	const selectedCell = selectedWord.find((cell) => cell.isSelected);

	return selectedCell;
}; */

export const getSelectedCell = (cells) => cells.find((cell) => cell.isSelected);

const getSelectedCellIndex = (array) =>
	array.findIndex((cell) => cell.isSelected);

/* export const getCellBefore = (selectedCell, cellsArray) =>
    cellsArray.findLast((cell) => cell1IsBeforeCell2(cell, selectedCell)); */

/* export const getCellAfter = (selectedCell, cellsArray) =>
	cellsArray.find((cell) => cell1IsBeforeCell2(selectedCell, cell)); */

export const getCellBefore = (array) => {
	const selectedCellIndex = getSelectedCellIndex(array);
	const cellBefore = array.findLast((cell, index) => index < selectedCellIndex);

	return cellBefore;
};

export const getCellAfter = (array) => {
	const selectedCellIndex = getSelectedCellIndex(array);
	const cellAfter = array.find((cell, index) => index > selectedCellIndex);

	return cellAfter;
};

/* export const getBlankBefore = (selectedCell, cellsArray) =>
	cellsArray.findLast(
		(cell) => cell1IsBeforeCell2(cell, selectedCell) && !cell.letter
	); */

/* export const getBlankAfter = (selectedCell, cellsArray) =>
	cellsArray.find(
		(cell) => cell1IsBeforeCell2(selectedCell, cell) && !cell.letter
	); */

export const getBlankBefore = (array) => {
	const selectedCellIndex = getSelectedCellIndex(array);
	const blankBefore = array.findLast(
		(cell, index) => index < selectedCellIndex && !cellHasLetter(cell)
	);

	return blankBefore;
};

export const getBlankAfter = (array) => {
	const selectedCellIndex = getSelectedCellIndex(array);
	const blankAfter = array.find(
		(cell, index) => index > selectedCellIndex && !cellHasLetter(cell)
	);

	return blankAfter;
};

/* const getBlank = (cellsArray) => {
	const selectedCell = cellsArray.find((cell) => cell.isSelected);

	return {
		before: cellsArray.findLast(
			(cell) => cell1IsBeforeCell2(cell, selectedCell) && !cell.letter
		),
		after: cellsArray.find(
			(cell) => cell1IsBeforeCell2(selectedCell, cell) && !cell.letter
		),
	};
}; */

/* Cell descriptors */

// export const cell1IsBeforeCell2 = (cell1, cell2) => cell1.index < cell2.index;

export const getCellIndex = (cell, array) => {
	const cellId = cell.id;
	const cellIndex = array.findIndex((cell) => cell.id === cellId);

	return cellIndex;
};

export const isBeforeSelectedCell = (cell, array) => {
	const selectedCellIndex = getSelectedCellIndex(array);
	const cellIndex = getCellIndex(cell, array);

	return cellIndex < selectedCellIndex;
};

export const isAfterSelectedCell = (cell, array) => {
	const selectedCellIndex = getSelectedCellIndex(array);
	const cellIndex = getCellIndex(cell, array);

	return selectedCellIndex < cellIndex;
};

export const isCellBlock = (cell) => cell.isBlackSquare;

export const cellInFirstRow = (cell) => cell.index < 15;

export const cellInFirstColumn = (cell) => cell.index % 15 === 0;

export const previousAcrossCellBlocked = (cellsArray, cell) =>
	cellsArray[cell.index - 1].isBlackSquare;

export const previousDownCellBlocked = (cellsArray, cell) =>
	cellsArray[cell.index - 15].isBlackSquare;

export const isAcross = (array, cell) => {
	return (
		!isCellBlock(cell) &&
		(cellInFirstColumn(cell) || previousAcrossCellBlocked(array, cell))
	);
};

export const isDown = (array, cell) => {
	return (
		!isCellBlock(cell) &&
		(cellInFirstRow(cell) || previousDownCellBlocked(array, cell))
	);
};

export const cellHasLetter = (cell) => cell.letter.length > 0;

export const isInSelectedWord = (selectedWord, cell) => {
	return selectedWord && selectedWord.includes(cell);
};

/* Word descriptors */
export const wordIsOpen = (word) => !word.every(cellHasLetter);

export const isSameWord = (openWord, word) => {
	if (openWord.length !== word.length) return false;
	for (let i = 0; i < openWord.length; i++) {
		return openWord[i].id === word[i].id;
	}
};

export const isSelectedWord = (word) => word.find((cell) => cell.isSelected);

/* Cell element */
export const getCellElement = (cell) => {
	const cellElements = document.getElementsByClassName("cell");
	return cellElements[cell.index];
};

export const selectCellElement = (cell) => {
	const cellElement = getCellElement(cell);

	cellElement.click();
	cellElement.focus({ preventScroll: true });
};

/* Direction */
export const changeDirection = (setDirection) =>
	setDirection((d) => (d === "across" ? "down" : "across"));

export const getNextDirection = (direction) =>
	direction === "across" ? "down" : "across";

/* Letter */
export const entryIsValid = (e) =>
	!e.metaKey && !e.altKey && !e.ctrlKey && /\b[A-Za-z0-9]{1}\b/.test(e.key);
