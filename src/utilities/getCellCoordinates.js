export const getCellCoordinates = (cellsPerRow) => {
	let array = [];
	const CELL_Width = 32;
	const lastCellStart = cellsPerRow * CELL_Width - CELL_Width;

	for (let i = 0; i <= cellsPerRow; i++) {
		for (let j = 0; j < lastCellStart; j += CELL_Width) {
			array.push({ x: j, y: i });
		}
	}
	return array;
};
