export const setShadedCell = (e, setCells) => {
	if (e.target.classList.contains("cell-block")) return;

	const targetIndex = Number(e.target.dataset.index);
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
