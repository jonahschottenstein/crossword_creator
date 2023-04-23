import { ExitButton } from "./ExitButton";

export const Popup = (props) => {
	const overlayClassName = props.isOpen ? "overlay" : "overlay display-none";
	const popupClassName =
		props.popupClassName && props.popupClassName !== "popup"
			? `popup ${props.popupClassName}`
			: "popup";
	return (
		<div className="popup-wrapper" name={props.popupName}>
			<button
				className={props.openButtonClassName}
				name={props.popupName}
				onClick={props.onOpenClick}>
				{props.openPopupButtonText}
			</button>
			<div className={overlayClassName}>
				<div className={popupClassName}>
					<ExitButton name={props.popupName} onClick={props.onCloseClick} />
					<h2>{props.popupHeading}</h2>
					<div className="popup-content">{props.children}</div>
				</div>
			</div>
		</div>
	);
};
