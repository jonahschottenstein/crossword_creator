import { getRowAndColumn } from "../utilities/rowsColumns.js";

const NUMBER_OF_CELLS = 225;
const GRID_CELLS_SPAN = 15;

/* export const createCellObjects = () => {
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
}; */

// TODO: export const createCellObjects = (cellsPerRow = 15, cellsPerColumn = cellsPerRow) => {}. If you do this, cellsCount (i.e., NUMBER_OF_CELLS) should be calculated inside the function
export const createCellObjects = () => {
	let numberedCells = [];
	const cellsArray = Array.from(Array(NUMBER_OF_CELLS).keys()).map(
		(key, index) => {
			if (index < GRID_CELLS_SPAN || index % GRID_CELLS_SPAN === 0) {
				numberedCells = numberedCells.concat(key);
			}
			const id = `cell-${index}`;
			const { row, column } = getRowAndColumn(key);
			const number = numberedCells.includes(key)
				? numberedCells.indexOf(key) + 1
				: null;
			const isAcross = index % GRID_CELLS_SPAN === 0;
			const isDown = index < GRID_CELLS_SPAN;
			const clueText = {
				across: isAcross ? "" : undefined,
				down: isDown ? "" : undefined,
			};

			return {
				id,
				index,
				tabIndex: 0,
				row,
				column,
				number,
				across: isAcross,
				down: isDown,
				letter: "",
				isSelected: false,
				isShaded: false,
				isCircled: false,
				isBlackSquare: false,
				clueText,
			};
		}
	);
	return cellsArray;
};
