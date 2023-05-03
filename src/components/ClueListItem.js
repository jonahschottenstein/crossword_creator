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
};
