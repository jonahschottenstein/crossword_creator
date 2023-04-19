import { GridOptionBoard } from "./GridOptionBoard";

export const GridOption = (props) => {
	return (
		<button
			className="grid-option"
			name={"grid-option-" + props.index}
			onClick={props.onGridOptionClick}>
			<GridOptionBoard gridOptionCells={props.gridOptionCells} />
		</button>
	);
};
