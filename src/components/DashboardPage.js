import { getWordObj } from "../utilities/words";
import { DisplayWord } from "./DisplayWord";
import { MatchFilter } from "./MatchFilter";
import { MatchTable } from "./MatchTable";

// TODO: Remember to create files for Buttton and FillContent

// TODO: Remember to use Button component in other files
export const Button = (props) => {
	return (
		<button
			id={props.id ?? null}
			className={props.className ?? null}
			name={props.name ?? null}
			onClick={props.onClick}>
			{props.children}
		</button>
	);
};

export const FillContent = (props) => {
	const selectedWord = getWordObj(props.direction, props.cells).selectedWordObj
		?.word;
	const MIN_WORD_LENGTH = 3;

	return (
		<>
			<Button id="clear-fill-button" onClick={props.onClearFillButtonClick}>
				Clear Fill
			</Button>
			<Button
				id="autofill-grid-button"
				onClick={props.onAutofillGridButtonClick}>
				Autofill Grid
			</Button>

			{!selectedWord || selectedWord.length < MIN_WORD_LENGTH ? (
				<p>{"Select an entry greater than two characters to view matches"}</p>
			) : (
				<>
					<DisplayWord direction={props.direction} cells={props.cells} />
					<MatchFilter
						matchFilterInput={props.matchFilterInput}
						onMatchFilterChange={props.onMatchFilterChange}
					/>
					<MatchTable
						wordMatches={props.wordMatches}
						onMatchClick={props.onMatchClick}
					/>
				</>
			)}
		</>
	);
};

export const DashboardPage = ({ visibleDashPage, children }) => {
	return (
		<div className={`dashboard-page ${visibleDashPage}-page`}>{children}</div>
	);
};

/* 
	conditions:
		- selected word:
			- does not exist
			- length < 3
			- is empty
			- is filled
			- is partially filled (matchable)
		- list:
			- visible matches:
				- exist
				- don't exist
			- more matches:
				- exist
				- don't exist

 */
