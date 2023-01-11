export const setSelectedCell = (e, setCells) => {
	if (e.target.classList.contains("cell-block")) return;

	const targetIndex = Number(e.target.dataset.index);
	setCells((prevState) => {
		const newState = prevState.map((cell) => {
			if (cell.index === targetIndex) {
				return { ...cell, isSelected: true };
			} else {
				return { ...cell, isSelected: false };
			}
		});
		return newState;
	});
};
