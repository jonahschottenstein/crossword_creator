import { GridOption } from "./GridOption";

export const GridOptions = (props) => {
	return (
		<div className="grid-options">
			{props.gridOptions.map((gridOption, index) => {
				return (
					<GridOption
						key={index}
						index={index}
						gridOptionCells={gridOption}
						onGridOptionClick={props.onGridOptionClick}
					/>
				);
			})}
		</div>
	);
};
