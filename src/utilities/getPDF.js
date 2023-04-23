const getXOffset = (paperWidth = 215.9, gridWidth = 120) => {
	return (paperWidth - gridWidth) / 2;
};

const getYOffset = (paperHeight = 279.4, gridHeight = 120) => {
	return (paperHeight - gridHeight) / 2;
};
