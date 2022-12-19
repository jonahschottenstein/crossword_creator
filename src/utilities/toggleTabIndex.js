/* export const toggleTabIndex = (e) => {
	e.target.classList.contains("cell-block")
		? (e.target.tabIndex = -1)
		: (e.target.tabIndex = 0);
}; */

export const setTabIndex = () => {
	const rectsArray = document.querySelectorAll(".cell-rect");
	rectsArray.forEach((rect) => {
		if (rect.classList.contains("cell-block")) {
			rect.tabIndex = -1;
		} else {
			rect.tabIndex = 0;
		}
	});
};
