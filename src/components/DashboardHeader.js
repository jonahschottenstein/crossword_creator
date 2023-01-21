import { DashboardHeaderButton } from "./DashboardHeaderButton";

export const DashboardHeader = (props) => {
	return (
		<div className="dashboard-header">
			<DashboardHeaderButton
				buttonLabel={"Stats"}
				visibleDashPage={props.visibleDashPage}
				onChange={props.onChange}
			/>
			<DashboardHeaderButton
				buttonLabel={"Clues"}
				visibleDashPage={props.visibleDashPage}
				onChange={props.onChange}
			/>
			<DashboardHeaderButton
				buttonLabel={"Fill"}
				visibleDashPage={props.visibleDashPage}
				onChange={props.onChange}
			/>
		</div>
	);
};
