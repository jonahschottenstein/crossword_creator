import "../App.css";
import React, { useState } from "react";
import { setDirectionOnClick } from "../utilities/direction.js";
import { setSelectedCell } from "../utilities/setSelectedCell.js";
import { setCellBlock } from "../utilities/setCellBlock.js";
import { setSymmetricalCellBlock } from "../utilities/setSymmetricalCellBlock.js";
import { setCellNumbers } from "../utilities/setCellNumbers.js";
import { setClues } from "../utilities/setClues.js";
import { handleLetterKey } from "../utilities/letters.js";
import { removeCellSelection } from "../utilities/removeCellSelection.js";
import { createCellObjects } from "../utilities/createCellObjects.js";
import { ClueListsContainer } from "./ClueListsContainer";
import { handleArrowKeys } from "../utilities/arrows";
import { handleTabKey } from "../utilities/tab.js";
import { handleBackspaceKey } from "../utilities/backspace.js";
import { BoardAndSettings } from "./BoardAndSettings";

export default function App() {
	const [direction, setDirection] = useState("across");
	const [cells, setCells] = useState(createCellObjects());
	const [cellBlockSettings, setCellBlockSettings] = useState({
		cellBlockIsChecked: false,
		symmetryIsChecked: true,
	});

	const handleClick = (e) => {
		if (cellBlockSettings.cellBlockIsChecked) {
			setCellBlock(e, setCells);
			cellBlockSettings.symmetryIsChecked &&
				setSymmetricalCellBlock(e, cells, setCells);
			setCellNumbers(setCells);
			setClues(setCells);
		} else {
			setDirectionOnClick(e, cells, setDirection);
			setSelectedCell(e, setCells);
		}
	};

	const handleKeyDown = (e) => {
		handleArrowKeys(e, direction, setDirection, cells);
		handleTabKey(e, direction, setDirection, cells);
		handleLetterKey(e, direction, setDirection, cells, setCells);
		handleBackspaceKey(e, direction, setDirection, cells, setCells);
	};

	const handleToggleChange = (e) => {
		removeCellSelection(setCells);

		const name = e.target.name;
		let settings = { ...cellBlockSettings };
		settings[name] = !cellBlockSettings[name];
		setCellBlockSettings(settings);
	};

	const handleChange = (e) => {
		handleToggleChange(e);
	};

	return (
		<div className="App">
			<BoardAndSettings
				direction={direction}
				cells={cells.slice()}
				onClick={(e) => handleClick(e)}
				onKeyDown={handleKeyDown}
				cellBlockIsChecked={cellBlockSettings.cellBlockIsChecked}
				symmetryIsChecked={cellBlockSettings.symmetryIsChecked}
				onChange={handleChange}
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
