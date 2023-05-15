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

export const Board = memo(function Board({
	direction,
	setDirection,
	cells,
	setCells,
	onClick,
}) {
	const handleKeyDown = (e) => {
		if (e.metaKey) return;
		if (!document.activeElement.matches(".cell")) return;

		handleArrowKeys(e, direction, setDirection, cells);
		handleTabKey(e, direction, setDirection, cells);
		handleLetterKey(e, direction, setDirection, cells, setCells);
		handleBackspaceKey(e, direction, setDirection, cells, setCells);
	};

	const { selectedWordObj } = getWordObj(direction, cells);
	const selectedWord = selectedWordObj?.word;
	const cellComponents = cells.map((cell, index) => {
		return (
			<Cell
				key={index}
				id={`cell-${index}`}
				className={getCellClassName(cell, selectedWord)}
				index={index}
				tabIndex={cell.tabIndex}
				number={cell.number}
				letter={cell.letter}
				onClick={onClick}
			/>
		);
	});

	return (
		<div className="board" onKeyDown={handleKeyDown}>
			{cellComponents}
		</div>
	);
});
