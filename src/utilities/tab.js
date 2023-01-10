import {
	getRemainingOpenWords,
	getLastOpenWord,
	getFirstOpenWord,
	getPreviousOpenWord,
	getNextOpenWord,
} from "./words.js";

export const handleTabDirectionChange = (e, direction, setDirection, cells) => {
	const isShiftKeyPressed = e.shiftKey;
	if (e.key !== "Tab") return;
	e.preventDefault();

	const remainingOpenWords = getRemainingOpenWords(direction, cells)[
		isShiftKeyPressed ? "before" : "after"
	];

	if (remainingOpenWords.length !== 0) return;
	setDirection((d) => (d === "across" ? "down" : "across"));
};

const getCellElement = (cell) => {
	const cellElements = document.getElementsByClassName("cell");
	return cellElements[cell.index];
};

export const handleTabMovement = (e, direction, cells) => {
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
};
