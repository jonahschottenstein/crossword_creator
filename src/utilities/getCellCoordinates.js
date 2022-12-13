export const getCellCoordinates = (cellsPerRow) => {
	let array = [];
	const CELL_LENGTH = 32;
	const GRID_LENGTH = cellsPerRow * CELL_LENGTH;

	for (let y = 0; y < GRID_LENGTH; y += CELL_LENGTH) {
		for (let x = 0; x < GRID_LENGTH; x += CELL_LENGTH) {
			array.push({ x: x, y: y });
		}
	}
	return array;
};
