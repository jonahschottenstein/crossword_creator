import { DashboardPage } from "./DashboardPage";

export const DashboardPageContainer = (props) => {
	return (
		<div className="dashboard-page-container">
			<DashboardPage
				direction={props.direction}
				cells={props.cells}
				visibleDashPage={props.visibleDashPage}
				pageTitle={props.visibleDashPage}
				onClick={props.onClick}
				wordMatches={props.wordMatches}
				onMatchClick={props.onMatchClick}
				matchFilterInput={props.matchFilterInput}
				onMatchFilterChange={props.onMatchFilterChange}
				onClueLiTextareaChange={props.onClueLiTextareaChange}
				onClueEditButtonClick={props.onClueEditButtonClick}
				onClueDoneButtonClick={props.onClueDoneButtonClick}
				onClueTextareaFocus={props.onClueTextareaFocus}
				onClueTextareaBlur={props.onClueTextareaBlur}
				activeTextarea={props.activeTextarea}
				onAutofillGridButtonClick={props.onAutofillGridButtonClick}
				onClearFillButtonClick={props.onClearFillButtonClick}
			/>
		</div>
	);
};
