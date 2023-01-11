export const setSymmetricalCellBlock = (e, cells, setCells) => {
	/* Not sure if when targetCell is (not) a cellBlock and symmetricalCell is the opposite if it should toggle both or set them to be the same first. */
	const numberOfCells = cells.length;
	const lastCellIndex = numberOfCells - 1;
	const centerCellIndex = Math.floor(numberOfCells / 2);
	const targetIndex = Number(e.target.dataset.index);
	const symmetricalCellIndex = lastCellIndex - targetIndex;

	if (targetIndex !== centerCellIndex) {
		setCells((prevState) => {
			const newState = prevState.map((cell) => {
				if (cell.index === symmetricalCellIndex) {
					return { ...cell, isBlackSquare: !cell.isBlackSquare };
				} else {
					return cell;
				}
			});
			return newState;
		});
	}
};
