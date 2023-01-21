export const DashboardHeaderButton = (props) => {
	return (
		<label
			className={"dashboard-header-button-label"}
			htmlFor={props.buttonLabel}>
			<input
				type={"radio"}
				id={props.buttonLabel}
				className={"dashboard-header-button"}
				name={"dashboard-header-button"}
				value={props.buttonLabel}
				checked={props.visibleDashPage === props.buttonLabel}
				onChange={props.onChange}
			/>
			{props.buttonLabel}
		</label>
	);
};
