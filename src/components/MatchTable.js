import { MatchRow } from "./MatchRow";
import { MatchTableFoot } from "./MatchTableFoot";

export const MatchTable = ({ wordMatches, onMatchClick }) => {
	return (
		<div className="match-table-container">
			<table className="match-table">
				<thead>
					<tr>
						<th>Word</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					{wordMatches?.current?.map((wordMatch) => (
						<MatchRow
							key={wordMatch.word}
							wordMatch={wordMatch}
							onMatchClick={onMatchClick}
						/>
					))}
				</tbody>
				{wordMatches?.hasMatchesLeft ? (
					<MatchTableFoot onMatchClick={onMatchClick} />
				) : null}
			</table>
		</div>
	);
};
