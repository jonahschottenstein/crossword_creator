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

/* export const scrollToLi = (direction, cells) => {
	const clueList = getClueList(direction);
	const clueLi = getClueLi(direction, cells);

	if (!clueList || !clueLi) return;

	clueList.scrollTo({
		top: clueLi.offsetTop - 110,
		// top: clueLi.offsetTop - 74,
		// top: clueLi.offsetTop - 77,
		behavior: "smooth",
	});
}; */
export const scrollToLi = (direction, cells) => {
	const clueList = getClueList(direction);
	const clueLi = getClueLi(direction, cells);

	if (!clueList || !clueLi) return;
	// TODO: const MEDIA_QUERY_MIN_WIDTH = 961
	if (window.innerWidth >= 961 || direction === "across") {
		// TODO: const OFFSET_CORRECTION = 78
		clueList.scrollTo({
			top: clueLi.offsetTop - 78,
			behavior: "smooth",
		});
	} else {
		// TODO: const OFFSET_CORRECTION = 382
		clueList.scrollTo({
			top: clueLi.offsetTop - 382,
			behavior: "smooth",
		});
	}
};

/* export const getClueLiNumber = (e) => {
	console.log("getClueLiNumber", e.target);
	if (!e.target.matches(".clue-list-item")) return;

	const clueLiNumber = Number(
		e.target.querySelector(".clue-label").textContent
	);

	return clueLiNumber;
}; */
export const getClueLiNumber = (e) => {
	if (!e.target.matches(".clue-list-item")) return;

	const clueLiNumber = Number(
		e.target.closest(".clue-list-item").querySelector(".clue-label").textContent
	);

	return clueLiNumber;
};

/* export const getClueLiDirection = (e) => {
	if (!e.target.matches(".clue-list-item")) return;

	const closestWrapper = e.target.closest(".clue-list-wrapper");
	const clueLiDirection =
		closestWrapper.querySelector(".clue-list-title").textContent;

	return clueLiDirection;
}; */
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

	return wordToHighlight?.firstBlank || wordToHighlight?.firstCell;
};

export const selectCellElementOnLiClick = (
	e,
	direction,
	setDirection,
	cells
) => {
	const cellToSelect = getCellOnLiClick(e, cells);

	if (!cellToSelect) return;

	const clueLiDirection = getClueLiDirection(e);
	const wordToHighlight = getWordToHighlight(e, cells);
	const firstCell = wordToHighlight.firstCell;
	const firstCellIsSelected = firstCell.isSelected;

	if (e.target.matches(".clue-list-item.highlighted")) {
		if (firstCellIsSelected) return;
		selectCellElement(firstCell);
	} else {
		if (direction !== clueLiDirection && !cellToSelect.isSelected) {
			// 1. different clue number, different direction, different cellToSelect
			changeDirection(setDirection);
			selectCellElement(cellToSelect);
		} else {
			// 1. same clue number, same cellToSelect, different direction
			// 2. different clue number, different cellToSelect, different direction (click opp. clue when !firstCell.isSelected)
			// 3. different clue number, different cellToSelect, same direction
			selectCellElement(cellToSelect);
		}
	}
};
