import { CellBlockSettings } from "./CellBlockSettings";
import { Board } from "./Board";
export const BoardAndSettings = (props) => {
	return (
		<div className="board-and-settings">
			<CellBlockSettings
				cellBlockIsChecked={props.cellBlockIsChecked}
				symmetryIsChecked={props.symmetryIsChecked}
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
