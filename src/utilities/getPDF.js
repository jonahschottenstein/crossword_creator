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

const createGrid = (doc, coords, cells) => {
	coords.map(({ x, y }, index) => {
		const cell = cells[index];

		if (cell.isBlackSquare) {
			doc.setFillColor(0);
			return doc.rect(x, y, 8, 8, "FD");
		}
		if (cell.isShaded) {
			doc.setFillColor("#DCDCDC");
			doc.rect(x, y, 8, 8, "FD");
		} else {
			doc.setFillColor(255);
			doc.rect(x, y, 8, 8, "FD");
		}
		if (cell.isCircled) {
			doc.circle(x + 4, y + 4, 4);
		}
		if (cell.number) {
			if (cell.isCircled) {
				const fillColor = cell.isShaded ? "#DCDCDC" : 255;
				const lineWidth = doc.getLineWidth();
				doc.setFillColor(fillColor);
				doc.rect(x + lineWidth / 2, y + lineWidth / 2, 4, 4, "F");
			}
			doc.setFontSize(7);
			doc.text(`${cell.number}`, x + 0.5, y + 2.5);
		}
		if (cell.letter) {
			doc.setFontSize(15);
			doc.text(`${cell.letter}`, x + 4, y + 7, { align: "center" });
		}

		return doc;
	});
};

const createHeader = (
	doc,
	{ firstName, lastName, address, city, state, zipCode, email },
	margin = 13
) => {
	doc.setFontSize(13.75);
	doc.setFont("times", "normal", "700");
	doc.text(firstName + " " + lastName, margin, 10);
	doc.text(address, margin, 15);
	doc.text(city + ", " + state + " " + zipCode, margin, 20);
	doc.text(email, margin, 25);
};

const getClueSpacingData = ({ clueNumber, clueText }, doc) => {
	const splitSize = 109; // Seems about where it is for NYT
	const clueNumberWidth = doc.getTextWidth(`${clueNumber}`);
	const clueTextWidth = doc.getTextWidth(clueText);
	const textLinesCount = Math.ceil(clueTextWidth / splitSize);

	return { splitSize, clueNumberWidth, clueTextWidth, textLinesCount };
};

const createClue = (
	{ clueNumber, clueText, answer },
	doc,
	yPos,
	margin = 13
) => {
	const { splitSize, clueNumberWidth } = getClueSpacingData(
		{ clueNumber, clueText },
		doc
	);
	const newClueText = doc.splitTextToSize(clueText, splitSize);
	doc.text(`${clueNumber}`, margin, yPos);
	doc.text(newClueText, margin + clueNumberWidth + 1, yPos);
	doc.text(answer, 88 + 47.95, yPos);
};
