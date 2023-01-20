import { ClueList } from "./ClueList.js";

export const ClueListsContainer = (props) => {
	return (
		<div className="clue-lists-container">
			<ClueList
				direction="across"
				clueNumbers={props.acrossClueNumbers}
				clueProps={props.clueProps}
				oppositeClueProps={props.oppositeClueProps}></ClueList>

			<ClueList
				direction="down"
				clueNumbers={props.downClueNumbers}
				clueProps={props.clueProps}
				oppositeClueProps={props.oppositeClueProps}></ClueList>
		</div>
	);
};
