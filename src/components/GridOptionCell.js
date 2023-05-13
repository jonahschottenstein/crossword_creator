export const GridOptionCell = ({ id, className, index, number, letter }) => {
	return (
		<div id={id} className={className} data-index={index}>
			<div className="grid-option-number">{number}</div>
			<div className="grid-option-letter">{letter}</div>
		</div>
	);
};
