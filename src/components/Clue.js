export const Clue = (props) => {
	return (
		<div className="xword-clue">
			<div className="xword-clue-number">{props.clueNumber}</div>
			<div className="xword-clue-text">{props.clueText}</div>
		</div>
	);
};

Clue.defaultProps = {
	clueNumber: "1A",
	clueText: "Clue Text",
};
