//? Would this be an appropriate time to use try...catch?
const getCellLabel = (cell, direction) => {
	if (cell.isBlackSquare) return undefined;
	if (cell.number === null) return undefined;
	const dir = direction.toLowerCase();
	if (dir !== "across" && dir !== "down") return undefined;
	if (dir === "across" && !cell.across) return undefined;
	if (dir === "down" && !cell.down) return undefined;

	return `${cell.number}-${dir}`;
};

export const setClueText = (e, setCells) => {
	setCells((prevState) => {
		const newState = prevState.map((cell) => {
			if (!cell.number) {
				return { ...cell, clueText: { across: undefined, down: undefined } };
			}

			if (e.target.matches(".clue-textarea")) {
				const liLabel = e.target
					.closest(".clue-list-item")
					.getAttribute("name");
				const clueDirection = liLabel.match(/\w+$/)[0];
				const cellLabel = getCellLabel(cell, clueDirection);
				if (cellLabel === liLabel) {
					const newClueText = {
						...cell.clueText,
						[clueDirection]: e.target.value,
					};

					return { ...cell, clueText: newClueText };
				}
			}

			const clueTextAcross =
				cell.across && cell.clueText.across === undefined
					? ""
					: cell.clueText.across;
			const clueTextDown =
				cell.down && cell.clueText.down === undefined ? "" : cell.clueText.down;

			return {
				...cell,
				clueText: { across: clueTextAcross, down: clueTextDown },
			};
		});

		return newState;
	});
};
