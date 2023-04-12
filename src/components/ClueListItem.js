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
					onFocus={props.onClueTextareaFocus}
					// onBlur={props.onClueTextareaBlur}
				></textarea>

				{`${props.name}-textarea` === props.isEditing ? (
					<button
						className="clue-done-button accessible"
						onClick={props.onClueDoneButtonClick}>
						Done
					</button>
				) : (
					<button
						className="edit-clue-button accessible"
						name={`${props.name}-edit-button`}
						onClick={props.onClueEditButtonClick}>
						Edit
					</button>
				)}
			</span>
		</li>
	);
};

ClueListItem.defaultProps = { clueText: "Clue text" };
