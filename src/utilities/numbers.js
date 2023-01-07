/* import {
	getCellIndex,
	cellInFirstRow,
	cellInFirstColumn,
} from "./cellLocation.js";

import {
	previousAcrossCellBlocked,
	previousDownCellBlocked,
} from "./cellBlockLocation.js";

const isCellBlock = (cell) =>
	cell.querySelector(".cell-rect").classList.contains("cell-block");

const NUMBER_OF_CELLS = 225;
const CELLS_PER_ROW = 15;

const getCellIndexes = () => Array.from(Array(NUMBER_OF_CELLS).keys());

export const getInitialNumberedCellIndexes = () =>
	getCellIndexes().filter(
		(index) => index < CELLS_PER_ROW || index % CELLS_PER_ROW === 0
	);

export const getNumberedCells = () => {
	const cellsArray = [...document.querySelectorAll(".xword-cell")];
	return cellsArray.filter(
		(cell) =>
			!isCellBlock(cell) &&
			(cellInFirstRow(cell) ||
				cellInFirstColumn(cell) ||
				previousAcrossCellBlocked(cell) ||
				previousDownCellBlocked(cell))
	);
};

const isAcross = (cell) =>
	!isCellBlock(cell) &&
	(cellInFirstColumn(cell) || previousAcrossCellBlocked(cell));

const isDown = (cell) =>
	!isCellBlock(cell) && (cellInFirstRow(cell) || previousDownCellBlocked(cell));

export const getAcrossNumbers = (numberedCells) => {
	return numberedCells
		.filter((cell) => isAcross(cell))
		.map((cell) => cell.querySelector(".cell-number").textContent);
};

export const getDownNumbers = (numberedCells) => {
	return numberedCells
		.filter((cell) => isDown(cell))
		.map((cell) => cell.querySelector(".cell-number").textContent);
}; */

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
