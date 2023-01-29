import { DashboardHeaderButton } from "./DashboardHeaderButton";

export const DashboardHeader = (props) => {
	return (
		<div className="dashboard-header">
			<DashboardHeaderButton
				buttonLabel={"stats"}
				labelClassName={"dashboard-header-button-label stats-button-label"}
				visibleDashPage={props.visibleDashPage}
				onChange={props.onChange}
			/>
			<DashboardHeaderButton
				buttonLabel={"clues"}
				labelClassName={"dashboard-header-button-label clues-button-label"}
				visibleDashPage={props.visibleDashPage}
				onChange={props.onChange}
			/>
			<DashboardHeaderButton
				buttonLabel={"fill"}
				labelClassName={"dashboard-header-button-label fill-button-label"}
				visibleDashPage={props.visibleDashPage}
				onChange={props.onChange}
			/>
		</div>
	);
};
