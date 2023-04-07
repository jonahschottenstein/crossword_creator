import { getWordObjs } from "./words";

const createClueListItemDataObj = (wordObj) => {
	return {
		direction: wordObj.direction,
		clueLabel: wordObj.clueNumber,
		name: `${wordObj.clueNumber}-${wordObj.direction}`,
		isEditing: false,
		// not sure you need isEditing
		editButtonClassName: "edit-clue-button accessible",
		clueText: "",
	};
};

export const getClueListItemsData = (cells) => {
	const acrossWordObjs = getWordObjs("across", cells);
	const downWordObjs = getWordObjs("down", cells);
	const acrossData = acrossWordObjs.map((wordObj) =>
		createClueListItemDataObj(wordObj)
	);
	const downData = downWordObjs.map((wordObj) =>
		createClueListItemDataObj(wordObj)
	);

	return {
		across: acrossData,
		down: downData,
	};
};

export const setIsEditing = (e, setClueListItemsData) => {
	// DRY
	setClueListItemsData((prevState) => {
		const li = e.target.closest(".clue-list-item");
		const textarea = li.querySelector("textarea");
		const textareaHasFocus = document.activeElement === textarea;
		console.log({ textareaHasFocus });

		const prevStateAcross = prevState.across;
		const prevStateDown = prevState.down;

		if (!textareaHasFocus) {
			const newStateAcross = prevStateAcross.map((dataObj) => {
				return {
					...dataObj,
					isEditing: false,
					editButtonClassName: "edit-clue-button accessible",
				};
			});
			const newStateDown = prevStateDown.map((dataObj) => {
				return {
					...dataObj,
					isEditing: false,
					editButtonClassName: "edit-clue-button accessible",
				};
			});
			const newState = { across: newStateAcross, down: newStateDown };

			return newState;
		}

		const newStateAcross = prevStateAcross.map((dataObj) => {
			if (dataObj.name !== li.getAttribute("name")) {
				return {
					...dataObj,
					isEditing: false,
					editButtonClassName: "edit-clue-button accessible",
				};
			} else {
				return {
					...dataObj,
					isEditing: true,
					editButtonClassName: "edit-clue-button isEditing",
				};
			}
		});
		const newStateDown = prevStateDown.map((dataObj) => {
			if (dataObj.name !== li.getAttribute("name")) {
				return {
					...dataObj,
					isEditing: false,
					editButtonClassName: "edit-clue-button accessible",
				};
			} else {
				return {
					...dataObj,
					isEditing: true,
					editButtonClassName: "edit-clue-button isEditing",
				};
			}
		});
		const newState = { across: newStateAcross, down: newStateDown };

		return newState;
	});
};

export const setClueText = (e, setClueListItemsData) => {
	const value = e.target.value;

	setClueListItemsData((prevState) => {
		const prevStateAcross = prevState.across;
		const prevStateDown = prevState.down;
		const newStateAcross = prevStateAcross.map((dataObj) => {
			const li = e.target.closest(".clue-list-item");
			if (dataObj.name !== li.getAttribute("name")) {
				return dataObj;
			} else {
				return { ...dataObj, clueText: value };
			}
		});
		const newStateDown = prevStateDown.map((dataObj) => {
			if (
				dataObj.name !==
				e.target.closest(".clue-list-item").getAttribute("name")
			) {
				return dataObj;
			} else {
				return { ...dataObj, clueText: value };
			}
		});
		const newState = { across: newStateAcross, down: newStateDown };

		return newState;
	});
};
