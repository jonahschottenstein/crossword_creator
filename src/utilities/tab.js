import {
	changeDirection,
	getNextDirection,
	selectCellElement,
} from "./helpers";
import { getWordObj } from "./words.js";

const getInitialOpenWordObj = (e, direction, cells) => {
	const isShiftKeyPressed = e.shiftKey;
	const { firstOpenWordObj, lastOpenWordObj } = getWordObj(direction, cells);

	return isShiftKeyPressed ? lastOpenWordObj : firstOpenWordObj;
};

const getNextOpenWordObj = (e, direction, cells) => {
	const isShiftKeyPressed = e.shiftKey;
	const { openWordObjBefore, openWordObjAfter } = getWordObj(direction, cells);

	return isShiftKeyPressed ? openWordObjBefore : openWordObjAfter;
};

const changeDirectionOnTabKey = (e, direction, setDirection, cells) => {
	if (e.key !== "Tab") return;
	e.preventDefault();

	const nextOpenWordObj = getNextOpenWordObj(e, direction, cells);

	if (nextOpenWordObj) return;

	changeDirection(setDirection);
};

const getNextCellOnTabKey = (e, direction, cells) => {
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
