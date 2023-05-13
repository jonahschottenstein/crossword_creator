import { Cell } from "./Cell.js";
import { getWordObj } from "../utilities/words.js";
import { isInSelectedWord } from "../utilities/helpers.js";
import { memo } from "react";
import { handleArrowKeys } from "../utilities/arrows";
import { handleBackspaceKey } from "../utilities/backspace";
import { handleLetterKey } from "../utilities/letters";
import { handleTabKey } from "../utilities/tab";

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

export const Board = memo(function Board(props) {
	const handleKeyDown = (e) => {
		if (!document.activeElement.matches(".cell")) return;

		const direction = props.direction;
		const setDirection = props.setDirection;
		const cells = props.cells;
		const setCells = props.setCells;

		handleArrowKeys(e, direction, setDirection, cells);
		handleTabKey(e, direction, setDirection, cells);
		handleLetterKey(e, direction, setDirection, cells, setCells);
		handleBackspaceKey(e, direction, setDirection, cells, setCells);
	};

	const { selectedWordObj } = getWordObj(props.direction, props.cells);
	const selectedWord = selectedWordObj?.word;
	const cells = props.cells.map((cell, index) => {
		return (
			<Cell
				key={index}
				id={`cell-${index}`}
				className={getCellClassName(cell, selectedWord)}
				index={index}
				tabIndex={cell.tabIndex}
				number={cell.number}
				letter={cell.letter}
				onClick={props.onClick}
			/>
		);
	});

	return (
		<div className="board" onKeyDown={handleKeyDown}>
			{cells}
		</div>
	);
});
