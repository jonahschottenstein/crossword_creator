import {
	isCellBlock,
	cellInFirstRow,
	cellInFirstColumn,
	previousAcrossCellBlocked,
	previousDownCellBlocked,
} from "./helpers";

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
