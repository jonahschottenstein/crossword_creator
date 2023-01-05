import {
	getFirstOrLastAvailableWordObject,
	wordIsSelected,
	getClosestAvailableWord,
	getFirstBlankInWord,
} from "./words.js";

export const handleTabKeyDirectionChange = (
	e,
	direction,
	setDirection,
	cells
) => {
	const lastAvailableWordObject = getFirstOrLastAvailableWordObject(
		"last",
		direction,
		cells
	);
	const lastAvailableWordIsSelected = wordIsSelected(
		lastAvailableWordObject.index,
		direction,
		cells
	);

	if (e.shiftKey || e.key !== "Tab") return;

	if (lastAvailableWordIsSelected) {
		setDirection((d) => (d === "across" ? "down" : "across"));
	}
};

export const handleTabKeyMovement = (e, direction, setDirection, cells) => {
	if (e.shiftKey || e.key !== "Tab") return;
	e.preventDefault();

	const firstBlankInNextAvailableWord = getFirstBlankInWord(
		getClosestAvailableWord("after", direction, cells)
	);
	const firstBlankInFirstAvailableWord = getFirstBlankInWord(
		getFirstOrLastAvailableWordObject("first", direction, cells).word
	);
	const firstBlankElement =
		document.getElementsByClassName("cell")[
			firstBlankInFirstAvailableWord.index
		];
	const lastAvailableWordIsSelected = wordIsSelected(
		getFirstOrLastAvailableWordObject("last", direction, cells).index,
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
