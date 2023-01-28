export const DashboardStatsTable = (props) => {
	return (
		<table className="dashboard-stats-table">
			<tbody>
				<tr>
					<td className="td-label">Size:</td>
					<td className="td-value">{props.gridSize}</td>
				</tr>
				<tr>
					<td className="td-label">Total Words:</td>
					<td className="td-value">{props.totalWordCount}</td>
				</tr>
				<tr>
					<td className="td-label">Black Squares:</td>
					<td className="td-value">{props.blackSquareCount}</td>
				</tr>
				<tr>
					<td className="td-label">Avg. Word Length:</td>
					<td className="td-value">{props.avgWordLength}</td>
				</tr>
				<tr>
					<td className="td-label">Scrabble score:</td>
					<td className="td-value">{props.scrabbleScore}</td>
				</tr>
				<tr>
					<td className="td-label">Pangram:</td>
					<td className="td-value">{props.pangram}</td>
				</tr>
			</tbody>
		</table>
	);
};
