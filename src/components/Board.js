import { Cell } from "./Cell.js";
import { getWordObj } from "../utilities/words.js";
import { isInSelectedWord } from "../utilities/helpers.js";

const getCellClassName = (cell, selectedWord) => {
	let className = "cell";
	if (cell.isBlackSquare) return className.concat(" ", "cell-block");
	if (cell.isSelected) {
		className = className.concat(" ", "selected");
	}
	if (isInSelectedWord(selectedWord, cell)) {
		className = className.concat(" ", "highlighted");
	}
	if (cell.isShaded) {
		className = className.concat(" ", "shaded");
	}
	if (cell.isCircled) {
		className = className.concat(" ", "circled");
	}

	return className;
};

export const Board = (props) => {
	const { selectedWordObj } = getWordObj(props.direction, props.cells);
	const selectedWord = selectedWordObj?.word;
	const cells = props.cells.map((cell, index) => {
		return (
			<Cell
				key={index}
				id={`cell-${index}`}
				// className={
				// 	cell.isSelected
				// 		? "cell selected highlighted"
				// 		: isInSelectedWord(selectedWord, cell)
				// 		? "cell highlighted"
				// 		: cell.isBlackSquare
				// 		? "cell cell-block"
				// 		: "cell"
				// }
				className={getCellClassName(cell, selectedWord)}
				index={index}
				tabIndex={cell.tabIndex}
				number={cell.number}
				letter={cell.letter}
				isSelected={cell.isSelected}
				isShaded={cell.isShaded}
				isCircled={cell.isCircled}
				isBlackSquare={cell.isBlackSquare}
				onClick={props.onClick}
				onKeyDown={props.onKeyDown}
			/>
		);
	});

	return <div className="board">{cells}</div>;
};
