export const ToggleSwitch = (props) => {
	return (
		// <div className="toggle-switch-wrapper">
		// 	<span className="toggle-switch-text">{props.text}</span>
		// 	<div className="toggle-switch">
		// 		<label htmlFor={props.toggleSwitchId} className="toggle-switch-label">
		// 			<input
		// 				type="checkbox"
		// 				id={props.toggleSwitchId}
		// 				className="toggle-switch-input"
		// 				checked={props.isChecked}
		// 				onChange={props.handleToggleSwitchChange}
		// 			/>
		// 			<span className="slider round"></span>
		// 		</label>
		// 	</div>
		// </div>

		<div className="toggle-switch-wrapper">
			<label htmlFor={props.toggleSwitchId} className="toggle-switch-label">
				<span className="toggle-switch-text">{props.text}</span>
				<div className="toggle-switch">
					<input
						type="checkbox"
						id={props.toggleSwitchId}
						className="toggle-switch-input"
						checked={props.isChecked}
						onChange={props.handleToggleSwitchChange}
					/>
					<span className="slider round"></span>
				</div>
			</label>
		</div>
	);
};
