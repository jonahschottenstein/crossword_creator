import { handleLetterKey } from "../utilities/letters";
import { handleBackspaceKey } from "../utilities/backspace";
import { getSelectedCell } from "../utilities/helpers";

const MobileKeyboardRow = ({
	keys,
	direction,
	setDirection,
	cells,
	setCells,
}) => {
	const handleClick = (e) => {
		const selectedCell = getSelectedCell(cells);

		if (!selectedCell) return;

		handleLetterKey(e, direction, setDirection, cells, setCells);
		handleBackspaceKey(e, direction, setDirection, cells, setCells);
	};

	return (
		<div className="mobile-keyboard-row">
			{keys.map((key) => {
				return (
					<MobileKeyboardKey key={key} keyVal={key} onClick={handleClick} />
				);
			})}
		</div>
	);
};

const MobileKeyboardKey = ({ keyVal, onClick }) => {
	return (
		<button className="mobile-keyboard-key" value={keyVal} onClick={onClick}>
			{keyVal}
		</button>
	);
};

export const MobileKeyboard = ({
	direction,
	setDirection,
	cells,
	setCells,
}) => {
	const rows = [
		["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
		["A", "S", "D", "F", "G", "H", "J", "K", "L"],
		["Z", "X", "C", "V", "B", "N", "M"],
		["Tab", "_", "Backspace"],
	];
	return (
		<div className="mobile-keyboard">
			{rows.map((row, index) => {
				return (
					<MobileKeyboardRow
						key={row + "-" + index}
						keys={row}
						direction={direction}
						setDirection={setDirection}
						cells={cells}
						setCells={setCells}
					/>
				);
			})}
		</div>
	);
};
