import { getNextDirection } from "./helpers";

export const handleSpaceKey = (e, direction, setDirection) => {
	if (e.key !== " ") return;

	e.preventDefault();

	const nextDirection = getNextDirection(direction);

	setDirection(nextDirection);
};
