export const MatchRow = ({ wordMatch, onMatchClick }) => {
	return (
		<tr onClick={onMatchClick}>
			<td className="word-match-td">{wordMatch.word}</td>
			<td className="word-score-td">{wordMatch.score}</td>
		</tr>
	);
};
