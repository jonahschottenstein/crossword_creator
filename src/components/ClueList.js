import { ClueListItem } from "./ClueListItem.js";

export const ClueList = (props) => {
	return (
		<div className="clue-list-wrapper">
			<h3 className="clue-list-title">{props.direction}</h3>
			<ol id={`${props.direction}-clue-list`} className="clue-list">
				{props.clueNumbers.map((number) => {
					return (
						<ClueListItem
							key={`${number}-${props.direction}`}
							clueLabel={number}
							className={
								props.clueProps.clueNumber === number &&
								props.clueProps.clueDirection === props.direction
									? "clue-list-item highlighted"
									: props.oppositeClueProps.clueNumber === number &&
									  props.oppositeClueProps.clueDirection === props.direction
									? "clue-list-item opposite-highlighted"
									: "clue-list-item"
							}
						/>
					);
				})}
			</ol>
		</div>
	);
};
