/* const getRowStarts = (cells) => {
	const rowStarts = cells.filter((cell, index) => {
		return index % 15 === 0;
	});
	return rowStarts;
}; */
const getRowStarts = (cells, cellsPerRow = 15) => {
	const rowStarts = cells.filter((cell, index) => {
		return index % cellsPerRow === 0;
	});
	return rowStarts;
};

/* const getRowEnds = (cells) => {
	const rowEnds = cells.filter((cell, index) => {
		return index % 15 === 14;
	});
	return rowEnds;
}; */
const getRowEnds = (cells, cellsPerRow = 15, remainder = 14) => {
	const rowEnds = cells.filter((cell, index) => {
		return index % cellsPerRow === remainder;
	});
	return rowEnds;
};

/* const getColumnStarts = (cells) => {
	const columnStarts = cells.filter((cell, index) => {
		return index <= 14;
	});
	return columnStarts;
}; */
const getColumnStarts = (cells, cellsPerColumn = 14) => {
	const columnStarts = cells.filter((cell, index) => {
		return index <= cellsPerColumn;
	});
	return columnStarts;
};

/* const getColumnEnds = (cells) => {
	const columnEnds = cells.filter((cell, index) => {
		return index >= 210;
	});
	return columnEnds;
}; */
const getColumnEnds = (cells, cellsPerColumn = 15, cellsCount = 225) => {
	const columnEnds = cells.filter((cell, index) => {
		return index >= cellsCount - cellsPerColumn;
	});
	return columnEnds;
};

/* const createRows = () => {
	const keysArray = Array.from(Array(225).keys());
	const rowStarts = getRowStarts(keysArray);
	const rowEnds = getRowEnds(keysArray);
	const rows = rowStarts.map((start, startIndex) => {
		return keysArray.slice(start, rowEnds[startIndex] + 1);
	});
	return rows;
}; */
const createRows = (cellsCount = 225) => {
	const keysArray = Array.from(Array(cellsCount).keys());
	const rowStarts = getRowStarts(keysArray);
	const rowEnds = getRowEnds(keysArray);
	const rows = rowStarts.map((start, startIndex) => {
		return keysArray.slice(start, rowEnds[startIndex] + 1);
	});
	return rows;
};

/* const createColumns = () => {
	const keysArray = Array.from(Array(225).keys());
	const columnStarts = getColumnStarts(keysArray);
	const columnEnds = getColumnEnds(keysArray);
	const columns = columnStarts.map((start, startIndex) => {
		return keysArray.filter((key, index) => {
			return (
				index >= start &&
				index <= columnEnds[startIndex] &&
				key % 15 === start % 15
			);
		});
	});
	return columns;
}; */
const createColumns = (cellsPerColumn = 15, cellsCount = 225) => {
	const keysArray = Array.from(Array(cellsCount).keys());
	const columnStarts = getColumnStarts(keysArray);
	const columnEnds = getColumnEnds(keysArray);
	const columns = columnStarts.map((start, startIndex) => {
		return keysArray.filter((key, index) => {
			return (
				index >= start &&
				index <= columnEnds[startIndex] &&
				key % cellsPerColumn === start % cellsPerColumn
			);
		});
	});
	return columns;
};

const getCellRow = (key) => {
	const rows = createRows();
	const rowIndex = rows.findIndex((row) => row.includes(key));
	return rowIndex;
};

const getCellColumn = (key) => {
	const columns = createColumns();
	const columnIndex = columns.findIndex((column) => column.includes(key));
	return columnIndex;
};

export const getRowAndColumn = (key) => {
	const row = getCellRow(key);
	const column = getCellColumn(key);
	return { row: row, column: column };
};
