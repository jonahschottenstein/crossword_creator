import { Cell } from "./Cell.js";
import {
	getWords,
	getSelectedWordObject,
	isInSelectedWord,
} from "../utilities/words.js";

export const Board = (props) => {
	const wordsObject = getWords(props.direction, props.cells);
	console.log(wordsObject);
	const selectedWord = getSelectedWordObject(wordsObject).word;

	const cells = props.cells.map((cell, index) => {
		return (
			<Cell
				key={index}
				/* className={
					cell.isSelected
						? "cell selected"
						: cell.isBlackSquare
						? "cell cell-block"
						: "cell"
				} */
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
