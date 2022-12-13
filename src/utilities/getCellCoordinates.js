export const getCellCoordinates = (cellsPerRow) => {
	let array = [];
	const CELL_LENGTH = 33;
	const GRID_LENGTH = cellsPerRow * CELL_LENGTH;

	for (let y = 3; y < GRID_LENGTH; y += CELL_LENGTH) {
		for (let x = 3; x < GRID_LENGTH; x += CELL_LENGTH) {
			array.push({ x: x, y: y });
		}
	}
	return array;
};
