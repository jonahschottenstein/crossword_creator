import { ToggleSwitch } from "./ToggleSwitch.js";

export const CellBlockSettings = (props) => {
	return (
		<div className="cell-block-settings">
			<ToggleSwitch
				toggleSwitchId="cell-block-input"
				text="Cell Block"
				name="cellBlockIsChecked"
				isChecked={props.cellBlockIsChecked}
				onChange={props.onChange}
			/>
			<ToggleSwitch
				toggleSwitchId="symmetry-input"
				text="Symmetry"
				name="symmetryIsChecked"
				isChecked={props.symmetryIsChecked}
				onChange={props.onChange}
			/>
			<ToggleSwitch
				toggleSwitchId="shaded-cell-input"
				text="Gray"
				name="shadedCellIsChecked"
				isChecked={props.shadedCellIsChecked}
				onChange={props.onChange}
			/>
			<ToggleSwitch
				toggleSwitchId="circle-input"
				text="Circle"
				name="circleIsChecked"
				isChecked={props.circleIsChecked}
				onChange={props.onChange}
			/>
		</div>
	);
};
