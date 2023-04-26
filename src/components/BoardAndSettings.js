import { CellSettings } from "./CellSettings";
import { Board } from "./Board";
export const BoardAndSettings = (props) => {
	return (
		<div className="board-and-settings">
			<CellSettings
				cellSettings={props.cellSettings}
				onChange={props.onChange}
				onClearFillButtonClick={props.onClearFillButtonClick}
				gridOptions={props.gridOptions}
				onGridOptionClick={props.onGridOptionClick}
				onNewPuzzleBlur={props.onNewPuzzleBlur}
				isOpen={props.isOpen}
				popupClassName={props.popupClassName}
				popupName={props.popupName}
				openButtonClassName={props.openButtonClassName}
				openButtonText={props.openButtonText}
				popupHeading={props.popupHeading}
				onOpenClick={props.onOpenClick}
				onCloseClick={props.onCloseClick}
				submissionInfo={props.submissionInfo}
				jsPDF={props.jsPDF}
				cells={props.cells}
				onInfoChange={props.onInfoChange}
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
