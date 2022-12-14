const toggleCellBlock = (e) => {
	const cellBlockInput = document.querySelector(".cell-block-toggle-input");
	if (!cellBlockInput.checked) return;
	if (!e.target.matches("rect")) return;
	e.target.classList.add("cell-block");
};

export default toggleCellBlock;
