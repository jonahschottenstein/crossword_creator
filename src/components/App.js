import "../App.css";
import React, { useState } from "react";
import { setDirectionOnClick } from "../utilities/direction.js";
import { createCellObjects } from "../utilities/createCellObjects.js";
import { Board } from "./Board.js";
import { CellBlockSettings } from "./CellBlockSettings.js";
import { getNumberedCells, isAcross, isDown } from "../utilities/numbers.js";
import { ClueListsContainer } from "./ClueListsContainer";
import {
	handleArrowKeyDirectionChange,
	handleArrowKeyMovement,
} from "../utilities/arrows";
import {
	handleTabDirectionChange,
	handleTabMovement,
} from "../utilities/tab.js";

export default function App() {
	const [direction, setDirection] = useState("across");
	const [cells, setCells] = useState(createCellObjects());
	const [cellBlockSettings, setCellBlockSettings] = useState({
		cellBlockIsChecked: false,
		symmetryIsChecked: true,
	});

	const setSelectedCell = (e) => {
		if (cellBlockSettings.cellBlockIsChecked === true) return;
		if (e.target.classList.contains("cell-block")) return;

		const targetIndex = Number(e.target.dataset.index);
		setCells((prevState) => {
			const newState = prevState.map((cell) => {
				if (cell.index === targetIndex) {
					return { ...cell, isSelected: true };
				} else {
					return { ...cell, isSelected: false };
				}
			});
			return newState;
		});
	};

	const setCellBlock = (e) => {
		if (cellBlockSettings.cellBlockIsChecked === false) return;

		const targetIndex = Number(e.target.dataset.index);
		setCells((prevState) => {
			const newState = prevState.map((cell) => {
				if (cell.index === targetIndex) {
					return { ...cell, isBlackSquare: !cell.isBlackSquare };
				} else {
					return cell;
				}
			});
			return newState;
		});
	};

	const setSymmetricalCellBlock = (e) => {
		/* Not sure if when targetCell is (not) a cellBlock and symmetricalCell is the opposite if it should toggle both or set them to be the same first. */
		if (cellBlockSettings.symmetryIsChecked === false) return;
		if (cellBlockSettings.cellBlockIsChecked === false) return;

		const numberOfCells = cells.length;
		const lastCellIndex = numberOfCells - 1;
		const centerCellIndex = Math.floor(numberOfCells / 2);
		const targetIndex = Number(e.target.dataset.index);
		const symmetricalCellIndex = lastCellIndex - targetIndex;

		if (targetIndex !== centerCellIndex) {
			setCells((prevState) => {
				const newState = prevState.map((cell) => {
					if (cell.index === symmetricalCellIndex) {
						return { ...cell, isBlackSquare: !cell.isBlackSquare };
					} else {
						return cell;
					}
				});
				return newState;
			});
		}
	};

	const setCellNumbers = () => {
		if (cellBlockSettings.cellBlockIsChecked === false) return;

		setCells((prevState) => {
			const numberedCells = getNumberedCells(prevState);
			const newState = prevState.map((cell) => {
				if (numberedCells.includes(cell)) {
					return { ...cell, number: numberedCells.indexOf(cell) + 1 };
				} else {
					return { ...cell, number: null };
				}
			});
			return newState;
		});
	};

	const setClues = () => {
		if (cellBlockSettings.cellBlockIsChecked === false) return;

		setCells((prevState) => {
			const newState = prevState.map((cell, index, array) => {
				if (isAcross(array, cell) && isDown(array, cell)) {
					return { ...cell, across: true, down: true };
				} else if (isAcross(array, cell) && !isDown(array, cell)) {
					return { ...cell, across: true, down: false };
				} else if (!isAcross(array, cell) && isDown(array, cell)) {
					return { ...cell, across: false, down: true };
				} else {
					return { ...cell, across: false, down: false };
				}
			});
			return newState;
		});
	};

	const handleClick = (e) => {
		setDirectionOnClick(e, cells, setDirection);
		setSelectedCell(e);
		setCellBlock(e);
		setSymmetricalCellBlock(e);
		setCellNumbers(e);
		setClues();
	};

	const setCellLetter = (e) => {
		const entryIsValid = (e) =>
			!e.metaKey && !e.altKey && !e.ctrlKey && /\b[A-Za-z0-9]{1}\b/.test(e.key);
		if (!entryIsValid(e)) return;

		const getSelectedCell = (cell) => cell.isSelected === true;
		const selectedCellIndex = cells.findIndex(getSelectedCell);

		setCells((prevState) => {
			const newState = prevState.map((cell) => {
				if (cell.index === selectedCellIndex) {
					return { ...cell, letter: e.key.toUpperCase() };
				} else {
					return cell;
				}
			});
			return newState;
		});
	};

	const handleKeyDown = (e) => {
		setCellLetter(e);
		handleArrowKeyDirectionChange(e, direction, setDirection);
		handleArrowKeyMovement(e, direction, cells);
		handleTabDirectionChange(e, direction, setDirection, cells);
		handleTabMovement(e, direction, cells);
	};

	const removeCellSelection = (cellBlockIsChecked) => {
		if (cellBlockIsChecked === false) return;
		setCells((prevState) => {
			const newState = prevState.map((cell) => {
				if (cell.isSelected) {
					return { ...cell, isSelected: false };
				} else {
					return { ...cell };
				}
			});
			return newState;
		});
	};

	const handleToggleChange = (e) => {
		const name = e.target.name;
		let settings = { ...cellBlockSettings };
		settings[name] = !cellBlockSettings[name];
		removeCellSelection(settings.cellBlockIsChecked);
		setCellBlockSettings(settings);
	};

	const handleChange = (e) => {
		handleToggleChange(e);
	};

	return (
		<div className="App">
			<CellBlockSettings
				cellBlockIsChecked={cellBlockSettings.cellBlockIsChecked}
				symmetryIsChecked={cellBlockSettings.symmetryIsChecked}
				onChange={handleChange}
			/>
			<Board
				direction={direction}
				cells={cells.slice()}
				onClick={(e) => handleClick(e)}
				onKeyDown={handleKeyDown}
			/>
			<ClueListsContainer
				acrossClueNumbers={cells
					.filter(
						(cell) => cell.isBlackSquare === false && cell.across === true
					)
					.map((cell) => cell.number)}
				downClueNumbers={cells
					.filter((cell) => cell.isBlackSquare === false && cell.down === true)
					.map((cell) => cell.number)}
			/>
		</div>
	);
}
