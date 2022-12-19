export const getCellIndex = (cell) => Number(cell.dataset.index);

export const cellsInSameColumn = (cell1, cell2) =>
	cell1.dataset.index % 15 === cell2.dataset.index % 15;

export const cellInFirstRow = (cell) => cell.dataset.index < 15;

export const cellInFirstColumn = (cell) => cell.dataset.index % 15 === 0;

export const cellInLastRow = (cell) => cell.dataset.index > 209;

export const cellInLastColumn = (cell) => cell.dataset.index % 15 === 14;
