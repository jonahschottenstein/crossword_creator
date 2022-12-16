export const toggleTabIndex = (e) => {
	e.target.classList.contains("cell-block")
		? (e.target.tabIndex = -1)
		: (e.target.tabIndex = 0);
};
