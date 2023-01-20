import { getWordObj } from "./words";

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
		top: clueLi.offsetTop - 47,
		behavior: "smooth",
	});
};
