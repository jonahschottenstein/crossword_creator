import { ClueList } from "./ClueList.js";

export const ClueListsContainer = (props) => {
	return (
		<div className="clue-lists-container">
			<ClueList
				direction="across"
				clueNumbers={props.acrossClueNumbers}></ClueList>
			<ClueList direction="down" clueNumbers={props.downClueNumbers}></ClueList>
		</div>
	);
};
