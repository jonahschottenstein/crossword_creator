import { ClueListsContainer } from "./ClueListsContainer";
import { DashboardStatsTable } from "./DashboardStatsTable";
import { getStats } from "../utilities/stats";

export const DashboardPage = (props) => {
	const {
		gridSize,
		totalWordCount,
		blackSquareCount,
		avgWordLength,
		scrabbleScore,
		pangram,
	} = getStats(props.direction, props.cells);

	if (props.visibleDashPage === "Stats") {
		return (
			<div className="dashboard-page">
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
	} else if (props.visibleDashPage === "Clues") {
		return (
			<div className="dashboard-page">
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
		return <div className="dashboard-page">{props.pageTitle}</div>;
	}
};
