const getRowStarts = (cells) => {
	const rowStarts = cells.filter((cell, index) => {
		return index % 15 === 0;
	});
	return rowStarts;
};

const getRowEnds = (cells) => {
	const rowEnds = cells.filter((cell, index) => {
		return index % 15 === 14;
	});
	return rowEnds;
};

const getColumnStarts = (cells) => {
	const columnStarts = cells.filter((cell, index) => {
		return index <= 14;
	});
	return columnStarts;
};

const getColumnEnds = (cells) => {
	const columnEnds = cells.filter((cell, index) => {
		return index >= 210;
	});
	return columnEnds;
};

export const createRows = () => {
	const keysArray = Array.from(Array(225).keys());
	const rowStarts = getRowStarts(keysArray);
	const rowEnds = getRowEnds(keysArray);
	const rows = rowStarts.map((start, startIndex) => {
		return keysArray.slice(start, rowEnds[startIndex] + 1);
	});
	return rows;
};
