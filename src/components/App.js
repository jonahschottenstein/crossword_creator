import "../App.css";
import React, { useEffect, useState } from "react";
import { setDirectionOnClick } from "../utilities/direction.js";
import { setSelectedCell } from "../utilities/setSelectedCell.js";
import { setCellBlock } from "../utilities/setCellBlock.js";
import { setSymmetricalCellBlock } from "../utilities/setSymmetricalCellBlock.js";
import { setCellNumbers } from "../utilities/setCellNumbers.js";
import { setClues } from "../utilities/setClues.js";
import { handleLetterKey } from "../utilities/letters.js";
import { removeCellSelection } from "../utilities/removeCellSelection.js";
import { createCellObjects } from "../utilities/createCellObjects.js";
import { handleArrowKeys } from "../utilities/arrows";
import { handleTabKey } from "../utilities/tab.js";
import { handleBackspaceKey } from "../utilities/backspace.js";
import { BoardAndSettings } from "./BoardAndSettings";
import {
	getClueProps,
	scrollToLi,
	selectCellElementOnLiClick,
} from "../utilities/clueListItems";
import { getNextDirection } from "../utilities/helpers";
import { Dashboard } from "./Dashboard";
import {
	fetchWordList,
	getWordMatches,
	isMatchable,
	areMatchesLeft,
	getFirst100Matches,
	getNext100Matches,
	getMatchesFromTable,
	fillWord,
	getTopMatches,
	getFilteredMatches,
} from "../utilities/fill";
import { getWordObj } from "../utilities/words";
import {
	handleClueLiTextareaChange,
	handleClueEditButtonClick,
	handleClueTextareaBlur,
	handleClueDoneButtonClick,
	handleClueTextareaFocus,
} from "../utilities/handleClueLi";
import {
	handleClearFill,
	handleFillGrid,
	handleAddBlackSquares,
} from "../utilities/gridHandlers";
import { setClueText } from "../utilities/setClueText";
import { setShadedCell } from "../utilities/setShadedCell";
import { setCircledCell } from "../utilities/setCircledCell";

export default function App() {
	const [direction, setDirection] = useState("across");
	const [cells, setCells] = useState(createCellObjects());
	const [cellBlockSettings, setCellBlockSettings] = useState({
		cellBlockIsChecked: false,
		symmetryIsChecked: true,
		shadedCellIsChecked: false,
		circleIsChecked: false,
	});
	const [visibleDashPage, setVisibleDashPage] = useState("stats");
	const [wordMatches, setWordMatches] = useState({
		current: null,
		hasMatchesLeft: false,
	});
	const [matchFilterInput, setMatchFilterInput] = useState("");
	const [isAutofilling, setIsAutofilling] = useState(false);
	const [isEditing, setIsEditing] = useState(null);

	useEffect(() => {
		// if (visibleDashPage !== "fill") return;
		if (isAutofilling) return;

		const startFetching = async () => {
			setWordMatches({
				current: null,
				hasMatchesLeft: false,
			});

			const { selectedWordObj } = getWordObj(direction, cells);
			const wordLength = selectedWordObj?.word.length;

			if (!selectedWordObj || wordLength < 3) return;
			if (!ignore) {
				const wordList = await fetchWordList(selectedWordObj?.word);
				const newWordMatches = await getWordMatches(
					selectedWordObj?.word,
					wordList
				);
				const matchable = isMatchable(selectedWordObj.word);
				const currentWordList = matchable ? newWordMatches : wordList;
				const totalMatchCount = currentWordList.length;
				// console.log({ totalMatchCount });
				const filteredMatches = getFilteredMatches(
					matchFilterInput,
					currentWordList
				);
				// console.log(filteredMatches);

				// const firstMatches = getFirst100Matches(currentWordList);
				// const hasMatchesLeft = areMatchesLeft(
				// 	currentWordList,
				// 	firstMatches.length
				// );
				const firstMatches = getFirst100Matches(filteredMatches);
				const hasMatchesLeft = areMatchesLeft(
					filteredMatches,
					firstMatches.length
				);
				const topMatches = await getTopMatches(
					currentWordList,
					direction,
					cells
				);
				console.log(topMatches);
				setWordMatches({
					current: firstMatches,
					hasMatchesLeft: hasMatchesLeft,
				});
			}
		};

		let ignore = false;
		startFetching();
		return () => {
			ignore = true;
		};
	}, [direction, cells, matchFilterInput]);

	/* const handleClick = (e) => {
		if (cellBlockSettings.cellBlockIsChecked) {
			setCellBlock(e, setCells);
			cellBlockSettings.symmetryIsChecked &&
				setSymmetricalCellBlock(e, cells, setCells);
			setCellNumbers(setCells);
			setClues(setCells);
			setClueText(e, setCells);
		} else {
			setDirectionOnClick(e, cells, setDirection);
			setSelectedCell(e, setCells);
		}
	}; */
	/* 	const handleClick = (e) => {
		if (cellBlockSettings.cellBlockIsChecked) {
			setCellBlock(e, setCells);
			cellBlockSettings.symmetryIsChecked &&
				setSymmetricalCellBlock(e, cells, setCells);
			setCellNumbers(setCells);
			setClues(setCells);
			setClueText(e, setCells);
		} else if (cellBlockSettings.shadedCellIsChecked) {
			setShadedCell(e, setCells);
		} else if (cellBlockSettings.circleIsChecked) {
			setCircledCell(e, setCells);
		} else {
			setDirectionOnClick(e, cells, setDirection);
			setSelectedCell(e, setCells);
		}
	}; */
	const handleClick = (e) => {
		const {
			cellBlockIsChecked,
			symmetryIsChecked,
			shadedCellIsChecked,
			circleIsChecked,
		} = cellBlockSettings;
		if (cellBlockIsChecked) {
			setCellBlock(e, setCells);
			symmetryIsChecked && setSymmetricalCellBlock(e, cells, setCells);
			setCellNumbers(setCells);
			setClues(setCells);
			setClueText(e, setCells);

			return;
		}

		if (!shadedCellIsChecked && !circleIsChecked) {
			setDirectionOnClick(e, cells, setDirection);
			setSelectedCell(e, setCells);

			return;
		}

		if (shadedCellIsChecked) {
			setShadedCell(e, setCells);
		}
		if (circleIsChecked) {
			setCircledCell(e, setCells);
		}
	};

	const handleLiClick = (e) => {
		if (cellBlockSettings.cellBlockIsChecked) return;

		selectCellElementOnLiClick(e, direction, setDirection, cells);
	};

	/* 	const showMoreWordMatches = async () => {
		const { selectedWordObj } = getWordObj(direction, cells);
		const wordList = await fetchWordList(selectedWordObj?.word);
		const newWordMatches = await getWordMatches(
			selectedWordObj?.word,
			wordList
		);
		const tableLength = getMatchesFromTable().length;
		const next100Matches = getNext100Matches(newWordMatches, tableLength);
		const currentMatches = [...wordMatches.current, ...next100Matches];
		const hasMatchesLeft = areMatchesLeft(
			newWordMatches,
			currentMatches.length
		);

		setWordMatches({
			current: currentMatches,
			hasMatchesLeft: hasMatchesLeft,
		});
	}; */
	const showMoreWordMatches = async () => {
		const { selectedWordObj } = getWordObj(direction, cells);
		const wordList = await fetchWordList(selectedWordObj?.word);
		const newWordMatches = await getWordMatches(
			selectedWordObj?.word,
			wordList
		);
		const filteredMatches = getFilteredMatches(
			matchFilterInput,
			newWordMatches
		);
		// console.log(filteredMatches);
		const tableLength = getMatchesFromTable().length;
		const next100Matches = getNext100Matches(filteredMatches, tableLength);
		const currentMatches = [...wordMatches.current, ...next100Matches];
		const hasMatchesLeft = areMatchesLeft(
			filteredMatches,
			currentMatches.length
		);

		setWordMatches({
			current: currentMatches,
			hasMatchesLeft: hasMatchesLeft,
		});
	};

	const handleMatchClick = (e) => {
		fillWord(e, direction, cells, setCells);

		if (e.target.matches(".show-more-button")) {
			// Does this need "await"?
			showMoreWordMatches();
		}
	};

	const handleKeyDown = (e) => {
		handleArrowKeys(e, direction, setDirection, cells);
		handleTabKey(e, direction, setDirection, cells);
		handleLetterKey(e, direction, setDirection, cells, setCells);
		handleBackspaceKey(e, direction, setDirection, cells, setCells);
	};

	/* const handleToggleChange = (e) => {
		removeCellSelection(setCells);

		const name = e.target.name;
		let settings = { ...cellBlockSettings };
		settings[name] = !cellBlockSettings[name];
		setCellBlockSettings(settings);
	}; */
	const handleToggleChange = (e) => {
		removeCellSelection(setCells);

		const CELL_BLOCK_NAME = "cellBlockIsChecked";
		const SHADED_NAME = "shadedCellIsChecked";
		const name = e.target.name;
		let settings = { ...cellBlockSettings };
		if (name === CELL_BLOCK_NAME) {
			settings[SHADED_NAME] = false;
		} else if (name === SHADED_NAME) {
			settings[CELL_BLOCK_NAME] = false;
		}
		settings[name] = !cellBlockSettings[name];
		setCellBlockSettings(settings);
	};

	const handleChange = (e) => {
		handleToggleChange(e);
	};

	const handleDashChange = (e) => {
		setVisibleDashPage(e.target.value);
	};

	const handleMatchFilterChange = (e) => {
		setMatchFilterInput(e.target.value);
	};

	const handleClueText = (e) => {
		setClueText(e, setCells);
	};

	scrollToLi(direction, cells);
	scrollToLi(getNextDirection(direction), cells);

	return (
		<div className="App">
			<button
				id="clear-white-squares"
				onClick={() => handleClearFill(setCells)}>
				Clear Fill
			</button>
			<button
				id="add-black-squares"
				onClick={() => handleAddBlackSquares(setCells)}>
				ABS
			</button>
			<button
				id="fill-grid"
				onClick={() => handleFillGrid(cells, setCells, setIsAutofilling)}>
				Fill Grid
			</button>
			<BoardAndSettings
				direction={direction}
				cells={cells.slice()}
				onClick={(e) => handleClick(e)}
				onKeyDown={handleKeyDown}
				cellBlockIsChecked={cellBlockSettings.cellBlockIsChecked}
				symmetryIsChecked={cellBlockSettings.symmetryIsChecked}
				shadedCellIsChecked={cellBlockSettings.shadedCellIsChecked}
				circleIsChecked={cellBlockSettings.circleIsChecked}
				onChange={handleChange}
			/>
			<Dashboard
				direction={direction}
				cells={cells.slice()}
				visibleDashPage={visibleDashPage}
				onChange={handleDashChange}
				acrossClueNumbers={cells
					.filter(
						(cell) => cell.isBlackSquare === false && cell.across === true
					)
					.map((cell) => cell.number)}
				downClueNumbers={cells
					.filter((cell) => cell.isBlackSquare === false && cell.down === true)
					.map((cell) => cell.number)}
				clueProps={getClueProps(direction, cells)}
				oppositeClueProps={getClueProps(getNextDirection(direction), cells)}
				onClick={(e) => handleLiClick(e)}
				wordMatches={wordMatches}
				onMatchClick={(e) => handleMatchClick(e)}
				onMatchFilterChange={handleMatchFilterChange}
				matchFilterInput={matchFilterInput}
				onClueLiTextareaChange={(e) => {
					handleClueLiTextareaChange(e);
					handleClueText(e);
				}}
				onClueEditButtonClick={(e) => {
					handleClueEditButtonClick(e, setIsEditing);
				}}
				onClueDoneButtonClick={(e) => {
					handleClueDoneButtonClick(e, setIsEditing);
				}}
				onClueTextareaFocus={(e) => handleClueTextareaFocus(e, setIsEditing)}
				onClueTextareaBlur={(e) => {
					handleClueTextareaBlur(e, setIsEditing);
				}}
				isEditing={isEditing}
			/>
		</div>
	);
}
