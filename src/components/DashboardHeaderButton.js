import { autoExpand } from "../utilities/handleClueLi";

export const DashboardHeaderButton = (props) => {
	return (
		<label className={props.labelClassName} htmlFor={props.buttonLabel}>
			<input
				type={"radio"}
				id={props.buttonLabel}
				className={"dashboard-header-button"}
				name={"dashboard-header-button"}
				value={props.buttonLabel}
				checked={props.visibleDashPage === props.buttonLabel}
				// onChange={props.onChange}
				onChange={(e) => {
					props.onChange(e);
					setTimeout(() => {
						const textareas = document.querySelectorAll(".clue-textarea");
						textareas.forEach((textarea) => {
							autoExpand(textarea);
						});
					}, 50);
				}}
			/>
			{props.buttonLabel}
		</label>
	);
};
