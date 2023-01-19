/* import {
	// getSelectedCell,
	// getNextDirection,
	// selectCellElement,
	getLastCellOfWord,
} from "./letters.js"; */
/* import {
	// cellHasLetter,
	getSelectedWord,
	getWords,
	createWordObjects,
	getWordObj,
} from "./words.js"; */
import { getWords, getWordObj } from "./words.js";
// import { getCellElement } from "./tab.js";
// import { getCellBefore } from "./arrows.js";
import {
	getCellBefore,
	getSelectedCell,
	cellHasLetter,
	getNextDirection,
	selectCellElement,
} from "./helpers.js";

/* const changeDirectionOnBackspace = (direction, setDirection, cells) => {
	const selectedCell = getSelectedCell(direction, cells);
	const firstWord = getWords(direction, cells)[0];
	const firstCell = firstWord[0];

	if (cellHasLetter(selectedCell)) return;
	if (!firstCell.isSelected) return;

	setDirection((d) => (d === "across" ? "down" : "across"));
}; */
const changeDirectionOnBackspace = (direction, setDirection, cells) => {
	const selectedCell = getSelectedCell(cells);
	const { firstWordObj } = getWordObj(direction, cells);
	const { firstCell } = firstWordObj;

	if (cellHasLetter(selectedCell)) return;
	if (!firstCell.isSelected) return;

	setDirection((d) => (d === "across" ? "down" : "across"));
};

/* const getPreviousCellInSelectedWord = (direction, cells) => {
	const selectedWord = getSelectedWord(direction, cells).word;
	const selectedCell = getSelectedCell(direction, cells);
	const previousCell = selectedWord.findLast(
		(cell) => cell.index < selectedCell.index
	);

	return previousCell;
}; */
/* const getPreviousCellInSelectedWord = (direction, cells) => {
	const { selectedWordObj } = getWordObj(direction, cells);
	const { word: selectedWord } = selectedWordObj;

	const selectedCell = getSelectedCell(direction, cells);
	const previousCell = selectedWord.findLast(
		(cell) => cell.index < selectedCell.index
	);

	return previousCell;
}; */

/* const getPreviousWord = (direction, cells) => {
	const wordObjects = createWordObjects(direction, cells);
	const selectedWordObject = getSelectedWord(direction, cells);
	const previousWordObj = wordObjects.findLast(
		(obj) => obj.index < selectedWordObject.index
	);

	return previousWordObj && previousWordObj.word;
}; */
/* const getPreviousWord = (direction, cells) => {
	const { wordObjBefore } = getWordObj(direction, cells);

	return wordObjBefore && wordObjBefore.word;
}; */

/* const getLastWord = (direction, cells) => {
	const lastWord = getWords(direction, cells).findLast((word) => word);

	return lastWord;
}; */
/* const getLastWord = (direction, cells) => {
	// const lastWord = getWords(direction, cells).findLast((word) => word);
	const { lastWordObj } = getWordObj(direction, cells);
	const { word: lastWord } = lastWordObj;

	return lastWord;
}; */

/* const getCellToErase = (direction, cells) => {
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
}; */
/* const getCellToErase = (direction, cells) => {
	const selectedCell = getSelectedCell(direction, cells);
	const previousCellInSelectedWord = getPreviousCellInSelectedWord(
		direction,
		cells
	);
	const { wordObjBefore } = getWordObj(direction, cells);
	const lastCellInPreviousWord = wordObjBefore && wordObjBefore.lastCell;
	const nextDirection = getNextDirection(direction);
	const { lastWordObj: lastWordObjNextDirection } = getWordObj(
		nextDirection,
		cells
	);
	const { lastCell: lastCellOfLastWordNextDirection } =
		lastWordObjNextDirection;

	if (cellHasLetter(selectedCell)) return selectedCell;

	return (
		previousCellInSelectedWord ||
		lastCellInPreviousWord ||
		lastCellOfLastWordNextDirection
	);
}; */

// Think this should either be: getCellBefore or getLastCellNextDirection
/* const getNextCellOnBackspaceKey = (direction, cells) => {
	const selectedCell = getSelectedCell(direction, cells);
	const { selectedWordObj, wordObjBefore } = getWordObj(direction, cells);
	const { word: selectedWord } = selectedWordObj;
	const cellBeforeInSelectedWord = getCellBefore(selectedCell, selectedWord);
	const lastCellInWordBefore = wordObjBefore && wordObjBefore.lastCell;
	const nextDirection = getNextDirection(direction);
	const { lastWordObj: lastWordObjNextDirection } = getWordObj(
		nextDirection,
		cells
	);
	const { lastCell: lastCellOfLastWordNextDirection } =
		lastWordObjNextDirection;

	if (cellHasLetter(selectedCell)) return selectedCell;

	return (
		cellBeforeInSelectedWord ||
		lastCellInWordBefore ||
		lastCellOfLastWordNextDirection
	);
}; */

/* const getNextCellOnBackspaceKey2 = (direction, cells) => {
	const nextDirection = getNextDirection(direction);
	const cellsArray = getWords(direction, cells).flat();
	console.log({ cellsArray });
	const cellsArrayNextDirection = getWords(nextDirection, cells).flat();
	console.log({ cellsArrayNextDirection });
	const selectedCell = getSelectedCell(direction, cells);
	const cellBefore = getCellBefore(selectedCell, cellsArray);
	console.log(cellBefore);
	const lastCellNextDirection = cellsArrayNextDirection.findLast(
		(cell) => cell
	);

	if (cellHasLetter(selectedCell)) return selectedCell;

	return cellBefore || lastCellNextDirection;
}; */

/* const getNextCellOnBackspaceKey2 = (direction, cells) => {
	const nextDirection = getNextDirection(direction);
	const cellsArray = getWords(direction, cells).flat();
	const cellsArrayNextDirection = getWords(nextDirection, cells).flat();
	const selectedCell = getSelectedCell(direction, cells);
	const getSelectedCellIndex = (array) =>
		array.findIndex((cell) => cell.isSelected);
	const getCellBefore = (array) =>
		array.findLast((cell, index) => index < getSelectedCellIndex(array));
	const cellBefore = getCellBefore(cellsArray);
	const lastCellNextDirection = cellsArrayNextDirection.findLast(
		(cell) => cell
	);

	if (cellHasLetter(selectedCell)) return selectedCell;

	return cellBefore || lastCellNextDirection;
}; */

/* const getNextCellOnBackspaceKey2 = (direction, cells) => {
	const nextDirection = getNextDirection(direction);
	const cellsArray = getWords(direction, cells).flat();
	const cellsArrayNextDirection = getWords(nextDirection, cells).flat();
	// const selectedCell = getSelectedCell(direction, cells);
	const selectedCell = getSelectedCell(cells);
	const cellBefore = getCellBefore(cellsArray);
	const lastCellNextDirection = cellsArrayNextDirection.findLast(
		(cell) => cell
	);

	if (cellHasLetter(selectedCell)) return selectedCell;

	return cellBefore || lastCellNextDirection;
}; */

/* const getLastCell = (direction, cells) => {
	const cellsArray = getWords(direction, cells).flat();
	const lastCell = cellsArray.findLast((cell) => cell);

	return lastCell;
}; */
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

	if (cellHasLetter(selectedCell)) return selectedCell;

	return cellBefore || lastCellNextDirection;
};

/* const deleteLetter = (direction, cells, setCells) => {
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
