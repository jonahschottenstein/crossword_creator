export const handleSpaceKey = (e, direction, setDirection) => {
	e.preventDefault();

	if (e.type === "keydown" && e.key !== " ") return;
	if (
		e.type === "click" &&
		!e.target.matches("button.mobile-keyboard-key[value='_']")
	)
		return;

	const newDirection = direction === "across" ? "down" : "across";

	setDirection(newDirection);
};
