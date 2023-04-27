import { getClueProps } from "../utilities/clueListItems.js";
import { getNextDirection } from "../utilities/helpers.js";
import { ClueListItem } from "./ClueListItem.js";

export const ClueList = (props) => {
	const clueProps = getClueProps(props.direction, props.cells);
	const oppositeClueProps = getClueProps(
		getNextDirection(props.direction),
		props.cells
	);

	return (
		<div className="clue-list-wrapper">
			<h3 className="clue-list-title">{props.listDirection}</h3>
			<ol id={`${props.listDirection}-clue-list`} className="clue-list">
				{props.clueNumbers.map((number) => {
					return (
						<ClueListItem
							key={`${number}-${props.listDirection}`}
							name={`${number}-${props.listDirection}`}
							clueLabel={number}
							cells={props.cells}
							direction={props.listDirection}
							className={
								clueProps.clueNumber === number &&
								clueProps.clueDirection === props.listDirection
									? "clue-list-item highlighted"
									: oppositeClueProps.clueNumber === number &&
									  oppositeClueProps.clueDirection === props.listDirection
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
