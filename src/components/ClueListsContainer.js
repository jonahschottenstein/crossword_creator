import { ClueList } from "./ClueList.js";

export const ClueListsContainer = (props) => {
	return (
		<div className="clue-lists-container">
			<ClueList
				direction="across"
				cells={props.cells}
				clueNumbers={props.acrossClueNumbers}
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
				clueNumbers={props.downClueNumbers}
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
