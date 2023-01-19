import { getWordObj } from "./words.js";
import { setCellLetter } from "./setCellLetter.js";
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

const selectCellElementOnLetterKey = (direction, cells) => {
	const nextCell = getNextCellOnLetterKey(direction, cells);

	selectCellElement(nextCell);
};

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
