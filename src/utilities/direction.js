export const setDirectionOnClick = (e, cells, setDirection) => {
	const selectedCellIndex = cells.findIndex((cell) => cell.isSelected);
	const targetIndex = Number(e.target.dataset.index);
	const selectedCellIsClicked = selectedCellIndex === targetIndex;

	if (!selectedCellIsClicked) return;
	setDirection((d) => (d === "across" ? "down" : "across"));
};
