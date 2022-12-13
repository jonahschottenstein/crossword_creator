const Cell = (props) => {
	return (
		<g className="xword-cell">
			<rect
				x={props.x}
				y={props.y}
				tabIndex={0}
				width="33"
				height="33"
				fill="white"></rect>
		</g>
	);
};

export default Cell;
