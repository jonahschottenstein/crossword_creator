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
