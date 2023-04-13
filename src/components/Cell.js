export const Cell = (props) => {
	return (
		<div
			id={props.id}
			className={props.className}
			data-index={props.index}
			tabIndex={props.tabIndex}
			onClick={props.onClick}
			onKeyDown={props.onKeyDown}>
			{/circled/.test(props.className) ? (
				<>
					<div className="circle"></div>
					<div className="number">{props.number}</div>
					<div className="letter">{props.letter}</div>
				</>
			) : (
				<>
					<div className="number">{props.number}</div>
					<div className="letter">{props.letter}</div>
				</>
			)}
		</div>
	);
};

export default Cell;
