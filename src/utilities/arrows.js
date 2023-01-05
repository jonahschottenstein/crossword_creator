export const handleArrowKeyDirectionChange = (e, direction, setDirection) => {
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
};
