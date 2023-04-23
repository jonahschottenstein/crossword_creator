const getXOffset = (paperWidth = 215.9, gridWidth = 120) => {
	return (paperWidth - gridWidth) / 2;
};

const getYOffset = (paperHeight = 279.4, gridHeight = 120) => {
	return (paperHeight - gridHeight) / 2;
};

const getSquareCoords = (
	gridLength = 15,
	squareLength = 8,
	xOffset = getXOffset(),
	yOffset = getYOffset()
) => {
	let arr = [];
	for (let i = 0; i < 15; i++) {
		for (let j = 0; j <= (gridLength - 1) * squareLength; j += squareLength) {
			arr.push({ x: j + xOffset, y: i * squareLength + yOffset });
		}
	}

	return arr;
};
