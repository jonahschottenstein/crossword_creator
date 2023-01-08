import {
	firstAvailableWordObject,
	lastAvailableWordObject,
	previousAvailableWord,
	nextAvailableWord,
	wordIsSelected,
	getFirstBlankInWord,
	createWordObjects,
} from "./words.js";

export const handleShiftTabKeyDirectionChange = (
	e,
	direction,
	setDirection,
	cells
) => {
	if (!e.shiftKey || e.key !== "Tab") return;

	const wordObjects = createWordObjects(direction, cells);
	const firstAvailableWordIsSelected = wordObjects.some(
		(obj) => obj.isFirstAvailableWord && obj.isSelected
	);

	if (firstAvailableWordIsSelected) {
		setDirection((d) => (d === "across" ? "down" : "across"));
	}
};

export const handleShiftTabKeyMovement = (
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
};

export const handleTabKeyDirectionChange = (
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
};

// Think the reason handleTabKeyMovement works is because first blank cells of firstAvailableWordAcross/Down are the same
export const handleTabKeyMovement = (e, direction, setDirection, cells) => {
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
};
