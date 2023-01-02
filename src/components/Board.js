import { Cell } from "./Cell.js";

export const Board = (props) => {
	const cells = props.cells.map((cell, index) => {
		return (
			<Cell
				key={index}
				className={cell.isSelected ? "cell selected" : "cell"}
				index={index}
				tabIndex={cell.tabIndex}
				number={cell.number}
				letter={cell.letter}
				isSelected={cell.isSelected}
				isBlackSquare={cell.isBlackSquare}
			/>
		);
	});

	return <div className="board">{cells}</div>;
};
