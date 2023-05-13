export const setSymmetricalCellStyle = (
	e,
	setCells,
	setFn,
	cellsCount = 225
) => {
	const lastCellIndex = cellsCount - 1;
	const centerCellIndex = Math.floor(cellsCount / 2);
	const targetIndex = Number(e.target.dataset.index);
	const symmetricalCellIndex = lastCellIndex - targetIndex;

	if (targetIndex !== centerCellIndex) {
		setFn(e, setCells, symmetricalCellIndex);
	}
};
