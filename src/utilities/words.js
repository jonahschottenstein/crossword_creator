/* import {
	getCellIndex,
	cellsInSameColumn,
	cellInFirstRow,
	cellInFirstColumn,
	cellInLastRow,
	cellInLastColumn,
} from "./cellLocation.js";

import {
	previousAcrossCellBlocked,
	previousDownCellBlocked,
	nextAcrossCellBlocked,
	nextDownCellBlocked,
} from "./cellBlockLocation.js";

export const getAcrossFirstLetterCells = (numberedCells) => {
	const firstLetterCells = numberedCells.filter(
		(numberedCell) =>
			cellInFirstColumn(numberedCell) || previousAcrossCellBlocked(numberedCell)
	);
	return firstLetterCells;
};

export const getDownFirstLetterCells = (numberedCells) => {
	const firstLetterCells = numberedCells.filter(
		(numberedCell) =>
			cellInFirstRow(numberedCell) || previousDownCellBlocked(numberedCell)
	);
	return firstLetterCells;
};

export const getAcrossLastLetterCells = (firstLetterCells) => {
	const cellsArray = [...document.querySelectorAll(".xword-cell")];
	const lastLetterCells = firstLetterCells.map((firstLetterCell) => {
		return cellsArray.find((cell, index) => {
			return (
				index >= getCellIndex(firstLetterCell) &&
				(cellInLastColumn(cell) || nextAcrossCellBlocked(cell))
			);
		});
	});
	return lastLetterCells;
};

export const getDownLastLetterCells = (firstLetterCells) => {
	const cellsArray = [...document.querySelectorAll(".xword-cell")];
	const lastLetterCells = firstLetterCells.map((firstLetterCell) => {
		return cellsArray.find((cell, index, array) => {
			return (
				index >= getCellIndex(firstLetterCell) &&
				cellsInSameColumn(cell, firstLetterCell) &&
				(cellInLastRow(cell) || nextDownCellBlocked(cell))
			);
		});
	});

	return lastLetterCells;
};

export const getAcrossWords = (firstLetterCells, lastLetterCells) => {
	const cellsArray = [...document.querySelectorAll(".xword-cell")];
	const firstAndLastLetterCells = firstLetterCells.map(
		(firstLetterCell, firstLetterCellIndex, firstLetterCellArray) => ({
			firstLetterCell: firstLetterCellArray[firstLetterCellIndex],
			lastLetterCell: lastLetterCells[firstLetterCellIndex],
		})
	);

	const wordsArray = firstAndLastLetterCells.map(
		({ firstLetterCell, lastLetterCell }) =>
			cellsArray.filter(
				(cell, index) =>
					index >= getCellIndex(firstLetterCell) &&
					index <= getCellIndex(lastLetterCell)
			)
	);

	return wordsArray;
};

export const getDownWords = (firstLetterCells, lastLetterCells) => {
	const cellsArray = [...document.querySelectorAll(".xword-cell")];
	const firstAndLastLetterCells = firstLetterCells.map(
		(firstLetterCell, firstLetterCellIndex, firstLetterCellArray) => ({
			firstLetterCell: firstLetterCellArray[firstLetterCellIndex],
			lastLetterCell: lastLetterCells[firstLetterCellIndex],
		})
	);

	const wordsArray = firstAndLastLetterCells.map(
		({ firstLetterCell, lastLetterCell }) =>
			cellsArray.filter(
				(cell, index) =>
					index >= getCellIndex(firstLetterCell) &&
					index <= getCellIndex(lastLetterCell) &&
					cellsInSameColumn(cell, firstLetterCell)
			)
	);

	return wordsArray;
};
 */

const getStartCells = (direction, cells) => {
	const startCells = cells.filter((cell) => cell[direction] === true);
	return startCells;
};

const getNextBlackSquare = (direction, cells, startCell) => {
	const nextBlackSquare = cells.find((cell, index) => {
		const isInSameCellGroup =
			direction === "across"
				? cell.row === startCell.row
				: cell.column === startCell.column;
		return index > startCell.index && isInSameCellGroup && cell.isBlackSquare;
	});
	return nextBlackSquare;
};

/* const getRowEnd = (cells, startCell) => {
	const rowIndex = startCell.row;
	const row = cells.filter((cell) => cell.row === rowIndex);
	const rowEnd = row[row.length - 1];
	return rowEnd;
};

const getColumnEnd = (cells, startCell) => {
	const columnIndex = startCell.column;
	const column = cells.filter((cell) => cell.column === columnIndex);
	const columnEnd = column[column.length - 1];
	return columnEnd;
}; */

const getRowOrColumnEnd = (direction, cells, startCell) => {
	const rowOrColumn = direction === "across" ? "row" : "column";
	const rowOrColumnIndex = startCell[rowOrColumn];
	const rowOrColumnCells = cells.filter(
		(cell) => cell[rowOrColumn] === rowOrColumnIndex
	);
	const rowOrColumnEnd = rowOrColumnCells[rowOrColumnCells.length - 1];
	return rowOrColumnEnd;
};

export const getWords = (direction, cells) => {
	const startCells = getStartCells(direction, cells);
	const words = startCells.map((startCell) => {
		const nextBlackSquare = getNextBlackSquare(direction, cells, startCell);
		const rowOrColumnEnd = getRowOrColumnEnd(direction, cells, startCell);
		const wordEndIndex = nextBlackSquare
			? nextBlackSquare.index - 1
			: rowOrColumnEnd.index;
		const word = cells.filter((cell, index) => {
			return direction === "across"
				? index >= startCell.index && index <= wordEndIndex
				: index >= startCell.index &&
						index <= wordEndIndex &&
						cell.column === startCell.column;
		});
		const clueNumber = cells[startCell.index].number;
		const wordObject = { [clueNumber]: word };
		return wordObject;
	});
	const wordsObject = Object.assign(...words);
	return wordsObject;
};

export const getWords2 = (direction, cells) => {
	const startCells = getStartCells(direction, cells);
	const words = startCells.map((startCell) => {
		const nextBlackSquare = getNextBlackSquare(direction, cells, startCell);
		const rowOrColumnEnd = getRowOrColumnEnd(direction, cells, startCell);
		const wordEndIndex = nextBlackSquare
			? nextBlackSquare.index - 1
			: rowOrColumnEnd.index;
		const word = cells.filter((cell, index) => {
			return direction === "across"
				? index >= startCell.index && index <= wordEndIndex
				: index >= startCell.index &&
						index <= wordEndIndex &&
						cell.column === startCell.column;
		});
		return word;
	});
	return words;
};
export const getSelectedWordObject = (wordsObject) => {
	const wordsArray = Object.values(wordsObject);
	const selectedWord = wordsArray.find((word) =>
		word.find((cell) => cell.isSelected)
	);
	return {
		word: selectedWord,
		index: wordsArray.indexOf(selectedWord),
	};
};

export const isInSelectedWord = (selectedWord, cell) => {
	return selectedWord && selectedWord.includes(cell);
};

const cellHasLetter = (cell) => cell.letter.length > 0;

/* const getFirstAvailableWordObject = (direction, cells) => {
	const wordsObject = getWords(direction, cells);
	const wordsArray = Object.values(wordsObject);
	const firstAvailableWord = wordsArray.find(
		(word) => !word.every(cellHasLetter)
	);
	return {
		word: firstAvailableWord,
		index: wordsArray.indexOf(firstAvailableWord),
	};
}; */

/* const getLastAvailableWordObject = (direction, cells) => {
	const wordsObject = getWords(direction, cells);
	const wordsArray = Object.values(wordsObject);
	const lastAvailableWord = wordsArray.findLast(
		(word) => !word.every(cellHasLetter)
	);
	return {
		word: lastAvailableWord,
		index: wordsArray.indexOf(lastAvailableWord),
	};
}; */

/* export const getFirstOrLastAvailableWordObject = (
	firstOrLast,
	direction,
	cells
) => {
	const wordsObject = getWords(direction, cells);
	const wordsArray = Object.values(wordsObject);
	const arrayMethod = firstOrLast === "first" ? "find" : "findLast";
	const availableWord = wordsArray[arrayMethod](
		(word) => !word.every(cellHasLetter)
	);

	return {
		word: availableWord,
		index: wordsArray.indexOf(availableWord),
	};
}; */

export const getAvailableWords = (direction, cells) => {
	const words = getWords2(direction, cells);
	const availableWords = words.filter((word) => !word.every(cellHasLetter));
	return availableWords;
};

export const getFirstOrLastAvailableWordObject =
	(firstOrLast) => (direction, cells) => {
		const wordsObject = getWords(direction, cells);
		const wordsArray = Object.values(wordsObject);
		const arrayMethod = firstOrLast === "first" ? "find" : "findLast";
		const availableWord = wordsArray[arrayMethod](
			(word) => !word.every(cellHasLetter)
		);

		return {
			word: availableWord,
			index: wordsArray.indexOf(availableWord),
		};
	};
export const firstAvailableWordObject =
	getFirstOrLastAvailableWordObject("first");
export const lastAvailableWordObject =
	getFirstOrLastAvailableWordObject("last");

/* export const getFirstBlankInWord = (word) =>
	word.find((cell) => !cellHasLetter(cell)); */
export const getFirstBlankInWord = (word) =>
	word && word.find((cell) => !cellHasLetter(cell));

/* const getPreviousAvailableWord = (direction, cells) => {
	const wordsObject = getWords(direction, cells);
	const wordsArray = Object.values(wordsObject);
	const selectedWordIndex = getSelectedWordObject(wordsObject).index;
	const firstAvailableWordIndex = getFirstAvailableWordObject(
		direction,
		cells
	).index;

	if (selectedWordIndex === firstAvailableWordIndex) return;

	const previousAvailableWord = wordsArray.findLast(
		(word, index) => index < selectedWordIndex && !word.every(cellHasLetter)
	);
	return previousAvailableWord;
}; */

/* const getNextAvailableWord = (direction, cells) => {
	const wordsObject = getWords(direction, cells);
	const wordsArray = Object.values(wordsObject);
	const selectedWordIndex = getSelectedWordObject(wordsObject).index;
	const lastAvailableWordIndex = getLastAvailableWordObject(
		direction,
		cells
	).index;

	if (selectedWordIndex === lastAvailableWordIndex) return;

	const nextAvailableWord = wordsArray.find(
		(word, index) => index > selectedWordIndex && !word.every(cellHasLetter)
	);
	return nextAvailableWord;
}; */

/* export const getAdjacentAvailableWord = (previousOrNext, direction, cells) => {
	const wordsObject = getWords(direction, cells);
	const wordsArray = Object.values(wordsObject);
	const selectedWordIndex = getSelectedWordObject(wordsObject).index;
	const extremity = previousOrNext === "previous" ? "first" : "last";
	const outermostAvailableWordIndex = getFirstOrLastAvailableWordObject(
		extremity,
		direction,
		cells
	).index;

	if (selectedWordIndex === outermostAvailableWordIndex) return;

	const arrayMethod = extremity === "first" ? "findLast" : "find";
	const adjacentAvailableWord = wordsArray[arrayMethod]((word, index) => {
		if (arrayMethod === "findLast") {
			return index < selectedWordIndex && !word.every(cellHasLetter);
		} else {
			return index > selectedWordIndex && !word.every(cellHasLetter);
		}
	});
	return adjacentAvailableWord;
}; */

/* export const getClosestAvailableWord = (beforeOrAfter, direction, cells) => {
	const wordsObject = getWords(direction, cells);
	const wordsArray = Object.values(wordsObject);
	const selectedWordIndex = getSelectedWordObject(wordsObject).index;
	const extremity = beforeOrAfter === "before" ? "first" : "last";
	// const firstOrLastAvailableWordIndex = getFirstOrLastAvailableWordObject(
	// 	extremity,
	// 	direction,
	// 	cells
	// ).index;
	const firstOrLastAvailableWordIndex = getFirstOrLastAvailableWordObject(
		extremity
	)(direction, cells).index;

	if (selectedWordIndex === firstOrLastAvailableWordIndex) return;

	const arrayMethod = extremity === "first" ? "findLast" : "find";
	const adjacentAvailableWord = wordsArray[arrayMethod]((word, index) => {
		if (arrayMethod === "findLast") {
			return index < selectedWordIndex && !word.every(cellHasLetter);
		} else {
			return index > selectedWordIndex && !word.every(cellHasLetter);
		}
	});
	return adjacentAvailableWord;
}; */

const getClosestAvailableWord = (beforeOrAfter) => (direction, cells) => {
	const wordsObject = getWords(direction, cells);
	const wordsArray = Object.values(wordsObject);
	const selectedWordIndex = getSelectedWordObject(wordsObject).index;
	const extremity = beforeOrAfter === "before" ? "first" : "last";
	const firstOrLastAvailableWordIndex = getFirstOrLastAvailableWordObject(
		extremity
	)(direction, cells).index;

	if (selectedWordIndex === firstOrLastAvailableWordIndex) return;

	const arrayMethod = extremity === "first" ? "findLast" : "find";
	const adjacentAvailableWord = wordsArray[arrayMethod]((word, index) => {
		if (arrayMethod === "findLast") {
			return index < selectedWordIndex && !word.every(cellHasLetter);
		} else {
			return index > selectedWordIndex && !word.every(cellHasLetter);
		}
	});
	return adjacentAvailableWord;
};

export const previousAvailableWord = getClosestAvailableWord("before");
export const nextAvailableWord = getClosestAvailableWord("after");

export const wordIsSelected = (wordIndex, direction, cells) => {
	const wordsObject = getWords(direction, cells);
	const selectedWordIndex = getSelectedWordObject(wordsObject).index;

	return selectedWordIndex === wordIndex;
};

export const createWordObjects = (direction, cells) => {
	const wordsArray = getWords2(direction, cells);
	const availableWordsArray = getAvailableWords(direction, cells);
	const firstAvailableWord = availableWordsArray[0];
	const lastAvailableWord = availableWordsArray[availableWordsArray.length - 1];
	const wordObjectsArray = wordsArray.map((word, index, array) => {
		const selectedWordIndex = array.findIndex((word) =>
			word.find((cell) => cell.isSelected)
		);
		const previousAvailableWordIndex = array.findLastIndex(
			(word, index) => index < selectedWordIndex && !word.every(cellHasLetter)
		);
		const nextAvailableWordIndex = array.findIndex(
			(word, index) => index > selectedWordIndex && !word.every(cellHasLetter)
		);
		return {
			word: word,
			index: index,
			clueNumber: word[0].number,
			direction: direction,
			isAvailable: !word.every(cellHasLetter),
			// availableWordIndex: availableWordsArray.findIndex(
			// 	(availableWord) => availableWord[0].number === word[0].number
			// ),
			availableWordIndex:
				!word.every(cellHasLetter) &&
				availableWordsArray.findIndex(
					(availableWord) => availableWord[0].number === word[0].number
				),
			isFirstAvailableWord: firstAvailableWord[0].number === word[0].number,
			isLastAvailableWord: lastAvailableWord[0].number === word[0].number,
			isPreviousAvailableWord: index === previousAvailableWordIndex,
			isNextAvailableWord: index === nextAvailableWordIndex,
			isSelected: index === selectedWordIndex,
			firstBlankCell: word.find((cell) => !cellHasLetter(cell)),
		};
	});
	return wordObjectsArray;
};

export const getFirstAvailableWord = (direction, cells) =>
	createWordObjects(direction, cells).find((obj) => obj.isFirstAvailableWord);

export const getLastAvailableWord = (direction, cells) =>
	createWordObjects(direction, cells).find((obj) => obj.isLastAvailableWord);

export const getPreviousAvailableWord = (direction, cells) =>
	createWordObjects(direction, cells).find(
		(obj) => obj.isPreviousAvailableWord
	);
export const getNextAvailableWord = (direction, cells) =>
	createWordObjects(direction, cells).find((obj) => obj.isNextAvailableWord);
