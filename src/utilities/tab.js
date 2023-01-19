// import { getNextDirection, selectCellElement } from "./letters.js";
import {
	changeDirection,
	getNextDirection,
	selectCellElement,
} from "./helpers";
/* import {
	getRemainingOpenWords,
	getLastOpenWord,
	getFirstOpenWord,
	getPreviousOpenWord,
	getNextOpenWord,
	getWordObj,
} from "./words.js"; */
import { getWordObj } from "./words.js";

/* export const handleTabDirectionChange = (e, direction, setDirection, cells) => {
	const isShiftKeyPressed = e.shiftKey;
	if (e.key !== "Tab") return;
	e.preventDefault();

	const remainingOpenWords = getRemainingOpenWords(direction, cells)[
		isShiftKeyPressed ? "before" : "after"
	];

	if (remainingOpenWords.length !== 0) return;
	setDirection((d) => (d === "across" ? "down" : "across"));
}; */

/* const changeDirectionOnTabKey = (e, direction, setDirection, cells) => {
	const isShiftKeyPressed = e.shiftKey;
	if (e.key !== "Tab") return;
	e.preventDefault();

	const { openWordObjBefore, openWordObjAfter } = getWordObj(direction, cells);
	const nextOpenWordObj = isShiftKeyPressed
		? openWordObjBefore
		: openWordObjAfter;

	if (nextOpenWordObj) return;

	setDirection((d) => (d === "across" ? "down" : "across"));
}; */

/* export const getCellElement = (cell) => {
	const cellElements = document.getElementsByClassName("cell");
	return cellElements[cell.index];
}; */

/* export const handleTabMovement = (e, direction, cells) => {
	const isShiftKeyPressed = e.shiftKey;
	if (e.key !== "Tab") return;
	e.preventDefault();

	const nextDirection = direction === "across" ? "down" : "across";
	const firstOpenWordNextDirection = isShiftKeyPressed
		? getLastOpenWord(nextDirection, cells)
		: getFirstOpenWord(nextDirection, cells);
	const nextOpenWord = isShiftKeyPressed
		? getPreviousOpenWord(direction, cells)
		: getNextOpenWord(direction, cells);
	const remainingOpenWords = getRemainingOpenWords(direction, cells)[
		isShiftKeyPressed ? "before" : "after"
	];

	if (remainingOpenWords.length === 0) {
		getCellElement(firstOpenWordNextDirection.firstBlankCell).click();
		getCellElement(firstOpenWordNextDirection.firstBlankCell).focus({
			preventScroll: true,
		});
	} else {
		getCellElement(nextOpenWord.firstBlankCell).click();
		getCellElement(nextOpenWord.firstBlankCell).focus({
			preventScroll: true,
		});
	}
}; */

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

/* const getCellToSelect = (e, direction, cells) => {
	// const nextDirection = direction === "across" ? "down" : "across";
	const nextDirection = getNextDirection(direction);
	const initialOpenWordObjNextDirection = getInitialOpenWordObj(
		e,
		nextDirection,
		cells
	);
	const nextOpenWordObj = getNextOpenWordObj(e, direction, cells);
	// Could maybe do return nextOpenWordObj.firstBlank || initialOpenWordObjNextDirection.firstBlank
	const cellToSelect = nextOpenWordObj
		? nextOpenWordObj.firstBlank
		: initialOpenWordObjNextDirection.firstBlank;

	return cellToSelect;
}; */

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
