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
				direction={props.direction}
				listDirection="across"
				cells={props.cells}
				clueNumbers={getClueNumbers(props.cells, "across")}
				onClick={props.onClick}
				onClueLiTextareaChange={props.onClueLiTextareaChange}
				onClueEditButtonClick={props.onClueEditButtonClick}
				onClueDoneButtonClick={props.onClueDoneButtonClick}
				onClueTextareaFocus={props.onClueTextareaFocus}
				onClueTextareaBlur={props.onClueTextareaBlur}
				activeTextarea={props.activeTextarea}></ClueList>

			<ClueList
				direction={props.direction}
				listDirection="down"
				cells={props.cells}
				clueNumbers={getClueNumbers(props.cells, "down")}
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
