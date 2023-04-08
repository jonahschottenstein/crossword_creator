export const ClueListItem = (props) => {
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
					onBlur={props.onClueTextareaBlur}></textarea>
				<button
					className="edit-clue-button accessible"
					// className={editButtonClassName}
					onClick={props.onClueEditButtonClick}>
					Edit
				</button>
			</span>
		</li>
	);
};

ClueListItem.defaultProps = { clueText: "Clue text" };
