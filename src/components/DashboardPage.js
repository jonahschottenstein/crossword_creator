import { ClueListsContainer } from "./ClueListsContainer";
import { DashboardStatsTable } from "./DashboardStatsTable";
import { getStats } from "../utilities/stats";
import { getWordObj } from "../utilities/words";
import { DisplayWord } from "./DisplayWord";
import { MatchFilter } from "./MatchFilter";
import { MatchTable } from "./MatchTable";
import { useEffect } from "react";
import { autoExpand } from "../utilities/handleClueLi";
// import { handleClueEditButtonClick } from "../utilities/handleClueLi";

/* export const DashboardPage = (props) => {
	const {
		gridSize,
		totalWordCount,
		blackSquareCount,
		avgWordLength,
		scrabbleScore,
		pangram,
	} = getStats(props.direction, props.cells);

	if (props.visibleDashPage === "stats") {
		return (
			<div className="dashboard-page stats-page">
				<DashboardStatsTable
					gridSize={gridSize}
					totalWordCount={totalWordCount}
					blackSquareCount={blackSquareCount}
					avgWordLength={avgWordLength}
					scrabbleScore={scrabbleScore}
					pangram={pangram}
				/>
			</div>
		);
	} else if (props.visibleDashPage === "clues") {
		return (
			<div className="dashboard-page clues-page">
				<ClueListsContainer
					direction={props.direction}
					cells={props.cells}
					onClick={props.onClick}
					onClueLiTextareaChange={props.onClueLiTextareaChange}
					onClueEditButtonClick={props.onClueEditButtonClick}
					onClueDoneButtonClick={props.onClueDoneButtonClick}
					onKeyDown={props.onKeyDown}
					onClueTextareaFocus={props.onClueTextareaFocus}
					onClueTextareaBlur={props.onClueTextareaBlur}
					activeTextarea={props.activeTextarea}
				/>
			</div>
		);
	} else {
		const selectedWord = getWordObj(props.direction, props.cells)
			.selectedWordObj?.word;
		const MIN_WORD_LENGTH = 3;

		return (
			<div className="dashboard-page fill-page">
				<button id="clear-fill-button" onClick={props.onClearFillButtonClick}>
					Clear Fill
				</button>
				<button
					id="autofill-grid-button"
					onClick={props.onAutofillGridButtonClick}>
					Autofill Grid
				</button>

				{!selectedWord || selectedWord.length < MIN_WORD_LENGTH ? (
					<p>{"Select an entry greater than two characters to view matches"}</p>
				) : (
					<>
						<DisplayWord direction={props.direction} cells={props.cells} />
						<MatchFilter
							matchFilterInput={props.matchFilterInput}
							onMatchFilterChange={props.onMatchFilterChange}
						/>
						<MatchTable
							wordMatches={props.wordMatches}
							onMatchClick={props.onMatchClick}
						/>
					</>
				)}
			</div>
		);
	}
}; */

export const Button = (props) => {
	return (
		<button
			id={props.id ?? null}
			className={props.className ?? null}
			name={props.name ?? null}
			onClick={props.onClick}>
			{props.children}
		</button>
	);
};

export const FillContent = (props) => {
	const selectedWord = getWordObj(props.direction, props.cells).selectedWordObj
		?.word;
	const MIN_WORD_LENGTH = 3;

	return (
		<>
			<Button id="clear-fill-button" onClick={props.onClearFillButtonClick}>
				Clear Fill
			</Button>
			<Button
				id="autofill-grid-button"
				onClick={props.onAutofillGridButtonClick}>
				Autofill Grid
			</Button>

			{!selectedWord || selectedWord.length < MIN_WORD_LENGTH ? (
				<p>{"Select an entry greater than two characters to view matches"}</p>
			) : (
				<>
					<DisplayWord direction={props.direction} cells={props.cells} />
					<MatchFilter
						matchFilterInput={props.matchFilterInput}
						onMatchFilterChange={props.onMatchFilterChange}
					/>
					<MatchTable
						wordMatches={props.wordMatches}
						onMatchClick={props.onMatchClick}
					/>
				</>
			)}
		</>
	);
};

/* export const DashboardPage = (props) => {
	const {
		gridSize,
		totalWordCount,
		blackSquareCount,
		avgWordLength,
		scrabbleScore,
		pangram,
	} = getStats(props.direction, props.cells);
	const selectedWord = getWordObj(props.direction, props.cells).selectedWordObj
		?.word;
	const MIN_WORD_LENGTH = 3;

	return (
		<div className={`dashboard-page ${props.visibleDashPage}-page`}>
			{props.visibleDashPage === "stats" ? (
				<DashboardStatsTable
					gridSize={gridSize}
					totalWordCount={totalWordCount}
					blackSquareCount={blackSquareCount}
					avgWordLength={avgWordLength}
					scrabbleScore={scrabbleScore}
					pangram={pangram}
				/>
			) : props.visibleDashPage === "clues" ? (
				<ClueListsContainer
					direction={props.direction}
					cells={props.cells}
					setCells={props.setCells}
					onClick={props.onClick}
					// onClueLiTextareaChange={props.onClueLiTextareaChange}
					// onClueEditButtonClick={props.onClueEditButtonClick}
					// onClueEditButtonClick={handleClueEditButtonClick}
					// onClueDoneButtonClick={props.onClueDoneButtonClick}
					// onKeyDown={props.onKeyDown}
					// onClueTextareaFocus={props.onClueTextareaFocus}
					// onClueTextareaBlur={props.onClueTextareaBlur}
					// activeTextarea={props.activeTextarea}
					// setActiveTextarea={props.setActiveTextarea}
				/>
			) : (
				<>
					<Button id="clear-fill-button" onClick={props.onClearFillButtonClick}>
						Clear Fill
					</Button>
					<Button
						id="autofill-grid-button"
						onClick={props.onAutofillGridButtonClick}>
						Autofill Grid
					</Button>

					{!selectedWord || selectedWord.length < MIN_WORD_LENGTH ? (
						<p>
							{"Select an entry greater than two characters to view matches"}
						</p>
					) : (
						<>
							<DisplayWord direction={props.direction} cells={props.cells} />
							<MatchFilter
								matchFilterInput={props.matchFilterInput}
								onMatchFilterChange={props.onMatchFilterChange}
							/>
							<MatchTable
								wordMatches={props.wordMatches}
								onMatchClick={props.onMatchClick}
							/>
						</>
					)}
				</>
			)}
		</div>
	);
}; */

export const DashboardPage = ({ visibleDashPage, children }) => {
	return (
		<div className={`dashboard-page ${visibleDashPage}-page`}>{children}</div>
	);
};

/* 
	conditions:
		- selected word:
			- does not exist
			- length < 3
			- is empty
			- is filled
			- is partially filled (matchable)
		- list:
			- visible matches:
				- exist
				- don't exist
			- more matches:
				- exist
				- don't exist

 */
