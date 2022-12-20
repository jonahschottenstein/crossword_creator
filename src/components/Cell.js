const Cell = (props) => {
	const RECT_OFFSET_X = 3;
	const RECT_OFFSET_Y = 3;

	const NUMBER_OFFSET_X = 5;
	const NUMBER_OFFSET_Y = 14.5;

	const LETTER_OFFSET_X = 19.5;
	const LETTER_OFFSET_Y = 33.25;

	return (
		<g className="xword-cell" data-index={props.index}>
			<rect
				className="cell-rect"
				x={props.x + RECT_OFFSET_X}
				y={props.y + RECT_OFFSET_Y}
				tabIndex={0}
				width="33"
				height="33"
				fill="white"
				data-index={props.index}
				onClick={props.onRectClick}></rect>
			<text
				className="cell-number"
				x={props.x + NUMBER_OFFSET_X}
				y={props.y + NUMBER_OFFSET_Y}
				textAnchor="start"
				fontSize="11">
				{props.number}
			</text>
			<text
				className="cell-letter"
				x={props.x + LETTER_OFFSET_X}
				y={props.y + LETTER_OFFSET_Y}
				textAnchor="middle"
				fontSize="22"></text>
		</g>
	);
};

export default Cell;
