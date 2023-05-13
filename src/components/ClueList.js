import { getClueProps } from "../utilities/clueListItems.js";
import { getNextDirection } from "../utilities/helpers.js";
import { ClueListItem } from "./ClueListItem.js";

const getClueText = (cells, clueLabel, listDirection) => {
	const clueText = cells.find(
		(cell) => cell.number === clueLabel && cell[listDirection]
	).clueText[listDirection];

	return clueText ?? "";
};
// TODO: memoize clueText, getClueLiClassName
export const ClueList = (props) => {
	const clueProps = getClueProps(props.direction, props.cells);
	const oppositeClueProps = getClueProps(
		getNextDirection(props.direction),
		props.cells
	);

	return (
		<div className="clue-list-wrapper">
			<h3 className="clue-list-title">{props.listDirection}</h3>
			<ol
				id={`${props.listDirection}-clue-list`}
				className="clue-list"
				onClick={props.onClick}>
				{props.clueNumbers.map((number) => {
					return (
						<ClueListItem
							key={`${number}-${props.listDirection}`}
							name={`${number}-${props.listDirection}`}
							clueLabel={number}
							clueText={getClueText(props.cells, number, props.listDirection)}
							setCells={props.setCells}
							direction={props.listDirection}
							className={
								//? Is it better to put this in a function outside of the component?
								clueProps.clueNumber === number &&
								clueProps.clueDirection === props.listDirection
									? "clue-list-item highlighted"
									: oppositeClueProps.clueNumber === number &&
									  oppositeClueProps.clueDirection === props.listDirection
									? "clue-list-item opposite-highlighted"
									: "clue-list-item"
							}
							activeTextarea={props.activeTextarea}
							setActiveTextarea={props.setActiveTextarea}
						/>
					);
				})}
			</ol>
		</div>
	);
};
