export const clearFill = (setCells) => {
	setCells((prevState) => {
		const newState = prevState.map((cell) => {
			if (cell.isBlackSquare) {
				return cell;
			} else {
				return { ...cell, letter: "" };
			}
		});

		return newState;
	});
};
