import { isAcross, isDown } from "../utilities/numbers.js";

export const setClues = (setCells) => {
	setCells((prevState) => {
		const newState = prevState.map((cell, index, array) => {
			if (isAcross(array, cell) && isDown(array, cell)) {
				return { ...cell, across: true, down: true };
			} else if (isAcross(array, cell) && !isDown(array, cell)) {
				return { ...cell, across: true, down: false };
			} else if (!isAcross(array, cell) && isDown(array, cell)) {
				return { ...cell, across: false, down: true };
			} else {
				return { ...cell, across: false, down: false };
			}
		});
		return newState;
	});
};
