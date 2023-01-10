export const setTabIndex = () => {
	const rects = document.querySelectorAll(".cell-rect");
	rects.forEach((rect) => {
		if (rect.classList.contains("cell-block")) {
			rect.tabIndex = -1;
		} else {
			rect.tabIndex = 0;
		}
	});
};
