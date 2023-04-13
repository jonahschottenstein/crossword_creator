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
							name={`${number}-${props.direction}`}
							clueLabel={number}
							cells={props.cells}
							direction={props.direction}
							className={
								props.clueProps.clueNumber === number &&
								props.clueProps.clueDirection === props.direction
									? "clue-list-item highlighted"
									: props.oppositeClueProps.clueNumber === number &&
									  props.oppositeClueProps.clueDirection === props.direction
									? "clue-list-item opposite-highlighted"
									: "clue-list-item"
							}
							onClick={props.onClick}
							onClueLiTextareaChange={props.onClueLiTextareaChange}
							onClueEditButtonClick={props.onClueEditButtonClick}
							onClueDoneButtonClick={props.onClueDoneButtonClick}
							onClueTextareaFocus={props.onClueTextareaFocus}
							onClueTextareaBlur={props.onClueTextareaBlur}
							activeTextarea={props.activeTextarea}
						/>
					);
				})}
			</ol>
		</div>
	);
};
