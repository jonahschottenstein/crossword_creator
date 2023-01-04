/* import {
	getCellIndex,
	cellsInSameColumn,
	cellInFirstRow,
	cellInFirstColumn,
	cellInLastRow,
	cellInLastColumn,
} from "./cellLocation.js";

import {
	previousAcrossCellBlocked,
	previousDownCellBlocked,
	nextAcrossCellBlocked,
	nextDownCellBlocked,
} from "./cellBlockLocation.js";

export const getAcrossFirstLetterCells = (numberedCells) => {
	const firstLetterCells = numberedCells.filter(
		(numberedCell) =>
			cellInFirstColumn(numberedCell) || previousAcrossCellBlocked(numberedCell)
	);
	return firstLetterCells;
};

export const getDownFirstLetterCells = (numberedCells) => {
	const firstLetterCells = numberedCells.filter(
		(numberedCell) =>
			cellInFirstRow(numberedCell) || previousDownCellBlocked(numberedCell)
	);
	return firstLetterCells;
};

export const getAcrossLastLetterCells = (firstLetterCells) => {
	const cellsArray = [...document.querySelectorAll(".xword-cell")];
	const lastLetterCells = firstLetterCells.map((firstLetterCell) => {
		return cellsArray.find((cell, index) => {
			return (
				index >= getCellIndex(firstLetterCell) &&
				(cellInLastColumn(cell) || nextAcrossCellBlocked(cell))
			);
		});
	});
	return lastLetterCells;
};

export const getDownLastLetterCells = (firstLetterCells) => {
	const cellsArray = [...document.querySelectorAll(".xword-cell")];
	const lastLetterCells = firstLetterCells.map((firstLetterCell) => {
		return cellsArray.find((cell, index, array) => {
			return (
				index >= getCellIndex(firstLetterCell) &&
				cellsInSameColumn(cell, firstLetterCell) &&
				(cellInLastRow(cell) || nextDownCellBlocked(cell))
			);
		});
	});

	return lastLetterCells;
};

export const getAcrossWords = (firstLetterCells, lastLetterCells) => {
	const cellsArray = [...document.querySelectorAll(".xword-cell")];
	const firstAndLastLetterCells = firstLetterCells.map(
		(firstLetterCell, firstLetterCellIndex, firstLetterCellArray) => ({
			firstLetterCell: firstLetterCellArray[firstLetterCellIndex],
			lastLetterCell: lastLetterCells[firstLetterCellIndex],
		})
	);

	const wordsArray = firstAndLastLetterCells.map(
		({ firstLetterCell, lastLetterCell }) =>
			cellsArray.filter(
				(cell, index) =>
					index >= getCellIndex(firstLetterCell) &&
					index <= getCellIndex(lastLetterCell)
			)
	);

	return wordsArray;
};

export const getDownWords = (firstLetterCells, lastLetterCells) => {
	const cellsArray = [...document.querySelectorAll(".xword-cell")];
	const firstAndLastLetterCells = firstLetterCells.map(
		(firstLetterCell, firstLetterCellIndex, firstLetterCellArray) => ({
			firstLetterCell: firstLetterCellArray[firstLetterCellIndex],
			lastLetterCell: lastLetterCells[firstLetterCellIndex],
		})
	);

	const wordsArray = firstAndLastLetterCells.map(
		({ firstLetterCell, lastLetterCell }) =>
			cellsArray.filter(
				(cell, index) =>
					index >= getCellIndex(firstLetterCell) &&
					index <= getCellIndex(lastLetterCell) &&
					cellsInSameColumn(cell, firstLetterCell)
			)
	);

	return wordsArray;
};
 */

const getStartCells = (direction, cells) => {
	const startCells = cells.filter((cell) => cell[direction] === true);
	return startCells;
};

const getNextBlackSquare = (direction, cells, startCell) => {
	const nextBlackSquare = cells.find((cell, index) => {
		const isInSameCellGroup =
			direction === "across"
				? cell.row === startCell.row
				: cell.column === startCell.column;
		return index > startCell.index && isInSameCellGroup && cell.isBlackSquare;
	});
	return nextBlackSquare;
};

const getRowEnd = (cells, startCell) => {
	const rowIndex = startCell.row;
	const row = cells.filter((cell) => cell.row === rowIndex);
	const rowEnd = row[row.length - 1];
	return rowEnd;
};

const getColumnEnd = (cells, startCell) => {
	const columnIndex = startCell.column;
	const column = cells.filter((cell) => cell.column === columnIndex);
	const columnEnd = column[column.length - 1];
	return columnEnd;
};

const getRowOrColumnEnd = (direction, cells, startCell) => {
	const rowOrColumn = direction === "across" ? "row" : "column";
	const rowOrColumnIndex = startCell[rowOrColumn];
	const rowOrColumnCells = cells.filter(
		(cell) => cell[rowOrColumn] === rowOrColumnIndex
	);
	const rowOrColumnEnd = rowOrColumnCells[rowOrColumnCells.length - 1];
	return rowOrColumnEnd;
};
