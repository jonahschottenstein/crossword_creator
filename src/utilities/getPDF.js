import { getWordObjs } from "./words";

const getXOffset = (paperWidth = 215.9, gridWidth = 120) => {
	return (paperWidth - gridWidth) / 2;
};

const getYOffset = (paperHeight = 279.4, gridHeight = 120) => {
	return (paperHeight - gridHeight) / 2;
};

const getSquareCoords = (
	gridLength = 15,
	squareLength = 8,
	xOffset = getXOffset(),
	yOffset = getYOffset()
) => {
	let arr = [];
	for (let i = 0; i < 15; i++) {
		for (let j = 0; j <= (gridLength - 1) * squareLength; j += squareLength) {
			arr.push({ x: j + xOffset, y: i * squareLength + yOffset });
		}
	}

	return arr;
};

const getClues = (direction, cells) => {
	const wordObjs = getWordObjs(direction, cells);
	const clues = wordObjs.map((wordObj) => {
		const clueNumber = wordObj.clueNumber;
		const clueText = wordObj.firstCell.clueText[direction].trim();
		const answer = wordObj.word.map((cell) => cell.letter).join("");

		return { clueNumber, clueText, answer };
	});

	return clues;
};
