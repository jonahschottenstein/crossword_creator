export const toggleCellBlockSymmetry = (e) => {
	const cellBlockInput = document.querySelector("#cell-block-input");
	const symmetryInput = document.querySelector("#symmetry-input");
	const cellRects = document.querySelectorAll(".cell-rect");

	if (!cellBlockInput.checked) return;
	if (!symmetryInput.checked) return;
	if (!e.target.matches("rect")) return;

	const numberOfCells = cellRects.length;
	const lastCellIndex = numberOfCells - 1;
	const targetIndex = e.target.getAttribute("data-index");
	const symmetricalIndex = lastCellIndex - targetIndex;
	const centerCellIndex = Math.floor(numberOfCells / 2);

	if (targetIndex !== centerCellIndex) {
		console.log(targetIndex);
		console.log(cellRects);
		console.log(cellRects[symmetricalIndex]);
		cellRects[symmetricalIndex].classList.toggle("cell-block");
	}
};
