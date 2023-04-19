import { GridOptionCell } from "./GridOptionCell";

export const GridOptionBoard = (props) => {
	const gridOptionCells = props.gridOptionCells.map((cell, index) => {
		return (
			<GridOptionCell
				key={index}
				id={`grid-option-cell-${index}`}
				className={
					cell.isBlackSquare
						? "grid-option-cell cell-block"
						: "grid-option-cell"
				}
				index={index}
				number={cell.number}
				letter={cell.letter}
				isBlackSquare={cell.isBlackSquare}
			/>
		);
	});

	return <div className="grid-option-board">{gridOptionCells}</div>;
};
