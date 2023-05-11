import { memo } from "react";
import { GridOptionBoard } from "./GridOptionBoard";

export const GridOption = memo(function GridOption({
	index,
	onGridOptionClick,
	gridOptionCells,
}) {
	return (
		<button
			className="grid-option"
			name={"grid-option-" + index}
			onClick={onGridOptionClick}>
			<GridOptionBoard gridOptionCells={gridOptionCells} />
		</button>
	);
});
