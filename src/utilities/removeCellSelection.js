export const removeCellSelection = (setCells) => {
	setCells((prevState) => {
		const newState = prevState.map((cell) => {
			if (cell.isSelected) {
				return { ...cell, isSelected: false };
			} else {
				return cell;
			}
		});
		return newState;
	});
};
