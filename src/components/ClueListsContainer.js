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
				onClueTextareaBlur={props.onClueTextareaBlur}></ClueList>

			<ClueList
				direction="down"
				cells={props.cells}
				clueNumbers={props.downClueNumbers}
				clueProps={props.clueProps}
				oppositeClueProps={props.oppositeClueProps}
				onClick={props.onClick}
				onClueLiTextareaChange={props.onClueLiTextareaChange}
				onClueEditButtonClick={props.onClueEditButtonClick}
				onClueTextareaBlur={props.onClueTextareaBlur}></ClueList>
		</div>
	);
};
