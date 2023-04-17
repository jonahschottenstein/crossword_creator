export const setCellBlock = (
	e,
	setCells,
	targetIndex = Number(e.target.dataset.index)
) => {
	setCells((prevState) => {
		const newState = prevState.map((cell) => {
			if (cell.index === targetIndex) {
				return {
					...cell,
					isBlackSquare: !cell.isBlackSquare,
					letter: "",
					isShaded: false,
					isCircled: false,
				};
			} else {
				return cell;
			}
		});
		return newState;
	});
};
