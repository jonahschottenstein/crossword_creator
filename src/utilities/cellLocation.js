export const getCellIndex = (cell) => Number(cell.dataset.index);

export const cellsInSameColumn = (cell1, cell2) =>
	getCellIndex(cell1) % 15 === getCellIndex(cell2) % 15;

export const cellInFirstRow = (cell) => getCellIndex(cell) < 15;

export const cellInFirstColumn = (cell) => getCellIndex(cell) % 15 === 0;

export const cellInLastRow = (cell) => getCellIndex(cell) > 209;

export const cellInLastColumn = (cell) => getCellIndex(cell) % 15 === 14;
