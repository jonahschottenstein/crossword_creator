export const toggleCellBlock = (e) => {
	const cellBlockInput = document.querySelector("#cell-block-input");
	if (!cellBlockInput.checked) return;
	if (!e.target.matches("rect")) return;
	e.target.classList.toggle("cell-block");
};
