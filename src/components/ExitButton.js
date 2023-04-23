export const ExitButton = (props) => {
	return (
		<button
			className="material-icons exit-button"
			name={props.name}
			onClick={props.onClick}>
			close
		</button>
	);
};
