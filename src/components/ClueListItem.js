export const ClueListItem = (props) => {
	return (
		<li className={props.className} onClick={props.onClick}>
			<span className="clue-label">{props.clueLabel}</span>
			<span className="clue-text">{props.clueText}</span>
		</li>
	);
};

ClueListItem.defaultProps = { clueText: "Clue text" };
