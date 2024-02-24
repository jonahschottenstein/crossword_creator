import { getSelectedCell } from "./helpers";

export const setCellLetter = (e, cells, setCells) => {
	const selectedCell = getSelectedCell(cells);
	const letterKeyIsPressed = e.target.matches("button.mobile-keyboard-key");
	const letter = letterKeyIsPressed ? e.target.value : e.key.toUpperCase();

	setCells((prevState) => {
		const newState = prevState.map((cell) => {
			if (cell.index === selectedCell.index) {
				return { ...cell, letter };
			} else {
				return cell;
			}
		});
		return newState;
	});
};
