import { setClueText } from "./setClueText";

export const autoExpand = (textarea) => {
	textarea.style.height = "inherit";
	const textareaStyles = window.getComputedStyle(textarea);
	const height =
		textarea.scrollHeight +
		parseInt(textareaStyles.getPropertyValue("border-bottom-width"), 10);

	textarea.style.height = height + "px";
};

const handleTextareaHeight = (e) => {
	if (e.target.tagName.toLowerCase() !== "textarea") return;
	autoExpand(e.target);
};

export const handleClueLiTextareaChange = (e) => {
	handleTextareaHeight(e);
};

const handleClueText = (e, setCells) => {
	setClueText(e, setCells);
};

export const handleClueTextarea = (e, setCells) => {
	handleClueLiTextareaChange(e);
	handleClueText(e, setCells);
};

export const handleClueEditButtonClick = (e) => {
	const closestLi = e.target.closest(".clue-list-item");
	const closestTextarea = closestLi.querySelector("textarea");
	if (!closestLi.classList.contains("highlighted")) {
		closestLi.click();
	}
	closestTextarea.classList.add("accessible");
	closestTextarea.focus();
};

export const handleClueDoneButtonClick = (e, setActiveTextarea) => {
	setActiveTextarea(null);

	const closestLi = e.target.closest(".clue-list-item");
	const closestTextarea = closestLi.querySelector("textarea");
	closestTextarea.classList.remove("accessible");
	const selectedCellElement = document.querySelector(".cell.selected");
	if (selectedCellElement) {
		selectedCellElement.focus();
	}
};

export const handleEnterKeyDown = (e, setActiveTextarea) => {
	if (e.key !== "Enter") return;
	e.preventDefault();
	handleClueDoneButtonClick(e, setActiveTextarea);
};

export const handleClueTextareaFocus = (e, setActiveTextarea) => {
	setActiveTextarea(e.target.getAttribute("name"));

	const activeElement = document.activeElement;
	if (activeElement.matches(".clue-textarea")) {
		const listItem = activeElement.closest("li");
		setTimeout(() => {
			if (!listItem.classList.contains("highlighted")) {
				listItem.click();
				activeElement.focus();
			}
		}, 50);
	}
};

export const handleClueTextareaBlur = (e) => {
	console.log("BLUR");
	const closestLi = e.target.closest(".clue-list-item");
	const doneButton = closestLi.querySelector(".clue-done-button");
	console.log({ doneButton });
	doneButton.click();
};
