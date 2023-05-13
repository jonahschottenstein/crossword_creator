// TODO: Maybe give file a more specific name
import { changeDirection } from "./helpers";

export const setDirectionOnClick = (e, setDirection) => {
	const selectedCellElement = document.querySelector(".cell.selected");
	const selectedCellIndex =
		selectedCellElement && Number(selectedCellElement.dataset.index);
	const targetIndex = Number(e.target.dataset.index);
	const selectedCellIsClicked = selectedCellIndex === targetIndex;
	if (!selectedCellIsClicked) return;

	changeDirection(setDirection);
};
