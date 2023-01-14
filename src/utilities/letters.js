import {
	cellHasLetter,
	getFirstOpenWord,
	getNextOpenWord,
	getSelectedWord,
	getRemainingOpenWords,
} from "./words.js";
import { getCellElement } from "./tab.js";

export const getNextDirection = (direction) =>
	direction === "across" ? "down" : "across";

export const getSelectedCell = (direction, cells) => {
	const selectedWord = getSelectedWord(direction, cells).word;
	const selectedCell = selectedWord.find((cell) => cell.isSelected);

	return selectedCell;
};

export const getLastCellOfWord = (word) => word.findLast((cell) => cell);

const getNextCellInSelectedWord = (direction, cells) => {
	const selectedWord = getSelectedWord(direction, cells).word;
	const selectedCell = getSelectedCell(direction, cells);
	const lastCellOfWord = getLastCellOfWord(selectedWord);
	const nextCell = selectedWord.find((cell) => cell.index > selectedCell.index);

	return !lastCellOfWord.isSelected && nextCell;
};

const getRemainingBlanksInWord = (direction, cells) => {
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
};

const getNextBlankInWord = (direction, cells) => {
	const wordBlanksAfter = getRemainingBlanksInWord(direction, cells).after;
	const nextBlankInWord = !!wordBlanksAfter.length && wordBlanksAfter[0];

	return nextBlankInWord;
};

const getFirstBlankBeforeInWord = (direction, cells) => {
	const wordBlanksBefore = getRemainingBlanksInWord(direction, cells).before;
	const firstBlankBefore = !!wordBlanksBefore.length && wordBlanksBefore[0];

	return firstBlankBefore;
};

const getFirstBlankInNextOpenWord = (direction, cells) => {
	const nextOpenWord = getNextOpenWord(direction, cells);
	const firstBlankInNextOpenWord = nextOpenWord && nextOpenWord.firstBlankCell;

	return firstBlankInNextOpenWord;
};

const getFirstBlankNextDirection = (direction, cells) => {
	const nextDirection = getNextDirection(direction);
	const firstOpenWordNextDirection = getFirstOpenWord(nextDirection, cells);
	const firstBlankNextDirection = firstOpenWordNextDirection.firstBlankCell;

	return firstBlankNextDirection;
};

const getNextCellToSelect = (direction, cells) => {
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
};

export const selectCellElement = (cellElement) => {
	cellElement.click();
	cellElement.focus({ preventScroll: true });
};

export const selectNextCellElement = (direction, cells) => {
	const nextCellToSelect = getNextCellToSelect(direction, cells);
	const nextCellElement = getCellElement(nextCellToSelect);

	selectCellElement(nextCellElement);
};

export const changeDirectionOnAddedLetter = (
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
};
