export const MatchFilter = ({ matchFilterInput, onMatchFilterChange }) => {
	return (
		<div className="match-filter-container">
			<label htmlFor="match-filter-input">Regular Expression Filter</label>
			<input
				id="match-filter-input"
				className="match-filter"
				value={matchFilterInput}
				onChange={onMatchFilterChange}></input>
		</div>
	);
};
