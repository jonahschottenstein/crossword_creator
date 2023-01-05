export const handleArrowKeyDirectionChange = (e, direction, setDirection) => {
	if (direction === "down") {
		if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
			setDirection("across");
		}
	} else {
		if (e.key === "ArrowUp" || e.key === "ArrowDown") {
			setDirection("down");
		}
	}
};
