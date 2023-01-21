import { changeDirection, selectCellElement } from "./helpers";
import { getWordObj, getWordObjs } from "./words";

export const getClueProps = (direction, cells) => {
	const { selectedWordObj } = getWordObj(direction, cells);
	const selectedWordFirstCell = selectedWordObj?.firstCell;

	return {
		clueDirection: direction,
		clueNumber: selectedWordFirstCell?.number,
	};
};

const getClueList = (direction) =>
	document.getElementById(`${direction}-clue-list`);

const getClueLi = (direction, cells) => {
	const clueList = getClueList(direction);
	const { selectedWordObj } = getWordObj(direction, cells);

	if (!clueList) return;

	const listItems = [...clueList.querySelectorAll(".clue-list-item")];
	const clueLi = listItems.find(
		(li) =>
			Number(li.querySelector(".clue-label").textContent) ===
			selectedWordObj?.clueNumber
	);

	return clueLi;
};

export const scrollToLi = (direction, cells) => {
	const clueList = getClueList(direction);
	const clueLi = getClueLi(direction, cells);

	if (!clueList || !clueLi) return;

	clueList.scrollTo({
		top: clueLi.offsetTop - 74,
		behavior: "smooth",
	});
};

export const getClueLiNumber = (e) => {
	if (!e.target.matches(".clue-list-item")) return;

	const clueLiNumber = Number(
		e.target.querySelector(".clue-label").textContent
	);

	return clueLiNumber;
};

export const getClueLiDirection = (e) => {
	if (!e.target.matches(".clue-list-item")) return;

	const closestWrapper = e.target.closest(".clue-list-wrapper");
	const clueLiDirection =
		closestWrapper.querySelector(".clue-list-title").textContent;

	return clueLiDirection;
};

export const getWordToHighlight = (e, cells) => {
	const clueLiNumber = getClueLiNumber(e);
	const clueLiDirection = getClueLiDirection(e);
	const wordObjs = getWordObjs(clueLiDirection, cells);

	const wordToHighlight = wordObjs.find(
		(obj) => obj.clueNumber === clueLiNumber
	);

	return wordToHighlight;
};

export const getCellOnLiClick = (e, cells) => {
	const wordToHighlight = getWordToHighlight(e, cells);

	return wordToHighlight.firstBlank || wordToHighlight.firstCell;
};

export const selectCellElementOnLiClick = (
	e,
	direction,
	setDirection,
	cells
) => {
	const cellToSelect = getCellOnLiClick(e, cells);
	const clueLiDirection = getClueLiDirection(e);

	if (direction !== clueLiDirection) {
		changeDirection(setDirection);
	}

	selectCellElement(cellToSelect);
};
