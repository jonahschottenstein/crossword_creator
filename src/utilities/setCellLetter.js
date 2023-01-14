export const entryIsValid = (e) =>
	!e.metaKey && !e.altKey && !e.ctrlKey && /\b[A-Za-z0-9]{1}\b/.test(e.key);

const getSelectedCell = (cell) => cell.isSelected;

export const setCellLetter = (e, cells, setCells) => {
	if (!entryIsValid(e)) return;
	const selectedCellIndex = cells.findIndex(getSelectedCell);

	setCells((prevState) => {
		const newState = prevState.map((cell) => {
			if (cell.index === selectedCellIndex) {
				return { ...cell, letter: e.key.toUpperCase() };
			} else {
				return cell;
			}
		});
		return newState;
	});
};
