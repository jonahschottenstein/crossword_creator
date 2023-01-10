import {
	isCellBlock,
	cellInFirstRow,
	cellInFirstColumn,
	previousAcrossCellBlocked,
	previousDownCellBlocked,
} from "./cellDescriptors.js";

export const getNumberedCells = (cells) => {
	return cells.filter(
		(cell, index, array) =>
			!isCellBlock(cell) &&
			(cellInFirstRow(cell) ||
				cellInFirstColumn(cell) ||
				previousAcrossCellBlocked(array, cell) ||
				previousDownCellBlocked(array, cell))
	);
};

export const isAcross = (array, cell) => {
	return (
		!isCellBlock(cell) &&
		(cellInFirstColumn(cell) || previousAcrossCellBlocked(array, cell))
	);
};

export const isDown = (array, cell) => {
	return (
		!isCellBlock(cell) &&
		(cellInFirstRow(cell) || previousDownCellBlocked(array, cell))
	);
};
