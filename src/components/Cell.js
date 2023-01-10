export const Cell = (props) => {
	return (
		<div
			id={`cell-${props.index}`}
			className={props.className}
			data-index={props.index}
			tabIndex={props.tabIndex}
			onClick={props.onClick}
			onKeyDown={props.onKeyDown}>
			<div className="number">{props.number}</div>
			<div className="letter">{props.letter}</div>
		</div>
	);
};

export default Cell;
