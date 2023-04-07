import { DashboardHeader } from "./DashboardHeader";
import { DashboardPageContainer } from "./DashboardPageContainer";

export const Dashboard = (props) => {
	return (
		<div className="dashboard">
			<DashboardHeader
				visibleDashPage={props.visibleDashPage}
				onChange={props.onChange}
			/>
			<DashboardPageContainer
				direction={props.direction}
				cells={props.cells}
				visibleDashPage={props.visibleDashPage}
				acrossClueNumbers={props.acrossClueNumbers}
				downClueNumbers={props.downClueNumbers}
				clueProps={props.clueProps}
				oppositeClueProps={props.oppositeClueProps}
				onClick={props.onClick}
				wordMatches={props.wordMatches}
				onMatchClick={props.onMatchClick}
				matchFilterInput={props.matchFilterInput}
				onMatchFilterChange={props.onMatchFilterChange}
				clueListItemsData={props.clueListItemsData}
				onClueLiTextareaChange={props.onClueLiTextareaChange}
				onClueEditButtonClick={props.onClueEditButtonClick}
				onClueTextareaBlur={props.onClueTextareaBlur}
			/>
		</div>
	);
};
