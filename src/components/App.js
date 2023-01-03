/* import React, { Component } from "react";
import "../App.css";
import Cell from "./Cell";
import { getCellCoordinates } from "../utilities/getCellCoordinates.js";
import { Clue } from "./Clue.js";
import { toggleCellBlock } from "../utilities/toggleCellBlock.js";
import { toggleCellBlockSymmetry } from "../utilities/toggleCellBlockSymmetry.js";
import { ToggleSwitch } from "./ToggleSwitch.js";
import { setTabIndex } from "../utilities/toggleTabIndex.js";
import {
	getNumberedCells,
	getInitialNumberedCellIndexes,
	getAcrossNumbers,
	getDownNumbers,
} from "../utilities/numbers.js";
import { ClueList } from "./ClueList.js";
import { ClueListItem } from "./ClueListItem.js";
import {
	getAcrossFirstLetterCells,
	getDownFirstLetterCells,
	getAcrossLastLetterCells,
	getDownLastLetterCells,
	getAcrossWords,
	getDownWords,
} from "../utilities/words.js";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cellBlockSettings: {
				toggle: false,
				symmetry: true,
			},
			cellBlockCount: 0,
			numberedCellIndexes: getInitialNumberedCellIndexes(),
			acrossClueNumbers: getInitialNumberedCellIndexes()
				.filter((number) => number % 15 === 0)
				.map((number) => getInitialNumberedCellIndexes().indexOf(number) + 1),
			downClueNumbers: getInitialNumberedCellIndexes()
				.filter((number) => number < 15)
				.map((number) => getInitialNumberedCellIndexes().indexOf(number) + 1),
			direction: "across",
		};
		this.handleRectClick = this.handleRectClick.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleRectClick(e) {
		toggleCellBlock(e);
		toggleCellBlockSymmetry(e);
		setTabIndex();

		const numberedCells = getNumberedCells();
		console.log(
			"A-WORDS",
			getAcrossWords(
				getAcrossFirstLetterCells(numberedCells),
				getAcrossLastLetterCells(getAcrossFirstLetterCells(numberedCells))
			)
		);
		console.log(
			"D-WORDS",
			getDownWords(
				getDownFirstLetterCells(numberedCells),
				getDownLastLetterCells(getDownFirstLetterCells(numberedCells))
			)
		);

		this.setState(
			{
				cellBlockCount: document.getElementsByClassName("cell-block").length,
				numberedCellIndexes: numberedCells.map((cell) =>
					Number(cell.dataset.index)
				),
			},
			() =>
				this.setState({
					acrossClueNumbers: getAcrossNumbers(numberedCells),
					downClueNumbers: getDownNumbers(numberedCells),
				})
		);
	}

	handleInputChange(e) {
		const name = e.target.name;
		let cellBlockSettings = { ...this.state.cellBlockSettings };

		cellBlockSettings[name] = !this.state.cellBlockSettings[name];
		this.setState({
			cellBlockSettings: cellBlockSettings,
		});
	}

	render() {
		const cells = getCellCoordinates(15).map((coord, index) => {
			return (
				<Cell
					key={`cell-${index + 1}`}
					x={coord.x}
					y={coord.y}
					index={index}
					number={
						this.state.numberedCellIndexes.includes(index)
							? this.state.numberedCellIndexes.indexOf(index) + 1
							: ""
					}
					onRectClick={this.handleRectClick}
				/>
			);
		});
		return (
			<article className="puzzle">
				<section className="xword-clue-and-board-section">
					<Clue />
					<section className="xword-board-section">
						<div className="xword-board-container">
							<svg className="xword-board" viewBox="0 0 501 501">
								<g data-group="cells">{cells}</g>
								<g data-group="grid">
									<path
										d="M3.00,36.00 l495.00,0.00 M3.00,69.00 l495.00,0.00 M3.00,102.00 l495.00,0.00 M3.00,135.00 l495.00,0.00 M3.00,168.00 l495.00,0.00 M3.00,201.00 l495.00,0.00 M3.00,234.00 l495.00,0.00 M3.00,267.00 l495.00,0.00 M3.00,300.00 l495.00,0.00 M3.00,333.00 l495.00,0.00 M3.00,366.00 l495.00,0.00 M3.00,399.00 l495.00,0.00 M3.00,432.00 l495.00,0.00 M3.00,465.00 l495.00,0.00 M36.00,3.00 l0.00,495.00 M69.00,3.00 l0.00,495.00 M102.00,3.00 l0.00,495.00 M135.00,3.00 l0.00,495.00 M168.00,3.00 l0.00,495.00 M201.00,3.00 l0.00,495.00 M234.00,3.00 l0.00,495.00 M267.00,3.00 l0.00,495.00 M300.00,3.00 l0.00,495.00 M333.00,3.00 l0.00,495.00 M366.00,3.00 l0.00,495.00 M399.00,3.00 l0.00,495.00 M432.00,3.00 l0.00,495.00 M465.00,3.00 l0.00,495.00"
										stroke="dimgray"
										vectorEffect="non-scaling-stroke"></path>
									<rect
										x="1.5"
										y="1.5"
										width="498"
										height="498"
										stroke="black"
										strokeWidth="3"
										fill="none"></rect>
								</g>
							</svg>
						</div>
					</section>
					<section className="xword-cell-block-section">
						<div className="cell-block-section-content">
							<ToggleSwitch
								toggleSwitchId="cell-block-input"
								name="toggle"
								text="Toggle Black Square:"
								isChecked={this.state.cellBlockSettings.toggle}
								handleToggleSwitchChange={this.handleInputChange}
							/>
							<ToggleSwitch
								toggleSwitchId="symmetry-input"
								name="symmetry"
								text="Symmetry:"
								isChecked={this.state.cellBlockSettings.symmetry}
								handleToggleSwitchChange={this.handleInputChange}
							/>
							<div className="cell-block-count-container">
								<p className="cell-block-count-p">
									Cell Block Count:{" "}
									<span className="cell-block-count">
										{this.state.cellBlockCount}
									</span>
								</p>
							</div>
						</div>
					</section>
				</section>
				<section className="clue-lists-section">
					<ClueList direction="ACROSS">
						{this.state.acrossClueNumbers.map((number) => (
							<ClueListItem
								key={`${number.toString()}-across`}
								clueLabel={number}
							/>
						))}
					</ClueList>
					<ClueList direction="DOWN">
						{this.state.downClueNumbers.map((number) => (
							<ClueListItem
								key={`${number.toString()}-down`}
								clueLabel={number}
							/>
						))}
					</ClueList>
				</section>
			</article>
		);
	}
}

export default App; */

import "../App.css";
import React, { useState } from "react";
import { Board } from "./Board.js";
import { CellBlockSettings } from "./CellBlockSettings.js";

export default function App() {
	let numberedCells = [];
	const cellsArray = Array.from(Array(225).keys()).map((key, index) => {
		if (index < 15 || index % 15 === 0) {
			numberedCells = numberedCells.concat(key);
		}
		return {
			id: `cell-${index}`,
			index: index,
			tabIndex: 0,
			// number: index,
			number:
				index < 15 || index % 15 === 0 ? numberedCells.indexOf(key) + 1 : null,
			letter: "A",
			isSelected: false,
			isBlackSquare: false,
		};
	});

	const [cells, setCells] = useState(cellsArray);
	const [cellBlockSettings, setCellBlockSettings] = useState({
		cellBlockInput: false,
		symmetryInput: true,
	});

	const setSelectedCell = (e) => {
		if (cellBlockSettings.cellBlockInput === true) return;

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
		if (cellBlockSettings.cellBlockInput === false) return;

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
		if (cellBlockSettings.symmetryInput === false) return;
		if (cellBlockSettings.cellBlockInput === false) return;

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

	const handleClick = (e) => {
		setSelectedCell(e);
		setCellBlock(e);
		setSymmetricalCellBlock(e);
	};

	const removeSelectedCell = (cellBlockInput) => {
		if (cellBlockInput === false) return;
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
		removeSelectedCell(settings.cellBlockInput);
		setCellBlockSettings(settings);
	};

	const handleChange = (e) => {
		handleToggleChange(e);
	};

	return (
		<div className="App">
			<CellBlockSettings
				cellBlockInput={cellBlockSettings.cellBlockInput}
				symmetryInput={cellBlockSettings.symmetryInput}
				onChange={handleChange}
			/>
			<Board cells={cells.slice()} onClick={(e) => handleClick(e)} />
		</div>
	);
}
