import {
	isCellBlock,
	cellInFirstRow,
	cellInFirstColumn,
	previousAcrossCellBlocked,
	previousDownCellBlocked,
} from "./helpers";

//? Not sure if this should be its own file
// TODO: If this file remains, maybe change file name to be more specific

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
