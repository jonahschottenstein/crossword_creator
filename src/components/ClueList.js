const ClueList = (props) => {
	return (
		<div className="clue-list-wrapper">
			<h3 className="clue-list-title">{props.direction}</h3>
			<ol className="clue-list"></ol>
		</div>
	);
};

export default ClueList;
