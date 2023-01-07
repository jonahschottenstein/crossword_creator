// Black Square:
export const isCellBlock = (cell) => cell.isBlackSquare;

// Cell Position
export const cellInFirstRow = (cell) => cell.index < 15;
export const cellInFirstColumn = (cell) => cell.index % 15 === 0;
export const previousAcrossCellBlocked = (cellsArray, cell) =>
	cellsArray[cell.index - 1].isBlackSquare;
export const previousDownCellBlocked = (cellsArray, cell) =>
	cellsArray[cell.index - 15].isBlackSquare;
