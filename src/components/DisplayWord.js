import { getWordObj } from "../utilities/words";
import Cell from "./Cell";

export const DisplayWord = ({ direction, cells }) => {
	return (
		<div className="display-word-container">
			{getWordObj(direction, cells).selectedWordObj?.word.map((cell, index) => {
				return (
					<Cell
						key={index}
						id={`display-cell-${index}`}
						className={"cell display-cell"}
						index={index}
						tabIndex={cell.tabIndex}
						number={cell.number}
						letter={cell.letter}
						isSelected={cell.isSelected}
						isBlackSquare={cell.isBlackSquare}
					/>
				);
			})}
		</div>
	);
};
