import { getNumberedCells } from "./numbers.js";

export const setCellNumbers = (setCells) => {
	setCells((prevState) => {
		const numberedCells = getNumberedCells(prevState);
		const newState = prevState.map((cell) => {
			if (numberedCells.includes(cell)) {
				return { ...cell, number: numberedCells.indexOf(cell) + 1 };
			} else {
				return { ...cell, number: null };
			}
		});
		return newState;
	});
};
