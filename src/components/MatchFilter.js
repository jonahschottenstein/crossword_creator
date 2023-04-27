export const MatchFilter = ({ matchFilterInput, onMatchFilterChange }) => {
	return (
		<div className="match-filter-container">
			<input
				className="match-filter"
				value={matchFilterInput}
				onChange={onMatchFilterChange}></input>
		</div>
	);
};
