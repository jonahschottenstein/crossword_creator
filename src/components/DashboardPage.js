import { ClueListsContainer } from "./ClueListsContainer";
import { DashboardStatsTable } from "./DashboardStatsTable";
import { Cell } from "./Cell";
import { getStats } from "../utilities/stats";
import { getWordObj } from "../utilities/words";

export const DashboardPage = (props) => {
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
					cells={props.cells}
					acrossClueNumbers={props.acrossClueNumbers}
					downClueNumbers={props.downClueNumbers}
					clueProps={props.clueProps}
					oppositeClueProps={props.oppositeClueProps}
					onClick={props.onClick}
					onClueLiTextareaChange={props.onClueLiTextareaChange}
					onClueEditButtonClick={props.onClueEditButtonClick}
					onClueTextareaBlur={props.onClueTextareaBlur}
				/>
			</div>
		);
	} else {
		return (
			<div className="dashboard-page fill-page">
				<DisplayWord direction={props.direction} cells={props.cells} />
				<MatchFilter
					matchFilterInput={props.matchFilterInput}
					onMatchFilterChange={props.onMatchFilterChange}
				/>
				<MatchTable
					wordMatches={props.wordMatches}
					onMatchClick={props.onMatchClick}
				/>
			</div>
		);
	}
};

const DisplayWord = ({ direction, cells }) => {
	return (
		<div className="display-word-container">
			{getWordObj(direction, cells).selectedWordObj?.word.map((cell, index) => {
				return (
					<Cell
						key={index}
						id={`display-cell-${index}`}
						className={"cell display-cell"}
						index={index}
						tabIndex={cell.tabIndex}
						number={cell.number}
						letter={cell.letter}
						isSelected={cell.isSelected}
						isBlackSquare={cell.isBlackSquare}
					/>
				);
			})}
		</div>
	);
};

const MatchFilter = ({ matchFilterInput, onMatchFilterChange }) => {
	return (
		<div className="match-filter-container">
			<input
				className="match-filter"
				value={matchFilterInput}
				onChange={onMatchFilterChange}></input>
		</div>
	);
};

const MatchTable = ({ wordMatches, onMatchClick }) => {
	return (
		<div className="match-table-container">
			<table className="match-table">
				<thead>
					<tr>
						<th>Word</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					{wordMatches?.current?.map((wordMatch) => (
						<MatchRow
							key={wordMatch.word}
							wordMatch={wordMatch}
							onMatchClick={onMatchClick}
						/>
					))}
				</tbody>
				{wordMatches?.hasMatchesLeft ? (
					<MatchTableFoot onMatchClick={onMatchClick} />
				) : null}
			</table>
		</div>
	);
};

const MatchRow = ({ wordMatch, onMatchClick }) => {
	return (
		<tr onClick={onMatchClick}>
			<td className="word-match-td">{wordMatch.word}</td>
			<td className="word-score-td">{wordMatch.score}</td>
		</tr>
	);
};

const MatchTableFoot = ({ onMatchClick }) => {
	return (
		<tfoot className="match-table-foot">
			<tr>
				<td>
					<button className="show-more-button" onClick={onMatchClick}>
						Show more
					</button>
				</td>
			</tr>
		</tfoot>
	);
};

/* 
	const noSelectedWordMessage = "Select an entry greater than three characters to view matches";
	return (
		<div className="dashboard-page fill-page">
			{}
		
		</div>
	)
	if (!selectedWordObj) {
		return 
	}
*/

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
