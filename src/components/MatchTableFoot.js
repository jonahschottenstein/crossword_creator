export const MatchTableFoot = ({ onMatchClick }) => {
	return (
		<tfoot className="match-table-foot">
			<tr>
				<td>
					<button className="show-more-button" onClick={onMatchClick}>
						Show more
					</button>
				</td>
			</tr>
		</tfoot>
	);
};
