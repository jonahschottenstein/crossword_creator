import { memo } from "react";
import {
	handleClueDoneButtonClick,
	handleClueEditButtonClick,
	handleClueTextarea,
	handleClueTextareaFocus,
	handleEnterKeyDown,
} from "../utilities/handleClueLi";

export const ClueListItem = memo(function ClueListItem(props) {
	return (
		<li className={props.className} name={props.name}>
			<span className="clue-label">{props.clueLabel}</span>
			<span className="clue-textarea-wrapper">
				<textarea
					className="clue-textarea"
					name={`${props.name}-textarea`}
					value={props.clueText}
					onChange={(e) => handleClueTextarea(e, props.setCells)}
					onFocus={(e) => handleClueTextareaFocus(e, props.setActiveTextarea)}
					onKeyDown={(e) => handleEnterKeyDown(e, props.setActiveTextarea)}
					maxLength="240"></textarea>

				{`${props.name}-textarea` === props.activeTextarea ? (
					<button
						className="material-icons clue-done-button accessible"
						onClick={(e) =>
							handleClueDoneButtonClick(e, props.setActiveTextarea)
						}>
						done
					</button>
				) : (
					<button
						className="material-icons edit-clue-button accessible"
						name={`${props.name}-edit-button`}
						onClick={handleClueEditButtonClick}>
						edit
					</button>
				)}
			</span>
		</li>
	);
});
