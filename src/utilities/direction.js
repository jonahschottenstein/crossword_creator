// TODO: Maybe give file a more specific name
export const setDirectionOnClick = (e, cells, setDirection) => {
	const selectedCellIndex = cells.findIndex((cell) => cell.isSelected);
	const targetIndex = Number(e.target.dataset.index);
	const selectedCellIsClicked = selectedCellIndex === targetIndex;

	if (!selectedCellIsClicked) return;
	// TODO: Maybe use changeDirection() from helpers.js
	setDirection((d) => (d === "across" ? "down" : "across"));
};
