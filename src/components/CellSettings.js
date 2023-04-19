import { NewPuzzle } from "./NewPuzzle.js";
import { ToggleSwitch } from "./ToggleSwitch.js";

export const CellSettings = (props) => {
	return (
		<div className="cell-settings">
			<NewPuzzle
				gridOptions={props.gridOptions}
				onGridOptionClick={props.onGridOptionClick}
				newPuzzleIsChecked={props.newPuzzleIsChecked}
				onChange={props.onChange}
				onNewPuzzleBlur={props.onNewPuzzleBlur}
			/>
			<div className="cell-settings-toggles">
				<ToggleSwitch
					toggleSwitchId="symmetry-input"
					text="Symmetry"
					iconText="balance"
					iconClassName="material-icons"
					name="symmetryIsChecked"
					isChecked={props.symmetryIsChecked}
					onChange={props.onChange}
				/>
				<ToggleSwitch
					toggleSwitchId="cell-block-input"
					text="Cell Block"
					iconText="square"
					iconClassName="material-icons"
					name="cellBlockIsChecked"
					isChecked={props.cellBlockIsChecked}
					onChange={props.onChange}
				/>
				<ToggleSwitch
					toggleSwitchId="shaded-cell-input"
					text="Gray"
					iconText="square"
					iconClassName="material-icons shaded-color"
					name="shadedCellIsChecked"
					isChecked={props.shadedCellIsChecked}
					onChange={props.onChange}
				/>
				<ToggleSwitch
					toggleSwitchId="circle-input"
					text="Circle"
					iconText="circle"
					iconClassName="material-icons-outlined"
					name="circleIsChecked"
					isChecked={props.circleIsChecked}
					onChange={props.onChange}
				/>
			</div>
		</div>
	);
};