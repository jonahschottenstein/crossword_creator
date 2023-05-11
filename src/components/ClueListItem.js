/* export const ClueListItem = (props) => {
	const cells = props.cells;
	const clueLabel = props.clueLabel;
	const direction = props.direction;
	const clueText = cells.find(
		(cell) => cell.number === clueLabel && cell[direction]
	).clueText[direction];

	return (
		<li className={props.className} name={props.name} onClick={props.onClick}>
			<span className="clue-label">{props.clueLabel}</span>
			<span className="clue-textarea-wrapper">
				<textarea
					className="clue-textarea"
					name={`${props.name}-textarea`}
					value={clueText}
					onChange={props.onClueLiTextareaChange}
					onFocus={props.onClueTextareaFocus}
					// onBlur={props.onClueTextareaBlur}
					onKeyDown={props.onKeyDown}
					maxLength="240"></textarea>

				{`${props.name}-textarea` === props.activeTextarea ? (
					<button
						className="material-icons clue-done-button accessible"
						onClick={props.onClueDoneButtonClick}>
						done
					</button>
				) : (
					<button
						className="material-icons edit-clue-button accessible"
						name={`${props.name}-edit-button`}
						onClick={props.onClueEditButtonClick}>
						edit
					</button>
				)}
			</span>
		</li>
	);
}; */

import { memo } from "react";
import {
	handleClueDoneButtonClick,
	handleClueEditButtonClick,
	handleClueTextarea,
	handleClueTextareaFocus,
	handleEnterKeyDown,
} from "../utilities/handleClueLi";

/* export const ClueListItem = (props) => {
	const cells = props.cells;
	const clueLabel = props.clueLabel;
	const direction = props.direction;
	const clueText = cells.find(
		(cell) => cell.number === clueLabel && cell[direction]
	).clueText[direction];
	console.log(props.clueText);

	return (
		<li className={props.className} name={props.name} onClick={props.onClick}>
			<span className="clue-label">{props.clueLabel}</span>
			<span className="clue-textarea-wrapper">
				<textarea
					className="clue-textarea"
					name={`${props.name}-textarea`}
					value={clueText}
					onChange={(e) => handleClueTextarea(e, props.setCells)}
					onFocus={(e) => handleClueTextareaFocus(e, props.setActiveTextarea)}
					onKeyDown={(e) => handleEnterKeyDown(e, props.setActiveTextarea)}
					maxLength="240"></textarea>

				{`${props.name}-textarea` === props.activeTextarea ? (
					<button
						className="material-icons clue-done-button accessible"
						onClick={(e) =>
							handleClueDoneButtonClick(e, props.setActiveTextarea)
						}>
						done
					</button>
				) : (
					<button
						className="material-icons edit-clue-button accessible"
						name={`${props.name}-edit-button`}
						onClick={handleClueEditButtonClick}>
						edit
					</button>
				)}
			</span>
		</li>
	);
}; */
export const ClueListItem = memo(function ClueListItem(props) {
	return (
		<li className={props.className} name={props.name}>
			<span className="clue-label">{props.clueLabel}</span>
			<span className="clue-textarea-wrapper">
				<textarea
					className="clue-textarea"
					name={`${props.name}-textarea`}
					value={props.clueText}
					onChange={(e) => handleClueTextarea(e, props.setCells)}
					onFocus={(e) => handleClueTextareaFocus(e, props.setActiveTextarea)}
					onKeyDown={(e) => handleEnterKeyDown(e, props.setActiveTextarea)}
					maxLength="240"></textarea>

				{`${props.name}-textarea` === props.activeTextarea ? (
					<button
						className="material-icons clue-done-button accessible"
						onClick={(e) =>
							handleClueDoneButtonClick(e, props.setActiveTextarea)
						}>
						done
					</button>
				) : (
					<button
						className="material-icons edit-clue-button accessible"
						name={`${props.name}-edit-button`}
						onClick={handleClueEditButtonClick}>
						edit
					</button>
				)}
			</span>
		</li>
	);
});

/* export const ClueListItem = memo(function ClueListItem({
	name,
	clueLabel,
	setCells,
	direction,
	className,
	onClick,
	activeTextarea,
	setActiveTextarea,
}) {
	const cellElements = [...document.querySelectorAll(".cell")];
	console.log(cellElements);
	const clueText = cellElements.find((cellElement) => {
		const cellNumber = Number(cellElement.querySelector(".cell > .number").textContent)
		return cellNumber === clueLabel
	})
}); */
