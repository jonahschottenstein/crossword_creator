import { setClueText, setIsEditing } from "./clueListItemsData";

const autoExpand = (textarea) => {
	textarea.style.height = "inherit";
	const textareaStyles = window.getComputedStyle(textarea);
	const height =
		parseInt(textareaStyles.getPropertyValue("border-top-width"), 10) +
		parseInt(textareaStyles.getPropertyValue("padding-top"), 10) +
		textarea.scrollHeight +
		parseInt(textareaStyles.getPropertyValue("padding-bottom"), 10) +
		parseInt(textareaStyles.getPropertyValue("border-bottom-width"), 10);

	textarea.style.height = height + "px";
};

const handleTextareaHeight = (e) => {
	console.log("TEXTAREAHEIGHTCHANGE");
	if (e.target.tagName.toLowerCase() !== "textarea") return;
	autoExpand(e.target);
};

export const handleClueLiTextareaChange = (e, setClueListItemsData) => {
	console.log("handleClueLiTextareaChange");
	handleTextareaHeight(e);
	setClueText(e, setClueListItemsData);
};

export const handleClueEditButtonClick = (e, setClueListItemsData) => {
	if (!e.target.matches(".edit-clue-button")) return;
	const closestLi = e.target.closest(".clue-list-item");
	const closestTextarea = closestLi.querySelector("textarea");
	closestLi.click();
	closestTextarea.classList.add("accessible");
	closestTextarea.click();
	closestTextarea.focus();
	setIsEditing(e, setClueListItemsData);
	e.stopPropagation();
};

export const handleClueTextareaBlur = (e, setClueListItemsData) => {
	const closestLi = e.target.closest(".clue-list-item");
	const closestTextarea = closestLi.querySelector("textarea");
	closestTextarea.classList.remove("accessible");
	console.log({ closestLi, closestTextarea });
	setIsEditing(e, setClueListItemsData);
};
