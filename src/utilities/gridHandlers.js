import { clearFill } from "./clearFill";
import { initAutofillGrid } from "./autofillGrid";

export const handleClearFill = (setCells) => {
	clearFill(setCells);
};

export const handleFillGrid = async (cells, setCells, setIsAutofilling) => {
	await initAutofillGrid(cells, setCells, setIsAutofilling);
};

export const handleAddBlackSquares = (setCells) => {
	// const blackSquareIndexes = [
	// 	4, 10, 19, 25, 40, 45, 46, 47, 65, 66, 67, 72, 73, 74, 82, 83, 84, 101,
	// 	109, 115, 123, 140, 141, 142, 150, 151, 152, 157, 158, 159, 177, 178, 179,
	// 	184, 199, 205, 214, 220,
	// ];
	const blackSquareIndexes = [
		5, 11, 20, 26, 41, 45, 46, 47, 51, 67, 83, 88, 89, 95, 101, 109, 115, 123,
		129, 135, 136, 141, 157, 173, 177, 178, 179, 183, 198, 204, 213, 219,
	];
	setCells((prevState) => {
		const newState = prevState.map((cell) => {
			if (blackSquareIndexes.includes(Number(cell.index))) {
				return { ...cell, isBlackSquare: true };
			} else {
				return cell;
			}
		});

		return newState;
	});
};
