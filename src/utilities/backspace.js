import {
	getSelectedCell,
	getNextDirection,
	selectCellElement,
	getLastCellOfWord,
} from "./letters.js";
import {
	cellHasLetter,
	getSelectedWord,
	getWords,
	createWordObjects,
} from "./words.js";
import { getCellElement } from "./tab.js";

const changeDirectionOnBackspace = (direction, setDirection, cells) => {
	const selectedCell = getSelectedCell(direction, cells);
	const firstWord = getWords(direction, cells)[0];
	const firstCell = firstWord[0];

	if (cellHasLetter(selectedCell)) return;
	if (!firstCell.isSelected) return;

	setDirection((d) => (d === "across" ? "down" : "across"));
};

const getPreviousCellInSelectedWord = (direction, cells) => {
	const selectedWord = getSelectedWord(direction, cells).word;
	const selectedCell = getSelectedCell(direction, cells);
	const previousCell = selectedWord.findLast(
		(cell) => cell.index < selectedCell.index
	);

	return previousCell;
};

const getPreviousWord = (direction, cells) => {
	const wordObjects = createWordObjects(direction, cells);
	const selectedWordObject = getSelectedWord(direction, cells);
	const previousWordObj = wordObjects.findLast(
		(obj) => obj.index < selectedWordObject.index
	);

	return previousWordObj && previousWordObj.word;
};

const getLastWord = (direction, cells) => {
	const lastWord = getWords(direction, cells).findLast((word) => word);

	return lastWord;
};

const getCellToErase = (direction, cells) => {
	const selectedCell = getSelectedCell(direction, cells);
	const previousCellInSelectedWord = getPreviousCellInSelectedWord(
		direction,
		cells
	);
	const previousWord = getPreviousWord(direction, cells);
	const lastCellInPreviousWord =
		previousWord && getLastCellOfWord(previousWord);
	const nextDirection = getNextDirection(direction);
	const lastWordNextDirection = getLastWord(nextDirection, cells);
	const lastCellOfLastWordNextDirection = getLastCellOfWord(
		lastWordNextDirection
	);

	if (cellHasLetter(selectedCell)) return selectedCell;

	return (
		previousCellInSelectedWord ||
		lastCellInPreviousWord ||
		lastCellOfLastWordNextDirection
	);
};

const deleteLetter = (direction, cells, setCells) => {
	const cellToErase = getCellToErase(direction, cells);

	if (!cellHasLetter(cellToErase)) return;

	setCells((prevState) => {
		const newState = prevState.map((cell) => {
			if (cell.index === cellToErase.index) {
				return { ...cell, letter: "" };
			} else {
				return cell;
			}
		});
		return newState;
	});
};

const selectCellElementOnBackspace = (direction, cells) => {
	const selectedCell = getSelectedCell(direction, cells);
	const cellToErase = getCellToErase(direction, cells);
	const cellElement = getCellElement(cellToErase);

	if (selectedCell.index === cellToErase.index) return;

	selectCellElement(cellElement);
};

export const handleBackspace = (direction, setDirection, cells, setCells) => {
	changeDirectionOnBackspace(direction, setDirection, cells);
	deleteLetter(direction, cells, setCells);
	selectCellElementOnBackspace(direction, cells);
};
