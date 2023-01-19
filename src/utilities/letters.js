/* import {
	// cellHasLetter,
	getFirstOpenWord,
	getNextOpenWord,
	getSelectedWord,
	getRemainingOpenWords,
	getWordObj,
} from "./words.js"; */
// import { getSelectedWord, getWordObj } from "./words.js";
import { getWordObj } from "./words.js";
// import { getCellElement } from "./tab.js";
// import { entryIsValid, setCellLetter } from "./setCellLetter.js";
import { setCellLetter } from "./setCellLetter.js";
// import { cell1IsBeforeCell2, getCellAfter } from "./arrows.js";
// import { cell1IsBeforeCell2 } from "./arrows.js";
import {
	cellHasLetter,
	entryIsValid,
	changeDirection,
	getNextDirection,
	getSelectedCell,
	getBlankBefore,
	getBlankAfter,
	getCellAfter,
	selectCellElement,
} from "./helpers.js";

/* export const getNextDirection = (direction) =>
	direction === "across" ? "down" : "across"; */

/* export const getSelectedCell = (direction, cells) => {
	const selectedWord = getSelectedWord(direction, cells).word;
	const selectedCell = selectedWord.find((cell) => cell.isSelected);

	return selectedCell;
}; */

/* export const getBlankBefore = (selectedCell, cellsArray) =>
	cellsArray.findLast(
		(cell) => cell1IsBeforeCell2(cell, selectedCell) && !cell.letter
	); */
/* export const getBlankAfter = (selectedCell, cellsArray) =>
	cellsArray.find(
		(cell) => cell1IsBeforeCell2(selectedCell, cell) && !cell.letter
	); */

// export const getLastCellOfWord = (word) => word.findLast((cell) => cell);

/* const getNextCellInSelectedWord = (direction, cells) => {
	const selectedWord = getSelectedWord(direction, cells).word;
	const selectedCell = getSelectedCell(direction, cells);
	const lastCellOfWord = getLastCellOfWord(selectedWord);
	const nextCell = selectedWord.find((cell) => cell.index > selectedCell.index);

	return !lastCellOfWord.isSelected && nextCell;
}; */

/* const getRemainingBlanksInWord = (direction, cells) => {
	const selectedWord = getSelectedWord(direction, cells).word;
	const selectedCell = getSelectedCell(direction, cells);

	return {
		before: selectedWord.filter(
			(cell) => !cellHasLetter(cell) && cell.index < selectedCell.index
		),
		after: selectedWord.filter(
			(cell) => !cellHasLetter(cell) && cell.index > selectedCell.index
		),
		getTotal() {
			return this.before.concat(this.after);
		},
	};
}; */

/* const getNextBlankInWord = (direction, cells) => {
	const wordBlanksAfter = getRemainingBlanksInWord(direction, cells).after;
	const nextBlankInWord = !!wordBlanksAfter.length && wordBlanksAfter[0];

	return nextBlankInWord;
}; */

/* const getFirstBlankBeforeInWord = (direction, cells) => {
	const wordBlanksBefore = getRemainingBlanksInWord(direction, cells).before;
	const firstBlankBefore = !!wordBlanksBefore.length && wordBlanksBefore[0];

	return firstBlankBefore;
}; */

/* const getFirstBlankInNextOpenWord = (direction, cells) => {
	const nextOpenWord = getNextOpenWord(direction, cells);
	const firstBlankInNextOpenWord = nextOpenWord && nextOpenWord.firstBlankCell;

	return firstBlankInNextOpenWord;
}; */

/* const getFirstBlankNextDirection = (direction, cells) => {
	const nextDirection = getNextDirection(direction);
	const firstOpenWordNextDirection = getFirstOpenWord(nextDirection, cells);
	const firstBlankNextDirection = firstOpenWordNextDirection.firstBlankCell;

	return firstBlankNextDirection;
}; */

/* const getNextCellToSelect = (direction, cells) => {
	const selectedCell = getSelectedCell(direction, cells);
	const selectedCellHasLetter = cellHasLetter(selectedCell);
	const nextCellInWord = getNextCellInSelectedWord(direction, cells);
	const nextBlankInWord = getNextBlankInWord(direction, cells);
	const firstBlankBeforeInWord = getFirstBlankBeforeInWord(direction, cells);
	const firstBlankInNextOpenWord = getFirstBlankInNextOpenWord(
		direction,
		cells
	);
	const firstBlankNextDirection = getFirstBlankNextDirection(direction, cells);
	const firstOption = selectedCellHasLetter ? nextCellInWord : nextBlankInWord;

	return (
		firstOption ||
		firstBlankBeforeInWord ||
		firstBlankInNextOpenWord ||
		firstBlankNextDirection
	);
}; */
/* const getCellToSelectOnLetterKey = (direction, cells) => {
	const selectedCell = getSelectedCell(direction, cells);
	const selectedCellHasLetter = cellHasLetter(selectedCell);
	const nextCellInWord = getNextCellInSelectedWord(direction, cells);
	const nextBlankInWord = getNextBlankInWord(direction, cells);
	const firstBlankBeforeInWord = getFirstBlankBeforeInWord(direction, cells);
	const firstBlankInNextOpenWord = getFirstBlankInNextOpenWord(
		direction,
		cells
	);
	const firstBlankNextDirection = getFirstBlankNextDirection(direction, cells);
	const firstOption = selectedCellHasLetter ? nextCellInWord : nextBlankInWord;

	return (
		firstOption ||
		firstBlankBeforeInWord ||
		firstBlankInNextOpenWord ||
		firstBlankNextDirection
	);
}; */

/* const getCellToSelectOnLetterKey = (direction, cells) => {
	const selectedCell = getSelectedCell(direction, cells);
	const selectedCellHasLetter = cellHasLetter(selectedCell);
	const nextDirection = getNextDirection(direction);
	const { selectedWordObj, openWordObjAfter } = getWordObj(direction, cells);
	const { firstOpenWordObj: firstOpenWordObjNextDirection } = getWordObj(
		nextDirection,
		cells
	);
	const wordCellAfter = getCellAfter(selectedCell, selectedWordObj.word);
	const wordBlankBefore = getBlankBefore(selectedCell, selectedWordObj.word);
	const wordBlankAfter = getBlankAfter(selectedCell, selectedWordObj.word);
	const firstBlankBeforeInWord = wordBlankBefore && selectedWordObj.firstBlank;
	const firstBlankInOpenWordAfter = openWordObjAfter?.firstBlank;
	const firstBlankNextDirection = firstOpenWordObjNextDirection.firstBlank;
	const firstOption = selectedCellHasLetter ? wordCellAfter : wordBlankAfter;

	return (
		firstOption ||
		firstBlankBeforeInWord ||
		firstBlankInOpenWordAfter ||
		firstBlankNextDirection
	);
}; */
/* const getCellToSelectOnLetterKey = (direction, cells) => {
	const selectedCell = getSelectedCell(direction, cells);
	const selectedCellHasLetter = cellHasLetter(selectedCell);
	const nextDirection = getNextDirection(direction);
	const { selectedWordObj, openWordObjAfter } = getWordObj(direction, cells);
	const { firstOpenWordObj: firstOpenWordObjNextDirection } = getWordObj(
		nextDirection,
		cells
	);
	const wordCellAfter = getCellAfter(selectedWordObj.word);
	const wordBlankBefore = getBlankBefore(selectedCell, selectedWordObj.word);
	const wordBlankAfter = getBlankAfter(selectedCell, selectedWordObj.word);
	const firstBlankBeforeInWord = wordBlankBefore && selectedWordObj.firstBlank;
	const firstBlankInOpenWordAfter = openWordObjAfter?.firstBlank;
	const firstBlankNextDirection = firstOpenWordObjNextDirection.firstBlank;
	const firstOption = selectedCellHasLetter ? wordCellAfter : wordBlankAfter;

	return (
		firstOption ||
		firstBlankBeforeInWord ||
		firstBlankInOpenWordAfter ||
		firstBlankNextDirection
	);
}; */

const getFirstBlank = (direction, cells) => {
	const { firstOpenWordObj } = getWordObj(direction, cells);
	const { firstBlank } = firstOpenWordObj;

	return firstBlank;
};

const getNextCellFirstOptionOnLetterKey = (direction, cells) => {
	const selectedCell = getSelectedCell(cells);
	const selectedCellHasLetter = cellHasLetter(selectedCell);
	const { selectedWordObj } = getWordObj(direction, cells);
	const cellAfterInWord = getCellAfter(selectedWordObj.word);
	const blankAfterInWord = getBlankAfter(selectedWordObj.word);
	const firstOption = selectedCellHasLetter
		? cellAfterInWord
		: blankAfterInWord;

	return firstOption;
};

const getNextCellOnLetterKey = (direction, cells) => {
	const nextDirection = getNextDirection(direction);
	const { selectedWordObj, openWordObjAfter } = getWordObj(direction, cells);
	const firstOption = getNextCellFirstOptionOnLetterKey(direction, cells);
	const blankBeforeInWord = getBlankBefore(selectedWordObj.word);
	const firstBlankBeforeInWord =
		blankBeforeInWord && selectedWordObj.firstBlank;
	const firstBlankInOpenWordAfter = openWordObjAfter?.firstBlank;
	const firstBlankNextDirection = getFirstBlank(nextDirection, cells);

	return (
		firstOption ||
		firstBlankBeforeInWord ||
		firstBlankInOpenWordAfter ||
		firstBlankNextDirection
	);
};

/* export const selectCellElement = (cellElement) => {
	cellElement.click();
	cellElement.focus({ preventScroll: true });
}; */

/* export const selectCellElement = (cell) => {
	const cellElement = getCellElement(cell);

	cellElement.click();
	cellElement.focus({ preventScroll: true });
}; */

/* export const selectNextCellElement = (direction, cells) => {
	const nextCellToSelect = getNextCellToSelect(direction, cells);
	const nextCellElement = getCellElement(nextCellToSelect);

	selectCellElement(nextCellElement);
}; */

/* const selectCellElementOnLetterKey = (direction, cells) => {
	const cellToSelect = getCellToSelectOnLetterKey(direction, cells);

	selectCellElement(cellToSelect);
}; */
const selectCellElementOnLetterKey = (direction, cells) => {
	const nextCell = getNextCellOnLetterKey(direction, cells);

	selectCellElement(nextCell);
};

/* export const changeDirectionOnAddedLetter = (
	direction,
	cells,
	setDirection
) => {
	const selectedWord = getSelectedWord(direction, cells).word;
	const selectedCell = getSelectedCell(direction, cells);
	const selectedCellHasLetter = cellHasLetter(selectedCell);
	const lastCellOfWord = getLastCellOfWord(selectedWord);
	const remainingWordBlanks = getRemainingBlanksInWord(
		direction,
		cells
	).getTotal();
	const openWordsAfter = getRemainingOpenWords(direction, cells).after;

	if (selectedCellHasLetter && !lastCellOfWord.isSelected) return;
	if (!remainingWordBlanks.length && !openWordsAfter.length) {
		setDirection((d) => (d === "across" ? "down" : "across"));
	}
}; */
/* const changeDirectionOnLetterKey = (direction, setDirection, cells) => {
	const selectedWord = getSelectedWord(direction, cells).word;
	const selectedCell = getSelectedCell(direction, cells);
	const selectedCellHasLetter = cellHasLetter(selectedCell);
	const lastCellOfWord = getLastCellOfWord(selectedWord);
	const remainingWordBlanks = getRemainingBlanksInWord(
		direction,
		cells
	).getTotal();
	// Think I'd like to get rid of "remainingWordBlanks"
	const { openWordObjAfter } = getWordObj(direction, cells);

	if (selectedCellHasLetter && !lastCellOfWord.isSelected) return;
	if (!remainingWordBlanks.length && !openWordObjAfter) {
		setDirection((d) => (d === "across" ? "down" : "across"));
	}
}; */

// export const getCellBefore = (selectedCell, cellsArray) =>
// 	cellsArray.findLast((cell) => cell1IsBeforeCell2(cell, selectedCell));

/* const changeDirectionOnLetterKey = (direction, setDirection, cells) => {
	const selectedCell = getSelectedCell(direction, cells);
	const { selectedWordObj, openWordObjAfter } = getWordObj(direction, cells);
	const { word: selectedWord } = selectedWordObj;
	const { lastCell: lastCellOfSelectedWord } = selectedWordObj;
	const wordBlankBefore = getBlankBefore(selectedCell, selectedWord);
	const wordBlankAfter = getBlankAfter(selectedCell, selectedWord);

	if (cellHasLetter(selectedCell) && !lastCellOfSelectedWord.isSelected) return;
	if (!wordBlankBefore && !wordBlankAfter && !openWordObjAfter) {
		setDirection((d) => (d === "across" ? "down" : "across"));
	}
}; */
const changeDirectionOnLetterKey = (direction, setDirection, cells) => {
	const selectedCell = getSelectedCell(cells);
	const { selectedWordObj, openWordObjAfter } = getWordObj(direction, cells);
	const { word: selectedWord } = selectedWordObj;
	const { lastCell: lastCellOfSelectedWord } = selectedWordObj;
	const blankBeforeInWord = getBlankBefore(selectedWord);
	const blankAfterInWord = getBlankAfter(selectedWord);

	if (cellHasLetter(selectedCell) && !lastCellOfSelectedWord.isSelected) return;

	if (!blankBeforeInWord && !blankAfterInWord && !openWordObjAfter) {
		changeDirection(setDirection);
	}
};

/* export const handleLetterKey = (direction, setDirection, cells) => {
	changeDirectionOnLetterKey(direction, setDirection, cells);
	selectCellElementOnLetterKey(direction, cells);
}; */
export const handleLetterKey = (
	e,
	direction,
	setDirection,
	cells,
	setCells
) => {
	if (!entryIsValid(e)) return;

	setCellLetter(e, cells, setCells);
	changeDirectionOnLetterKey(direction, setDirection, cells);
	selectCellElementOnLetterKey(direction, cells);
};
