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
	if (e.target.tagName.toLowerCase() !== "textarea") return;
	autoExpand(e.target);
};

export const handleClueLiTextareaChange = (e) => {
	handleTextareaHeight(e);
};

export const handleClueEditButtonClick = (e, setIsEditing) => {
	if (!e.target.matches(".edit-clue-button")) return;

	setIsEditing(e.target.name);

	// e.preventDefault() would maybe simplify things
	const closestLi = e.target.closest(".clue-list-item");
	const closestTextarea = closestLi.querySelector("textarea");
	closestLi.click();
	closestTextarea.classList.add("accessible");
	closestTextarea.click();
	closestTextarea.focus();
	e.stopPropagation();
};

export const handleClueTextareaBlur = (e) => {
	const closestLi = e.target.closest(".clue-list-item");
	const closestTextarea = closestLi.querySelector("textarea");
	closestTextarea.classList.remove("accessible");
};
