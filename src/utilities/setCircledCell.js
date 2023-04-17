export const setCircledCell = (
	e,
	setCells,
	targetIndex = Number(e.target.dataset.index)
) => {
	if (e.target.classList.contains("cell-block")) return;

	setCells((prevState) => {
		const newState = prevState.map((cell) => {
			if (cell.index === targetIndex) {
				return { ...cell, isCircled: !cell.isCircled };
			} else {
				return cell;
			}
		});

		return newState;
	});
};
