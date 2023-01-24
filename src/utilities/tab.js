import {
	cellHasLetter,
	changeDirection,
	getNextDirection,
	selectCellElement,
} from "./helpers";
import { getWordObj, getWordObjs } from "./words.js";

const getInitialOpenWordObj = (e, direction, cells) => {
	const isShiftKeyPressed = e.shiftKey;
	const { firstOpenWordObj, lastOpenWordObj } = getWordObj(direction, cells);

	return isShiftKeyPressed ? lastOpenWordObj : firstOpenWordObj;
};

const getInitialWordObj = (e, direction, cells) => {
	const isShiftKeyPressed = e.shiftKey;
	const { firstWordObj, lastWordObj } = getWordObj(direction, cells);

	return isShiftKeyPressed ? lastWordObj : firstWordObj;
};

const getFinalWordObj = (e, direction, cells) => {
	const isShiftKeyPressed = e.shiftKey;
	const { firstWordObj, lastWordObj } = getWordObj(direction, cells);

	return isShiftKeyPressed ? firstWordObj : lastWordObj;
};

const getNextOpenWordObj = (e, direction, cells) => {
	const isShiftKeyPressed = e.shiftKey;
	const { openWordObjBefore, openWordObjAfter } = getWordObj(direction, cells);

	return isShiftKeyPressed ? openWordObjBefore : openWordObjAfter;
};

const getNextWordObj = (e, direction, cells) => {
	const isShiftKeyPressed = e.shiftKey;
	const { wordObjBefore, wordObjAfter } = getWordObj(direction, cells);

	return isShiftKeyPressed ? wordObjBefore : wordObjAfter;
};

const getWhiteSquares = (direction, cells) => {
	const whiteSquares = getWordObjs(direction, cells)
		.map((obj) => obj.word)
		.flat();

	return whiteSquares;
};

/* const changeDirectionOnTabKey = (e, direction, setDirection, cells) => {
	if (e.key !== "Tab") return;
	e.preventDefault();

	const nextOpenWordObj = getNextOpenWordObj(e, direction, cells);

	if (nextOpenWordObj) return;

	changeDirection(setDirection);
}; */

const changeDirectionOnTabKey = (e, direction, setDirection, cells) => {
	if (e.key !== "Tab") return;
	e.preventDefault();

	const nextOpenWordObj = getNextOpenWordObj(e, direction, cells);
	const finalWordObj = getFinalWordObj(e, direction, cells);
	const whiteSquares = getWhiteSquares(direction, cells);

	if (nextOpenWordObj) return;
	if (whiteSquares.every(cellHasLetter) && !finalWordObj.isSelected) return;

	changeDirection(setDirection);
};

/* const getNextCellOnTabKey = (e, direction, cells) => {
	const nextDirection = getNextDirection(direction);
	const initialOpenWordObjNextDirection = getInitialOpenWordObj(
		e,
		nextDirection,
		cells
	);
	const nextOpenWordObj = getNextOpenWordObj(e, direction, cells);
	const nextCell = nextOpenWordObj
		? nextOpenWordObj.firstBlank
		: initialOpenWordObjNextDirection.firstBlank;

	return nextCell;
}; */

const getNextCellOnTabKey = (e, direction, cells) => {
	const nextDirection = getNextDirection(direction);
	const initialOpenWordObjNextDirection = getInitialOpenWordObj(
		e,
		nextDirection,
		cells
	);
	const nextOpenWordObj = getNextOpenWordObj(e, direction, cells);
	const nextWordObj = getNextWordObj(e, direction, cells);
	const initialWordObjNextDirection = getInitialWordObj(
		e,
		nextDirection,
		cells
	);

	return (
		nextOpenWordObj?.firstBlank ||
		initialOpenWordObjNextDirection?.firstBlank ||
		nextWordObj?.firstCell ||
		initialWordObjNextDirection.firstCell
	);
};

const selectCellElementOnTabKey = (e, direction, cells) => {
	if (e.key !== "Tab") return;
	e.preventDefault();

	const nextCell = getNextCellOnTabKey(e, direction, cells);

	selectCellElement(nextCell);
};

export const handleTabKey = (e, direction, setDirection, cells) => {
	// Maybe see if you can do "if (e.key !== "Tab") return;" and "e.preventDefault();" here and omit from all other functions
	changeDirectionOnTabKey(e, direction, setDirection, cells);
	selectCellElementOnTabKey(e, direction, cells);
};
