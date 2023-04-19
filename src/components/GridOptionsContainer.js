import { GridOption } from "./GridOption";

export const GridOptionsContainer = (props) => {
	const containerClassName = props.newPuzzleIsChecked
		? "grid-options-container"
		: "grid-options-container display-none";
	return (
		<div className={containerClassName}>
			<header className="grid-options-header">
				<h2>Grid Templates</h2>
				<button
					className="material-icons exit-button"
					onClick={props.onNewPuzzleBlur}>
					close
				</button>
			</header>
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
		</div>
	);
};
