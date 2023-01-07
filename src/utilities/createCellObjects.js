import { getRowAndColumn } from "../utilities/rowsColumns.js";

const NUMBER_OF_CELLS = 225;
const GRID_CELLS_SPAN = 15;

export const createCellObjects = () => {
	let numberedCells = [];
	const cellsArray = Array.from(Array(NUMBER_OF_CELLS).keys()).map(
		(key, index) => {
			if (index < GRID_CELLS_SPAN || index % GRID_CELLS_SPAN === 0) {
				numberedCells = numberedCells.concat(key);
			}
			return {
				id: `cell-${index}`,
				index: index,
				tabIndex: 0,
				row: getRowAndColumn(key).row,
				column: getRowAndColumn(key).column,
				number: numberedCells.includes(key)
					? numberedCells.indexOf(key) + 1
					: null,
				across: index % GRID_CELLS_SPAN === 0 ? true : false,
				down: index < GRID_CELLS_SPAN ? true : false,
				letter: "",
				isSelected: false,
				isBlackSquare: false,
			};
		}
	);
	return cellsArray;
};
