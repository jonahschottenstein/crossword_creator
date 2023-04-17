export const setSymmetricalCellStyle = (e, cells, setCells, setFn) => {
	const numberOfCells = cells.length;
	const lastCellIndex = numberOfCells - 1;
	const centerCellIndex = Math.floor(numberOfCells / 2);
	const targetIndex = Number(e.target.dataset.index);
	const symmetricalCellIndex = lastCellIndex - targetIndex;

	if (targetIndex !== centerCellIndex) {
		setFn(e, setCells, symmetricalCellIndex);
	}
};
