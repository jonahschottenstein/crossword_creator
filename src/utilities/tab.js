import {
	firstAvailableWordObject,
	lastAvailableWordObject,
	previousAvailableWord,
	nextAvailableWord,
	wordIsSelected,
	getFirstBlankInWord,
	createWordObjects,
	getFirstAvailableWord,
	getLastAvailableWord,
	getPreviousAvailableWord,
	getNextAvailableWord,
	getRemainingAvailableWords,
} from "./words.js";

export const handleTabDirectionChange = (e, direction, setDirection, cells) => {
	const isShiftKeyPressed = e.shiftKey;
	if (e.key !== "Tab") return;
	e.preventDefault();

	const remainingAvailableWords = getRemainingAvailableWords(direction, cells)[
		isShiftKeyPressed ? "before" : "after"
	];

	if (remainingAvailableWords.length !== 0) return;
	setDirection((d) => (d === "across" ? "down" : "across"));
};

export const handleShiftTabKeyDirectionChange = (
	e,
	direction,
	setDirection,
	cells
) => {
	if (!e.shiftKey || e.key !== "Tab") return;

	const remainingAvailableWords = getRemainingAvailableWords(
		direction,
		cells
	).before;

	if (remainingAvailableWords.length === 0) {
		setDirection((d) => (d === "across" ? "down" : "across"));
	}
};

const getCellElement = (cell) => {
	const cellElements = document.getElementsByClassName("cell");
	return cellElements[cell.index];
};

export const handleTabMovement = (e, direction, cells) => {
	const isShiftKeyPressed = e.shiftKey;
	if (e.key !== "Tab") return;
	e.preventDefault();

	const nextDirection = direction === "across" ? "down" : "across";
	const firstAvailableWordNextDirection = isShiftKeyPressed
		? getLastAvailableWord(nextDirection, cells)
		: getFirstAvailableWord(nextDirection, cells);
	const nextAvailableWord = isShiftKeyPressed
		? getPreviousAvailableWord(direction, cells)
		: getNextAvailableWord(direction, cells);
	const remainingAvailableWords = getRemainingAvailableWords(direction, cells)[
		isShiftKeyPressed ? "before" : "after"
	];

	if (remainingAvailableWords.length === 0) {
		getCellElement(firstAvailableWordNextDirection.firstBlankCell).click();
		getCellElement(firstAvailableWordNextDirection.firstBlankCell).focus({
			preventScroll: true,
		});
	} else {
		getCellElement(nextAvailableWord.firstBlankCell).click();
		getCellElement(nextAvailableWord.firstBlankCell).focus({
			preventScroll: true,
		});
	}
};

/* export const handleShiftTabKeyMovement = (
	e,
	direction,
	setDirection,
	cells
) => {
	if (!e.shiftKey || e.key !== "Tab") return;
	e.preventDefault();

	const firstBlankInPreviousAvailableWord = getFirstBlankInWord(
		previousAvailableWord(direction, cells)
	);
	const firstBlankInLastAvailableAcrossWord = getFirstBlankInWord(
		lastAvailableWordObject("across", cells).word
	);
	const firstBlankInLastAvailableDownWord = getFirstBlankInWord(
		lastAvailableWordObject("down", cells).word
	);
	const firstBlankElementInLastAvailableAcrossWord =
		document.getElementsByClassName("cell")[
			firstBlankInLastAvailableAcrossWord.index
		];
	const firstBlankElementInLastAvailableDownWord =
		document.getElementsByClassName("cell")[
			firstBlankInLastAvailableDownWord.index
		];
	const firstAvailableAcrossWordIsSelected = wordIsSelected(
		firstAvailableWordObject("across", cells).index,
		"across",
		cells
	);
	const firstAvailableDownWordIsSelected = wordIsSelected(
		firstAvailableWordObject("down", cells).index,
		"down",
		cells
	);

	if (direction === "across") {
		if (firstAvailableAcrossWordIsSelected) {
			handleShiftTabKeyDirectionChange(e, "across", setDirection, cells);
			firstBlankElementInLastAvailableDownWord.click();
			firstBlankElementInLastAvailableDownWord.focus({ preventScroll: true });
		} else {
			const firstBlankElementInPreviousAvailableWord =
				document.getElementsByClassName("cell")[
					firstBlankInPreviousAvailableWord.index
				];
			firstBlankElementInPreviousAvailableWord.click();
			firstBlankElementInPreviousAvailableWord.focus({ preventScroll: true });
		}
	} else {
		if (firstAvailableDownWordIsSelected) {
			handleShiftTabKeyDirectionChange(e, "down", setDirection, cells);
			firstBlankElementInLastAvailableAcrossWord.click();
			firstBlankElementInLastAvailableAcrossWord.focus({ preventScroll: true });
		} else {
			const firstBlankElementInPreviousAvailableWord =
				document.getElementsByClassName("cell")[
					firstBlankInPreviousAvailableWord.index
				];
			firstBlankElementInPreviousAvailableWord.click();
			firstBlankElementInPreviousAvailableWord.focus({ preventScroll: true });
		}
	}
}; */

/* export const handleTabKeyDirectionChange = (
	e,
	direction,
	setDirection,
	cells
) => {
	const lastAvailableWordIsSelected = wordIsSelected(
		lastAvailableWordObject(direction, cells).index,
		direction,
		cells
	);

	if (e.shiftKey || e.key !== "Tab") return;

	if (lastAvailableWordIsSelected) {
		setDirection((d) => (d === "across" ? "down" : "across"));
	}
}; */

// Think the reason handleTabKeyMovement works is because first blank cells of firstAvailableWordAcross/Down are the same
/* export const handleTabKeyMovement = (e, direction, setDirection, cells) => {
	if (e.shiftKey || e.key !== "Tab") return;
	e.preventDefault();

	const firstBlankInNextAvailableWord = getFirstBlankInWord(
		nextAvailableWord(direction, cells)
	);
	const firstBlankInFirstAvailableWord = getFirstBlankInWord(
		firstAvailableWordObject(direction, cells).word
	);
	const firstBlankElement =
		document.getElementsByClassName("cell")[
			firstBlankInFirstAvailableWord.index
		];
	const lastAvailableWordIsSelected = wordIsSelected(
		lastAvailableWordObject(direction, cells).index,
		direction,
		cells
	);

	if (lastAvailableWordIsSelected) {
		handleTabKeyDirectionChange(e, direction, setDirection, cells);
		firstBlankElement.click();
		firstBlankElement.focus({ preventScroll: true });
	} else {
		const firstBlankElementInNextAvailableWord =
			document.getElementsByClassName("cell")[
				firstBlankInNextAvailableWord.index
			];
		firstBlankElementInNextAvailableWord.click();
		firstBlankElementInNextAvailableWord.focus({ preventScroll: true });
	}
}; */
