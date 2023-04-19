import { ToggleSwitch } from "./ToggleSwitch";
import { GridOptionsContainer } from "./GridOptionsContainer";

export const NewPuzzle = (props) => {
	const backgroundClassName = props.newPuzzleIsChecked
		? "grid-options-background"
		: "grid-options-background display-none";
	return (
		<div className="new-puzzle">
			<ToggleSwitch
				toggleSwitchId="new-puzzle-input"
				text="New Puzzle"
				iconText="grid_on"
				iconClassName="material-icons"
				name="newPuzzleIsChecked"
				isChecked={props.newPuzzleIsChecked}
				onChange={props.onChange}
			/>
			<div className={backgroundClassName} onClick={props.onNewPuzzleBlur}>
				<GridOptionsContainer
					gridOptions={props.gridOptions}
					newPuzzleIsChecked={props.newPuzzleIsChecked}
					onGridOptionClick={props.onGridOptionClick}
					onNewPuzzleBlur={props.onNewPuzzleBlur}
				/>
			</div>
		</div>
	);
};
