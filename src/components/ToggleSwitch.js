export const ToggleSwitch = (props) => {
	return (
		<div className="toggle-switch-wrapper">
			<label htmlFor={props.toggleSwitchId} className="toggle-switch-label">
				<div className="toggle-switch">
					<input
						type="checkbox"
						id={props.toggleSwitchId}
						className="toggle-switch-input invisible"
						name={props.name}
						checked={props.isChecked}
						onChange={props.onChange}
					/>
					<span className={props.iconClassName}>{props.iconText}</span>
				</div>
			</label>
		</div>
	);
};
