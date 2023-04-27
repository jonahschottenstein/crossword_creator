import { ClueList } from "./ClueList.js";

const getClueNumbers = (cells, direction) => {
	return cells
		.filter((cell) => !cell.isBlackSquare && cell[direction])
		.map((cell) => cell.number);
};

export const ClueListsContainer = (props) => {
	return (
		<div className="clue-lists-container">
			<ClueList
				direction="across"
				cells={props.cells}
				clueNumbers={getClueNumbers(props.cells, "across")}
				clueProps={props.clueProps}
				oppositeClueProps={props.oppositeClueProps}
				onClick={props.onClick}
				onClueLiTextareaChange={props.onClueLiTextareaChange}
				onClueEditButtonClick={props.onClueEditButtonClick}
				onClueDoneButtonClick={props.onClueDoneButtonClick}
				onClueTextareaFocus={props.onClueTextareaFocus}
				onClueTextareaBlur={props.onClueTextareaBlur}
				activeTextarea={props.activeTextarea}></ClueList>

			<ClueList
				direction="down"
				cells={props.cells}
				clueNumbers={getClueNumbers(props.cells, "down")}
				clueProps={props.clueProps}
				oppositeClueProps={props.oppositeClueProps}
				onClick={props.onClick}
				onClueLiTextareaChange={props.onClueLiTextareaChange}
				onClueEditButtonClick={props.onClueEditButtonClick}
				onClueDoneButtonClick={props.onClueDoneButtonClick}
				onClueTextareaFocus={props.onClueTextareaFocus}
				onClueTextareaBlur={props.onClueTextareaBlur}
				activeTextarea={props.activeTextarea}></ClueList>
		</div>
	);
};
