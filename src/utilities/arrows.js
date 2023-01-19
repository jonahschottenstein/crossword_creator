// import { getSelectedCell, selectCellElement } from "./letters";
// import { getCellElement } from "./tab";
import { getCellBefore, getCellAfter, selectCellElement } from "./helpers";

/* export const handleArrowKeyDirectionChange = (e, direction, setDirection) => {
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

const cell1IsBeforeCell2 = (cell1, cell2) => cell1.index < cell2.index;

const getNextAvailableCell = (e, cellRowOrColumn, selectedCell) => {
	const arrayMethod =
		e.key === "ArrowLeft" || e.key === "ArrowUp" ? "findLast" : "find";

	const nextAvailableCell = cellRowOrColumn[arrayMethod]((cell) => {
		const isBeforeOrAfter =
			e.key === "ArrowLeft" || e.key === "ArrowUp"
				? cell1IsBeforeCell2(cell, selectedCell)
				: cell1IsBeforeCell2(selectedCell, cell);
		return isBeforeOrAfter && !cell.isBlackSquare;
	});
	return nextAvailableCell;
};

const getLastAvailableCell = (e, cellRowOrColumn) => {
	const arrayMethod =
		e.key === "ArrowLeft" || e.key === "ArrowUp" ? "find" : "findLast";
	const lastAvailableCell = cellRowOrColumn[arrayMethod](
		(cell) => !cell.isBlackSquare
	);
	return lastAvailableCell;
};

export const handleArrowKeyMovement = (e, direction, cells) => {
	e.preventDefault();

	if (direction === "across") {
		if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
	} else {
		if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
	}

	const selectedCell = cells.find((cell) => cell.isSelected);
	const rowOrColumn = direction === "across" ? "row" : "column";
	const cellRowOrColumn = cells.filter(
		(cell) => cell[rowOrColumn] === selectedCell[rowOrColumn]
	);
	const nextAvailableCell = getNextAvailableCell(
		e,
		cellRowOrColumn,
		selectedCell
	);
	const lastAvailableCell = getLastAvailableCell(e, cellRowOrColumn);

	if (lastAvailableCell.index === selectedCell.index) return;

	const nextAvailableCellElement =
		document.getElementsByClassName("cell")[nextAvailableCell.index];
	nextAvailableCellElement.click();
	nextAvailableCellElement.focus({ preventScroll: true });
}; */

/* ************************************************************************ */

// export const cell1IsBeforeCell2 = (cell1, cell2) => cell1.index < cell2.index;

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

const getGridSectionCells = (direction, cells) => {
	const selectedRow = getSelectedRow(cells);
	const selectedColumn = getSelectedColumn(cells);
	const gridSection = direction === "across" ? selectedRow : selectedColumn;
	const gridSectionCells = gridSection.filter((cell) => !cell.isBlackSquare);

	return gridSectionCells;
};

/* export const getCellBefore = (selectedCell, cellsArray) =>
	cellsArray.findLast((cell) => cell1IsBeforeCell2(cell, selectedCell));

export const getCellAfter = (selectedCell, cellsArray) =>
	cellsArray.find((cell) => cell1IsBeforeCell2(selectedCell, cell)); */

/* const getNextCellOnArrow = (e, direction, cells) => {
	const selectedCell = getSelectedCell(direction, cells);
	const gridSectionCells = getGridSectionCells(direction, cells);
	const cellBefore = getCellBefore(selectedCell, gridSectionCells);
	const cellAfter = getCellAfter(selectedCell, gridSectionCells);

	if (direction === "across") {
		if (e.key === "ArrowLeft") return cellBefore;
		if (e.key === "ArrowRight") return cellAfter;
	} else {
		if (e.key === "ArrowUp") return cellBefore;
		if (e.key === "ArrowDown") return cellAfter;
	}
}; */
/* const getCellToSelectOnArrowKey = (e, direction, cells) => {
	const selectedCell = getSelectedCell(direction, cells);
	const gridSectionCells = getGridSectionCells(direction, cells);
	const cellBefore = getCellBefore(selectedCell, gridSectionCells);
	const cellAfter = getCellAfter(selectedCell, gridSectionCells);

	if (direction === "across") {
		if (e.key === "ArrowLeft") return cellBefore;
		if (e.key === "ArrowRight") return cellAfter;
	} else {
		if (e.key === "ArrowUp") return cellBefore;
		if (e.key === "ArrowDown") return cellAfter;
	}
}; */

/* const getNextCellOnArrowKey = (e, direction, cells) => {
	const selectedCell = getSelectedCell(direction, cells);
	const gridSectionCells = getGridSectionCells(direction, cells);
	const cellBefore = getCellBefore(selectedCell, gridSectionCells);
	const cellAfter = getCellAfter(selectedCell, gridSectionCells);

	if (direction === "across") {
		if (e.key === "ArrowLeft") return cellBefore;
		if (e.key === "ArrowRight") return cellAfter;
	} else {
		if (e.key === "ArrowUp") return cellBefore;
		if (e.key === "ArrowDown") return cellAfter;
	}
}; */
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

/* const selectNextCellElementOnArrow = (e, direction, cells) => {
	if (!arrowIsPressed(e)) return;

	const nextCell = getNextCellOnArrow(e, direction, cells);

	if (!nextCell) return;

	selectCellElement(nextCell);
}; */
/* const selectCellElementOnArrowKey = (e, direction, cells) => {
	if (!arrowIsPressed(e)) return;

	const cellToSelect = getCellToSelectOnArrowKey(e, direction, cells);

	if (!cellToSelect) return;

	selectCellElement(cellToSelect);
}; */
const selectCellElementOnArrowKey = (e, direction, cells) => {
	if (!arrowIsPressed(e)) return;

	const nextCell = getNextCellOnArrowKey(e, direction, cells);

	if (!nextCell) return;

	selectCellElement(nextCell);
};

/* export const handleArrowKeys = (e, direction, setDirection, cells) => {
	changeDirectionOnArrowKey(e, direction, setDirection);
	selectNextCellElementOnArrow(e, direction, cells);
}; */
export const handleArrowKeys = (e, direction, setDirection, cells) => {
	changeDirectionOnArrowKey(e, direction, setDirection);
	selectCellElementOnArrowKey(e, direction, cells);
};
