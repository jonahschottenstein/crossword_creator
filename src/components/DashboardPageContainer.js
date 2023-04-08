import { DashboardPage } from "./DashboardPage";

export const DashboardPageContainer = (props) => {
	return (
		<div className="dashboard-page-container">
			<DashboardPage
				direction={props.direction}
				cells={props.cells}
				visibleDashPage={props.visibleDashPage}
				pageTitle={props.visibleDashPage}
				acrossClueNumbers={props.acrossClueNumbers}
				downClueNumbers={props.downClueNumbers}
				clueProps={props.clueProps}
				oppositeClueProps={props.oppositeClueProps}
				onClick={props.onClick}
				wordMatches={props.wordMatches}
				onMatchClick={props.onMatchClick}
				matchFilterInput={props.matchFilterInput}
				onMatchFilterChange={props.onMatchFilterChange}
				onClueLiTextareaChange={props.onClueLiTextareaChange}
				onClueEditButtonClick={props.onClueEditButtonClick}
				onClueTextareaBlur={props.onClueTextareaBlur}
			/>
		</div>
	);
};
