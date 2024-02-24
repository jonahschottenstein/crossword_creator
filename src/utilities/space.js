export const handleSpaceKey = (e, direction, setDirection) => {
	e.preventDefault();

	if (e.key !== " ") return;

	const newDirection = direction === "across" ? "down" : "across";

	setDirection(newDirection);
};
