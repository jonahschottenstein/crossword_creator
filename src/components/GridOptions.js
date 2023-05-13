import { useCallback } from "react";
import { gridOptions } from "../utilities/gridOptions";
import { GridOption } from "./GridOption";

export const GridOptions = ({ setIsOpen, setCells }) => {
	// TODO: Remove useCallback from handleGridOptionClick
	const handleGridOptionClick = useCallback((e) => {
		const buttonIndex = e.target.name.match(/\d+$/);
		setCells(() => gridOptions[buttonIndex]);
		setIsOpen((prevState) => ({ ...prevState, gridOptionsPopup: false }));
	}, []);

	return (
		<div className="grid-options">
			{gridOptions.map((gridOption, index) => {
				return (
					<GridOption
						key={index}
						index={index}
						gridOptionCells={gridOption}
						onGridOptionClick={handleGridOptionClick}
					/>
				);
			})}
		</div>
	);
};
