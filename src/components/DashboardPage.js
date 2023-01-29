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
					acrossClueNumbers={props.acrossClueNumbers}
					downClueNumbers={props.downClueNumbers}
					clueProps={props.clueProps}
					oppositeClueProps={props.oppositeClueProps}
					onClick={props.onClick}
				/>
			</div>
		);
	} else {
		return (
			<div className="dashboard-page fill-page">
				<div className="display-word-container">
					{getWordObj(props.direction, props.cells).selectedWordObj?.word.map(
						(cell, index) => {
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
						}
					)}
				</div>
				<div className="match-table-container">
					<table className="match-table">
						<thead>
							<tr>
								<th>Word</th>
								<th>Score</th>
							</tr>
						</thead>
						<tbody>
							{props.wordMatches?.map((obj) => (
								<tr key={obj.word} onClick={props.onMatchClick}>
									<td className="word-match-td">{obj.word}</td>
									<td className="word-score-td">{obj.score}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
};
