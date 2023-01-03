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
