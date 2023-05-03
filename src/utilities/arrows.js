import { getCellBefore, getCellAfter, selectCellElement } from "./helpers";

const changeDirectionOnArrowKey = (e, direction, setDirection) => {
	e.preventDefault();

	if (direction === "down") {
		if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
			setDirection("across");
		}
	} else {
		if (e.key === "ArrowUp" || e.key === "ArrowDown") {
			setDirection("down");
		}
	}
};

const getSelectedRow = (cells) => {
	const selectedCell = cells.find((cell) => cell.isSelected);
	return cells.filter((cell) => cell.row === selectedCell.row);
};

const getSelectedColumn = (cells) => {
	const selectedCell = cells.find((cell) => cell.isSelected);
	return cells.filter((cell) => cell.column === selectedCell.column);
};

//? Should this be two functions?
const getGridSectionCells = (direction, cells) => {
	const selectedRow = getSelectedRow(cells);
	const selectedColumn = getSelectedColumn(cells);
	const gridSection = direction === "across" ? selectedRow : selectedColumn;
	const gridSectionCells = gridSection.filter((cell) => !cell.isBlackSquare);

	return gridSectionCells;
};

const getNextCellOnArrowKey = (e, direction, cells) => {
	const gridSectionCells = getGridSectionCells(direction, cells);
	const cellBefore = getCellBefore(gridSectionCells);
	const cellAfter = getCellAfter(gridSectionCells);

	if (direction === "across") {
		if (e.key === "ArrowLeft") return cellBefore;
		if (e.key === "ArrowRight") return cellAfter;
	} else {
		if (e.key === "ArrowUp") return cellBefore;
		if (e.key === "ArrowDown") return cellAfter;
	}
};

const arrowIsPressed = (e) => {
	return (
		e.key === "ArrowLeft" ||
		e.key === "ArrowRight" ||
		e.key === "ArrowUp" ||
		e.key === "ArrowDown"
	);
};

const selectCellElementOnArrowKey = (e, direction, cells) => {
	if (!arrowIsPressed(e)) return;

	const nextCell = getNextCellOnArrowKey(e, direction, cells);

	if (!nextCell) return;

	selectCellElement(nextCell);
};

export const handleArrowKeys = (e, direction, setDirection, cells) => {
	changeDirectionOnArrowKey(e, direction, setDirection);
	selectCellElementOnArrowKey(e, direction, cells);
};
