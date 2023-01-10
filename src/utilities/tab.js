import {
	getFirstAvailableWord,
	getLastAvailableWord,
	getPreviousAvailableWord,
	getNextAvailableWord,
	getRemainingAvailableWords,
	getRemainingOpenWords,
} from "./words.js";

/* export const handleTabDirectionChange = (e, direction, setDirection, cells) => {
	const isShiftKeyPressed = e.shiftKey;
	if (e.key !== "Tab") return;
	e.preventDefault();

	const remainingAvailableWords = getRemainingAvailableWords(direction, cells)[
		isShiftKeyPressed ? "before" : "after"
	];

	if (remainingAvailableWords.length !== 0) return;
	setDirection((d) => (d === "across" ? "down" : "across"));
}; */

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
	const firstAvailableWordNextDirection = isShiftKeyPressed
		? getLastAvailableWord(nextDirection, cells)
		: getFirstAvailableWord(nextDirection, cells);
	const nextAvailableWord = isShiftKeyPressed
		? getPreviousAvailableWord(direction, cells)
		: getNextAvailableWord(direction, cells);
	const remainingAvailableWords = getRemainingAvailableWords(direction, cells)[
		isShiftKeyPressed ? "before" : "after"
	];

	if (remainingAvailableWords.length === 0) {
		getCellElement(firstAvailableWordNextDirection.firstBlankCell).click();
		getCellElement(firstAvailableWordNextDirection.firstBlankCell).focus({
			preventScroll: true,
		});
	} else {
		getCellElement(nextAvailableWord.firstBlankCell).click();
		getCellElement(nextAvailableWord.firstBlankCell).focus({
			preventScroll: true,
		});
	}
};
