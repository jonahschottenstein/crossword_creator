const getRowStarts = (cells) => {
	const rowStarts = cells.filter((cell, index) => {
		return index % 15 === 0;
	});
	return rowStarts;
};
