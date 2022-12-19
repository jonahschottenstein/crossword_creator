import { getCellIndex } from "./cellLocation.js";

export const previousAcrossCellBlocked = (cell) =>
	cell.previousElementSibling
		.querySelector(".cell-rect")
		.classList.contains("cell-block");

export const previousDownCellBlocked = (cell) =>
	document
		.querySelector(`.cell-rect[data-index="${getCellIndex(cell) - 15}"]`)
		.classList.contains("cell-block");

export const nextAcrossCellBlocked = (cell) =>
	cell.nextElementSibling
		.querySelector(".cell-rect")
		.classList.contains("cell-block");

export const nextDownCellBlocked = (cell) =>
	document
		.querySelector(`.cell-rect[data-index="${getCellIndex(cell) + 15}"]`)
		.classList.contains("cell-block");
