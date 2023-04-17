export const setShadedCell = (
	e,
	setCells,
	targetIndex = Number(e.target.dataset.index)
) => {
	if (e.target.classList.contains("cell-block")) return;

	setCells((prevState) => {
		const newState = prevState.map((cell) => {
			if (cell.index === targetIndex) {
				return { ...cell, isShaded: !cell.isShaded };
			} else {
				return cell;
			}
		});

		return newState;
	});
};
