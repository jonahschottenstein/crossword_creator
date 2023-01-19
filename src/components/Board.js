import { Cell } from "./Cell.js";
import { getWordObj } from "../utilities/words.js";
import { isInSelectedWord } from "../utilities/helpers.js";

export const Board = (props) => {
	const { selectedWordObj } = getWordObj(props.direction, props.cells);
	const selectedWord = selectedWordObj?.word;
	const cells = props.cells.map((cell, index) => {
		return (
			<Cell
				key={index}
				className={
					cell.isSelected
						? "cell selected highlighted"
						: isInSelectedWord(selectedWord, cell)
						? "cell highlighted"
						: cell.isBlackSquare
						? "cell cell-block"
						: "cell"
				}
				index={index}
				tabIndex={cell.tabIndex}
				number={cell.number}
				letter={cell.letter}
				isSelected={cell.isSelected}
				isBlackSquare={cell.isBlackSquare}
				onClick={props.onClick}
				onKeyDown={props.onKeyDown}
			/>
		);
	});

	return <div className="board">{cells}</div>;
};
