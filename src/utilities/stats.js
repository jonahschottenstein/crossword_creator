import { cellHasLetter, getNextDirection } from "../utilities/helpers";
import { getWords } from "../utilities/words";

const letterValues = {
	A: 1,
	B: 3,
	C: 3,
	D: 2,
	E: 1,
	F: 4,
	G: 2,
	H: 4,
	I: 1,
	J: 8,
	K: 5,
	L: 1,
	M: 3,
	N: 1,
	O: 1,
	P: 3,
	Q: 10,
	R: 1,
	S: 1,
	T: 1,
	U: 1,
	V: 4,
	W: 4,
	X: 8,
	Y: 4,
	Z: 10,
};

const getAlphabet = () => Object.keys(letterValues);

const isAPangram = (cells) => {
	const cellLetters = cells.map((cell) => cell.letter);
	const isUnincluded = (letter) => !cellLetters.includes(letter);
	const alphabet = getAlphabet();
	const unincludedLetters = alphabet.filter(isUnincluded);
	const isAPangram = unincludedLetters.length < 1;

	if (isAPangram) return "True";
	return `False (Missing: ${unincludedLetters.join(", ")})`;
};

const getTotalWords = (direction, cells) => {
	const nextDirection = getNextDirection(direction);
	const totalWords = [
		...getWords(direction, cells),
		...getWords(nextDirection, cells),
	];

	return totalWords;
};

const getBlackSquareCount = (cells) => {
	const blackSquares = cells.filter((cell) => cell.isBlackSquare);
	const blackSquareCount = `${blackSquares.length} (${(
		(blackSquares.length / cells.length) *
		100
	).toFixed(2)}%)`;

	return blackSquareCount;
};

const getAvgWordLength = (direction, cells) => {
	const totalWords = getTotalWords(direction, cells);
	const wordLengths = totalWords.map((word) => word.length);
	const wordLengthsSummed = wordLengths.reduce((pv, cv) => pv + cv, 0);
	const avgWordLength = (wordLengthsSummed / totalWords.length).toFixed(2);

	return avgWordLength;
};

const getScrabbleScore = (direction, cells) => {
	const lettersMapped = cells.map((cell) => {
		if (!cellHasLetter(cell)) return 0;
		return letterValues[cell.letter.toUpperCase()];
	});
	const totalScrabblePoints = lettersMapped.reduce((pv, cv) => pv + cv, 0);
	const whiteSquareCount = getWords(direction, cells).flat().length;
	const scrabbleScore = (totalScrabblePoints / whiteSquareCount).toFixed(2);

	return scrabbleScore;
};

const getRowLength = (cells) => cells.filter((cell) => cell.row === 0).length;

const getColumnLength = (cells) =>
	cells.filter((cell) => cell.column === 0).length;

export const getStats = (direction, cells) => {
	const rowLength = getRowLength(cells);
	const columnLength = getColumnLength(cells);
	const gridSize = `${rowLength} x ${columnLength}`;
	const totalWords = getTotalWords(direction, cells);
	const totalWordCount = totalWords.length;
	const blackSquareCount = getBlackSquareCount(cells);
	const avgWordLength = getAvgWordLength(direction, cells);
	const scrabbleScore = getScrabbleScore(direction, cells);
	const pangram = isAPangram(cells);

	return {
		gridSize,
		totalWordCount,
		blackSquareCount,
		avgWordLength,
		scrabbleScore,
		pangram,
	};
};
