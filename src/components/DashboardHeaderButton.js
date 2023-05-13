import { autoExpand } from "../utilities/handleClueLi";

export const DashboardHeaderButton = ({
	buttonLabel,
	labelClassName,
	visibleDashPage,
	onChange,
}) => {
	const handleAutoexpandTextareas = (e) => {
		onChange(e);
		setTimeout(() => {
			const textareas = document.querySelectorAll(".clue-textarea");
			textareas.forEach((textarea) => {
				autoExpand(textarea);
			});
		}, 50);
	};
	return (
		<label className={labelClassName} htmlFor={buttonLabel}>
			<input
				type={"radio"}
				id={buttonLabel}
				className={"dashboard-header-button"}
				name={"dashboard-header-button"}
				value={buttonLabel}
				checked={visibleDashPage === buttonLabel}
				onChange={handleAutoexpandTextareas}
			/>
			{buttonLabel}
		</label>
	);
};
