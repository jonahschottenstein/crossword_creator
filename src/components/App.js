import "../App.css";
import React, { useCallback, useEffect, useState } from "react";
import { setDirectionOnClick } from "../utilities/direction.js";
import { setSelectedCell } from "../utilities/setSelectedCell.js";
import { setCellBlock } from "../utilities/setCellBlock.js";
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
	scrollToLi,
	selectCellElementOnLiClick,
} from "../utilities/clueListItems";
import { getNextDirection } from "../utilities/helpers";
import { Dashboard } from "./Dashboard";
import {
	getWordMatches,
	isMatchable,
	areMatchesLeft,
	getFirst100Matches,
	getNext100Matches,
	getMatchesFromTable,
	fillWord,
	// getTopMatches,
	getFilteredMatches,
} from "../utilities/gridFill";
import { getWordObj } from "../utilities/words";
import {
	handleClueLiTextareaChange,
	handleClueEditButtonClick,
	handleClueTextareaBlur,
	handleClueDoneButtonClick,
	handleClueTextareaFocus,
	handleEnterKeyDown,
	autoExpand,
} from "../utilities/handleClueLi";
import { handleClearFill, handleFillGrid } from "../utilities/gridHandlers";
import { setClueText } from "../utilities/setClueText";
import { setShadedCell } from "../utilities/setShadedCell";
import { setCircledCell } from "../utilities/setCircledCell";
import { setSymmetricalCellStyle } from "../utilities/setSymmetricalCellStyle";
import { gridOptions } from "../utilities/gridOptions";
import { DashboardPageContainer } from "./DashboardPageContainer";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardHeaderButton } from "./DashboardHeaderButton";
import { DashboardPage, FillContent } from "./DashboardPage";
import { CellSettings } from "./CellSettings";
import { Board } from "./Board";
import { fetchWordListMemoized } from "../utilities/autofillGrid";
import { DashboardStatsTable } from "./DashboardStatsTable";
import { getStats } from "../utilities/stats";
import { ClueListsContainer } from "./ClueListsContainer";

export default function App() {
	const [direction, setDirection] = useState("across");
	const [cells, setCells] = useState(createCellObjects());
	const [cellSettings, setCellSettings] = useState({
		cellBlockIsChecked: false,
		symmetryIsChecked: true,
		shadedCellIsChecked: false,
		circleIsChecked: false,
		newPuzzleIsChecked: false,
	});
	const [visibleDashPage, setVisibleDashPage] = useState("stats");
	const [wordMatches, setWordMatches] = useState({
		current: null,
		hasMatchesLeft: false,
	});
	const [matchFilterInput, setMatchFilterInput] = useState("");
	const [isAutofilling, setIsAutofilling] = useState(false);
	// const [activeTextarea, setActiveTextarea] = useState(null);
	// const [submissionInfo, setSubmissionInfo] = useState({
	// 	firstName: "",
	// 	lastName: "",
	// 	address: "",
	// 	city: "",
	// 	state: "",
	// 	zipCode: "",
	// 	email: "",
	// 	puzzleTitle: "",
	// });
	// const [isOpen, setIsOpen] = useState({
	// 	gridOptionsPopup: false,
	// 	submissionInfoPopup: false,
	// });

	// const { jsPDF } = window.jspdf;

	useEffect(() => {
		if (isAutofilling) return;

		const startFetching = async () => {
			setWordMatches({
				current: null,
				hasMatchesLeft: false,
			});

			const { selectedWordObj } = getWordObj(direction, cells);
			const wordLength = selectedWordObj?.word.length;
			const MIN_WORD_LENGTH = 3;

			if (!selectedWordObj || wordLength < MIN_WORD_LENGTH) return;
			if (!ignore) {
				// const wordList = await fetchWordList(selectedWordObj?.word);
				const getWordList = await fetchWordListMemoized();
				const wordList = await getWordList(selectedWordObj?.word);
				const newWordMatches = await getWordMatches(
					selectedWordObj?.word,
					wordList
				);
				const matchable = isMatchable(selectedWordObj.word);
				const currentWordList = matchable ? newWordMatches : wordList;
				// const totalMatchCount = currentWordList.length;
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
				// const topMatches = await getTopMatches(
				// 	currentWordList,
				// 	direction,
				// 	cells
				// );
				// getTopMatches causes error when clicking on word intersecting word with less than 3 letters
				// console.log(topMatches);
				setWordMatches({
					current: firstMatches,
					hasMatchesLeft: hasMatchesLeft,
				});
			}
		};

		let ignore = false;

		// const handleBlurOnClick = (e) => {
		// 	if (!activeTextarea) return;
		// 	const textarea = document.querySelector(
		// 		`.clue-textarea[name="${activeTextarea}"]`
		// 	);
		// 	const li = textarea.closest(".clue-list-item");
		// 	const liName = li.getAttribute("name");
		// 	const liSelector = `.clue-list-item[name="${liName}"]`;

		// 	if (e.target.matches(`${liSelector}, ${liSelector} *`)) return;

		// 	setActiveTextarea(null);
		// 	textarea.classList.remove("accessible");
		// };
		// const handleTextareasOnResize = () => {
		// 	const textareas = document.querySelectorAll(".clue-textarea");
		// 	textareas.forEach((textarea) => {
		// 		autoExpand(textarea);
		// 	});
		// };
		// document.addEventListener("click", handleBlurOnClick);
		// window.addEventListener("resize", handleTextareasOnResize);
		startFetching();
		return () => {
			ignore = true;
			// document.removeEventListener("click", handleBlurOnClick);
			// window.removeEventListener("resize", handleTextareasOnResize);
		};
	}, [direction, cells, matchFilterInput, isAutofilling]);

	/* const handleClick = (e) => {
		const {
			cellBlockIsChecked,
			symmetryIsChecked,
			shadedCellIsChecked,
			circleIsChecked,
		} = cellSettings;
		if (cellBlockIsChecked) {
			setCellBlock(e, setCells);
			symmetryIsChecked &&
				setSymmetricalCellStyle(e, cells, setCells, setCellBlock);
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
			symmetryIsChecked &&
				setSymmetricalCellStyle(e, cells, setCells, setShadedCell);
		}
		if (circleIsChecked) {
			setCircledCell(e, setCells);
			symmetryIsChecked &&
				setSymmetricalCellStyle(e, cells, setCells, setCircledCell);
		}
	}; */
	const handleClick = useCallback(
		(e) => {
			const {
				cellBlockIsChecked,
				symmetryIsChecked,
				shadedCellIsChecked,
				circleIsChecked,
			} = cellSettings;
			if (cellBlockIsChecked) {
				setCellBlock(e, setCells);
				symmetryIsChecked && setSymmetricalCellStyle(e, setCells, setCellBlock);
				setCellNumbers(setCells);
				setClues(setCells);
				setClueText(e, setCells);

				return;
			}

			if (!shadedCellIsChecked && !circleIsChecked) {
				setDirectionOnClick(e, setDirection);
				setSelectedCell(e, setCells);

				return;
			}

			if (shadedCellIsChecked) {
				setShadedCell(e, setCells);
				symmetryIsChecked &&
					setSymmetricalCellStyle(e, setCells, setShadedCell);
			}
			if (circleIsChecked) {
				setCircledCell(e, setCells);
				symmetryIsChecked &&
					setSymmetricalCellStyle(e, setCells, setCircledCell);
			}
		},
		[cellSettings]
	);

	const handleLiClick = (e) => {
		if (!e.target.matches(".clue-list-item")) return;

		const { cellBlockIsChecked, shadedCellIsChecked, circleIsChecked } =
			cellSettings;
		if (cellBlockIsChecked || shadedCellIsChecked || circleIsChecked) return;

		selectCellElementOnLiClick(e, direction, setDirection, cells);
	};

	const showMoreWordMatches = async () => {
		const { selectedWordObj } = getWordObj(direction, cells);
		const getWordList = await fetchWordListMemoized();
		const wordList = await getWordList(selectedWordObj?.word);
		const newWordMatches = await getWordMatches(
			selectedWordObj?.word,
			wordList
		);
		const filteredMatches = getFilteredMatches(
			matchFilterInput,
			newWordMatches
		);
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

	/* const handleKeyDown = (e) => {
		handleArrowKeys(e, direction, setDirection, cells);
		handleTabKey(e, direction, setDirection, cells);
		handleLetterKey(e, direction, setDirection, cells, setCells);
		handleBackspaceKey(e, direction, setDirection, cells, setCells);
	}; */

	const handleToggleChange = (e) => {
		removeCellSelection(setCells);

		const CELL_BLOCK_NAME = "cellBlockIsChecked";
		const SHADED_NAME = "shadedCellIsChecked";
		const CIRCLED_NAME = "circleIsChecked";
		const name = e.target.name;
		let settings = { ...cellSettings };
		if (name === CELL_BLOCK_NAME) {
			settings[SHADED_NAME] = false;
			settings[CIRCLED_NAME] = false;
		} else if (name === SHADED_NAME || name === CIRCLED_NAME) {
			settings[CELL_BLOCK_NAME] = false;
		}
		settings[name] = !cellSettings[name];
		setCellSettings(settings);
	};

	const handleDashChange = (e) => {
		setVisibleDashPage(e.target.value);
	};

	const handleMatchFilterChange = (e) => {
		setMatchFilterInput(e.target.value);
	};

	/* const handleClueText = (e) => {
		setClueText(e, setCells);
	}; */

	/* const handleGridOptionClick = (e) => {
		const buttonIndex = e.target.name.match(/\d+$/);
		setCells(() => gridOptions[buttonIndex]);
		setIsOpen({
			...isOpen,
			gridOptionsPopup: false,
		});
	}; */

	/* const handleInfoChange = (e) => {
		setSubmissionInfo({
			...submissionInfo,
			[e.target.name]: e.target.value,
		});
	}; */

	/* const handleIsOpen = (e) => {
		setIsOpen({
			...isOpen,
			[e.target.name]: true,
		});
	}; */

	/* const handleIsClosed = (e) => {
		setIsOpen({
			...isOpen,
			[e.target.name]: false,
		});
	}; */

	scrollToLi(direction, cells);
	scrollToLi(getNextDirection(direction), cells);

	const {
		gridSize,
		totalWordCount,
		blackSquareCount,
		avgWordLength,
		scrabbleScore,
		pangram,
	} = getStats(direction, cells);

	return (
		<div className="App">
			<div className="app-content">
				<BoardAndSettings>
					<CellSettings
						cells={cells}
						cellSettings={cellSettings}
						onChange={handleToggleChange}
						setCells={setCells}
					/>
					<Board
						direction={direction}
						setDirection={setDirection}
						cells={cells}
						setCells={setCells}
						onClick={handleClick}
					/>
				</BoardAndSettings>
				<Dashboard>
					<DashboardHeader>
						{["stats", "clues", "fill"].map((buttonLabel) => {
							return (
								<DashboardHeaderButton
									key={buttonLabel}
									buttonLabel={buttonLabel}
									labelClassName={`dashboard-header-button-label ${buttonLabel}-button-label`}
									visibleDashPage={visibleDashPage}
									onChange={handleDashChange}
								/>
							);
						})}
					</DashboardHeader>
					<DashboardPageContainer>
						<DashboardPage visibleDashPage={visibleDashPage}>
							{visibleDashPage === "stats" ? (
								<DashboardStatsTable
									gridSize={gridSize}
									totalWordCount={totalWordCount}
									blackSquareCount={blackSquareCount}
									avgWordLength={avgWordLength}
									scrabbleScore={scrabbleScore}
									pangram={pangram}
								/>
							) : visibleDashPage === "clues" ? (
								<ClueListsContainer
									direction={direction}
									cells={cells}
									setCells={setCells}
									onClick={handleLiClick}
								/>
							) : (
								<FillContent
									direction={direction}
									cells={cells}
									matchFilterInput={matchFilterInput}
									wordMatches={wordMatches}
									onAutofillGridButtonClick={() =>
										handleFillGrid(cells, setCells, setIsAutofilling)
									}
									onClearFillButtonClick={() => handleClearFill(setCells)}
									onMatchFilterChange={handleMatchFilterChange}
									onMatchClick={(e) => handleMatchClick(e)}
								/>
							)}
						</DashboardPage>
					</DashboardPageContainer>
				</Dashboard>
			</div>
		</div>
	);
}
