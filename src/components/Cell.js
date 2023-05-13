import { memo } from "react";

export const Cell = memo(function Cell(props) {
	return (
		<div
			id={props.id}
			className={props.className}
			data-index={props.index}
			tabIndex={props.tabIndex}
			onClick={props.onClick}>
			<>
				{/circled/.test(props.className) ? (
					<div className="circle"></div>
				) : null}
				<div className="number">{props.number}</div>
				<div className="letter">{props.letter}</div>
			</>
		</div>
	);
});

export default Cell;
