const isCellBlock = (cell) =>
	cell.querySelector(".cell-rect").classList.contains("cell-block");

const cellInRow1 = (cell) => cell.dataset.index < 15;

const cellInColumn1 = (cell) => cell.dataset.index % 15 === 0;

const getCellIndex = (cell) => cell.dataset.index;

const previousAcrossCellBlocked = (cell) =>
	cell.previousElementSibling
		.querySelector(".cell-rect")
		.classList.contains("cell-block");

const previousDownCellBlocked = (cell) =>
	document
		.querySelector(`.cell-rect[data-index="${getCellIndex(cell) - 15}"`)
		.classList.contains("cell-block");

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
			(cellInRow1(cell) ||
				cellInColumn1(cell) ||
				previousAcrossCellBlocked(cell) ||
				previousDownCellBlocked(cell))
	);
};

const isAcross = (cell) =>
	!isCellBlock(cell) &&
	(cellInColumn1(cell) || previousAcrossCellBlocked(cell));

const isDown = (cell) =>
	!isCellBlock(cell) && (cellInRow1(cell) || previousDownCellBlocked(cell));

export const getAcrossNumbers = (numberedCells) => {
	return numberedCells
		.filter((cell) => isAcross(cell))
		.map((cell) => cell.querySelector(".cell-number").textContent);
};

export const getDownNumbers = (numberedCells) => {
	return numberedCells
		.filter((cell) => isDown(cell))
		.map((cell) => cell.querySelector(".cell-number").textContent);
};
