import { ToggleSwitch } from "./ToggleSwitch.js";

export const CellBlockSettings = (props) => {
	return (
		<div className="cell-block-settings">
			<ToggleSwitch
				toggleSwitchId="cell-block-input"
				text="Cell Block"
				name="cellBlockInput"
				isChecked={props.cellBlockInput}
				onChange={props.onChange}
			/>
			<ToggleSwitch
				toggleSwitchId="symmetry-input"
				text="Symmetry"
				name="symmetryInput"
				isChecked={props.symmetryInput}
				onChange={props.onChange}
			/>
		</div>
	);
};
