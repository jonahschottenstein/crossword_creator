export const GridOptionCell = (props) => {
	return (
		<div id={props.id} className={props.className} data-index={props.index}>
			<div className="grid-option-number">{props.number}</div>
			<div className="grid-option-letter">{props.letter}</div>
		</div>
	);
};
