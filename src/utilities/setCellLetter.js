import { getSelectedCell } from "./helpers";

export const setCellLetter = (e, cells, setCells) => {
	const selectedCell = getSelectedCell(cells);

	setCells((prevState) => {
		const newState = prevState.map((cell) => {
			if (cell.index === selectedCell.index) {
				return { ...cell, letter: e.key.toUpperCase() };
			} else {
				return cell;
			}
		});
		return newState;
	});
};
