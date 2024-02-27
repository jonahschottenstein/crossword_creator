import { getWords, getWordObj } from "./words.js";
import {
	getCellBefore,
	getSelectedCell,
	cellHasLetter,
	getNextDirection,
	selectCellElement,
} from "./helpers.js";

const changeDirectionOnBackspace = (direction, setDirection, cells) => {
	const selectedCell = getSelectedCell(cells);
	const { firstWordObj } = getWordObj(direction, cells);
	const { firstCell } = firstWordObj;

	if (cellHasLetter(selectedCell)) return;
	if (!firstCell.isSelected) return;
	// TODO: Replace setDirection with changeDirection from helpers.js
	setDirection((d) => (d === "across" ? "down" : "across"));
};

const getLastCell = (direction, cells) => {
	const { lastWordObj } = getWordObj(direction, cells);
	const { lastCell } = lastWordObj;

	return lastCell;
};

const getNextCellOnBackspaceKey = (direction, cells) => {
	const nextDirection = getNextDirection(direction);
	const cellsArray = getWords(direction, cells).flat();
	const selectedCell = getSelectedCell(cells);
	const cellBefore = getCellBefore(cellsArray);
	const lastCellNextDirection = getLastCell(nextDirection, cells);

	//? Would return cellHasLetter(selectedCell) ? selectedCell : cellBefore || lastCellNextDirection be better?
	if (cellHasLetter(selectedCell)) return selectedCell;

	return cellBefore || lastCellNextDirection;
};

const deleteLetter = (direction, cells, setCells) => {
	const nextCell = getNextCellOnBackspaceKey(direction, cells);
	if (!cellHasLetter(nextCell)) return;

	setCells((prevState) => {
		const newState = prevState.map((cell) => {
			if (cell.index === nextCell.index) {
				return { ...cell, letter: "" };
			} else {
				return cell;
			}
		});
		return newState;
	});
};

const selectCellElementOnBackspace = (direction, cells) => {
	const selectedCell = getSelectedCell(cells);
	const nextCell = getNextCellOnBackspaceKey(direction, cells);

	if (selectedCell.index === nextCell.index) return;

	selectCellElement(nextCell);
};

export const handleBackspaceKey = (
	e,
	direction,
	setDirection,
	cells,
	setCells
) => {
	if (e.type === "keydown" && e.key !== "Backspace") return;
	if (
		e.type === "click" &&
		!e.target.matches("button.mobile-keyboard-key[value='backspace']")
	)
		return;

	changeDirectionOnBackspace(direction, setDirection, cells);
	deleteLetter(direction, cells, setCells);
	selectCellElementOnBackspace(direction, cells);
};
