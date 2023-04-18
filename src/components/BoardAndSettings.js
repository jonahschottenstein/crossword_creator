import { CellSettings } from "./CellSettings";
import { Board } from "./Board";
export const BoardAndSettings = (props) => {
	return (
		<div className="board-and-settings">
			<CellSettings
				cellBlockIsChecked={props.cellBlockIsChecked}
				symmetryIsChecked={props.symmetryIsChecked}
				shadedCellIsChecked={props.shadedCellIsChecked}
				circleIsChecked={props.circleIsChecked}
				onChange={props.onChange}
			/>
			<Board
				direction={props.direction}
				cells={props.cells}
				onClick={props.onClick}
				onKeyDown={props.onKeyDown}
			/>
		</div>
	);
};
