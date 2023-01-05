import { getFirstOrLastAvailableWordObject, wordIsSelected } from "./words.js";

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
