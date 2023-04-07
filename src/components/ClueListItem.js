export const ClueListItem = (props) => {
	const clueText = props.clueListItemDataObj.clueText;
	const editButtonClassName = props.clueListItemDataObj.editButtonClassName;
	return (
		<li className={props.className} name={props.name} onClick={props.onClick}>
			<span className="clue-label">{props.clueLabel}</span>
			{/* <span className="clue-text">{props.clueText}</span> */}
			<span className="clue-textarea-wrapper">
				<textarea
					className="clue-textarea"
					name={`${props.name}-textarea`}
					value={clueText}
					onChange={props.onClueLiTextareaChange}
					onBlur={props.onClueTextareaBlur}></textarea>
				<button
					// className="edit-clue-button accessible"
					className={editButtonClassName}
					onClick={props.onClueEditButtonClick}>
					Edit
				</button>
			</span>
		</li>
	);
};

ClueListItem.defaultProps = { clueText: "Clue text" };
