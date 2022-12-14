export const Checkbox = (props) => {
	return (
		<div className="checkbox-wrapper">
			<label className="checkbox-label" htmlFor={props.checkboxId}>
				<input
					type="checkbox"
					id={props.checkboxId}
					checked={props.isChecked}
					onChange={props.handleChange}
				/>
				<span className="checkbox-span">{props.label}</span>
			</label>
		</div>
	);
};
