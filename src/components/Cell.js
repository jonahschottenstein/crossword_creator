const Cell = (props) => {
	return (
		<g>
			<rect
				x={32}
				y={32}
				tabIndex={0}
				width="32"
				height="32"
				fill="white"
				stroke="black"
				strokeWidth="1"></rect>
		</g>
	);
};

export default Cell;
