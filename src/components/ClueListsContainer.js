import { ClueList } from "./ClueList.js";

const getClueNumbers = (cells, direction) => {
	return cells
		.filter((cell) => !cell.isBlackSquare && cell[direction])
		.map((cell) => cell.number);
};

export const ClueListsContainer = (props) => {
	const [activeTextarea, setActiveTextarea] = useState(null);

	useEffect(() => {
		const handleBlurOnClick = (e) => {
			if (!activeTextarea) return;
			const textarea = document.querySelector(
				`.clue-textarea[name="${activeTextarea}"]`
			);
			const li = textarea.closest(".clue-list-item");
			const liName = li.getAttribute("name");
			const liSelector = `.clue-list-item[name="${liName}"]`;

			if (e.target.matches(`${liSelector}, ${liSelector} *`)) return;

			setActiveTextarea(null);
			textarea.classList.remove("accessible");
		};
		const handleTextareasOnResize = () => {
			const textareas = document.querySelectorAll(".clue-textarea");
			textareas.forEach((textarea) => {
				autoExpand(textarea);
			});
		};
		document.addEventListener("click", handleBlurOnClick);
		window.addEventListener("resize", handleTextareasOnResize);

		return () => {
			document.removeEventListener("click", handleBlurOnClick);
			window.removeEventListener("resize", handleTextareasOnResize);
		};
	});
	return (
		<div className="clue-lists-container">
			<ClueList
				direction={props.direction}
				listDirection="across"
				cells={props.cells}
				clueNumbers={getClueNumbers(props.cells, "across")}
				onClick={props.onClick}
				onClueLiTextareaChange={props.onClueLiTextareaChange}
				onClueEditButtonClick={props.onClueEditButtonClick}
				onClueDoneButtonClick={props.onClueDoneButtonClick}
				onKeyDown={props.onKeyDown}
				onClueTextareaFocus={props.onClueTextareaFocus}
				onClueTextareaBlur={props.onClueTextareaBlur}
				activeTextarea={props.activeTextarea}></ClueList>

			<ClueList
				direction={props.direction}
				listDirection="down"
				cells={props.cells}
				clueNumbers={getClueNumbers(props.cells, "down")}
				onClick={props.onClick}
				onClueLiTextareaChange={props.onClueLiTextareaChange}
				onClueEditButtonClick={props.onClueEditButtonClick}
				onClueDoneButtonClick={props.onClueDoneButtonClick}
				onKeyDown={props.onKeyDown}
				onClueTextareaFocus={props.onClueTextareaFocus}
				onClueTextareaBlur={props.onClueTextareaBlur}
				activeTextarea={props.activeTextarea}></ClueList>
		</div>
	);
};
