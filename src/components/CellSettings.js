import { useCallback, useState } from "react";
import { GridOptions } from "./GridOptions.js";
import { Popup } from "./Popup.js";
import { SubmissionInfo } from "./SubmissionInfo.js";
import { ToggleSwitch } from "./ToggleSwitch.js";

/* export const CellSettings = (props) => {
	return (
		<div className="cell-settings">
			<Popup
				isOpen={props.isOpen.submissionInfoPopup}
				popupClassName="submission-info-popup"
				popupName="submissionInfoPopup"
				openButtonClassName="material-icons open-submission-info-button"
				openButtonText="file_download"
				popupHeading="Submission Info"
				onOpenClick={props.onOpenClick}
				onCloseClick={props.onCloseClick}>
				<SubmissionInfo
					submissionInfo={props.submissionInfo}
					cells={props.cells}
					jsPDF={props.jsPDF}
					onInfoChange={props.onInfoChange}
				/>
			</Popup>
			<Popup
				isOpen={props.isOpen.gridOptionsPopup}
				popupClassName="grid-options-popup"
				popupName="gridOptionsPopup"
				openButtonClassName="material-icons open-grid-options-button"
				openButtonText="grid_on"
				popupHeading="Grid Options"
				onOpenClick={props.onOpenClick}
				onCloseClick={props.onCloseClick}>
				<GridOptions
					gridOptions={props.gridOptions}
					onGridOptionClick={props.onGridOptionClick}
				/>
			</Popup>
			<div className="cell-settings-toggles">
				<ToggleSwitch
					toggleSwitchId="symmetry-input"
					text="Symmetry"
					iconText="balance"
					iconClassName="material-icons"
					name="symmetryIsChecked"
					isChecked={props.cellSettings.symmetryIsChecked}
					onChange={props.onChange}
				/>
				<ToggleSwitch
					toggleSwitchId="cell-block-input"
					text="Cell Block"
					iconText="square"
					iconClassName="material-icons"
					name="cellBlockIsChecked"
					isChecked={props.cellSettings.cellBlockIsChecked}
					onChange={props.onChange}
				/>
				<ToggleSwitch
					toggleSwitchId="shaded-cell-input"
					text="Gray"
					iconText="square"
					iconClassName="material-icons shaded-color"
					name="shadedCellIsChecked"
					isChecked={props.cellSettings.shadedCellIsChecked}
					onChange={props.onChange}
				/>
				<ToggleSwitch
					toggleSwitchId="circle-input"
					text="Circle"
					iconText="circle"
					iconClassName="material-icons-outlined"
					name="circleIsChecked"
					isChecked={props.cellSettings.circleIsChecked}
					onChange={props.onChange}
				/>
			</div>
		</div>
	);
}; */

export const CellSettings = ({ cells, cellSettings, onChange, setCells }) => {
	const [isOpen, setIsOpen] = useState({
		gridOptionsPopup: false,
		submissionInfoPopup: false,
	});

	const handleIsOpen = useCallback((e) => {
		setIsOpen((prevState) => ({ ...prevState, [e.target.name]: true }));
	}, []);
	const handleIsClosed = useCallback((e) => {
		setIsOpen((prevState) => ({ ...prevState, [e.target.name]: false }));
	}, []);

	return (
		<div className="cell-settings">
			<Popup
				isOpen={isOpen.submissionInfoPopup}
				popupClassName="submission-info-popup"
				popupName="submissionInfoPopup"
				openButtonClassName="material-icons open-submission-info-button"
				openButtonText="file_download"
				popupHeading="Submission Info"
				onOpenClick={handleIsOpen}
				onCloseClick={handleIsClosed}>
				<SubmissionInfo cells={cells} />
			</Popup>
			<Popup
				isOpen={isOpen.gridOptionsPopup}
				popupClassName="grid-options-popup"
				popupName="gridOptionsPopup"
				openButtonClassName="material-icons open-grid-options-button"
				openButtonText="grid_on"
				popupHeading="Grid Options"
				onOpenClick={handleIsOpen}
				onCloseClick={handleIsClosed}>
				<GridOptions
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					setCells={setCells}
				/>
			</Popup>
			<div className="cell-settings-toggles">
				<ToggleSwitch
					toggleSwitchId="symmetry-input"
					text="Symmetry"
					iconText="balance"
					iconClassName="material-icons"
					name="symmetryIsChecked"
					isChecked={cellSettings.symmetryIsChecked}
					onChange={onChange}
				/>
				<ToggleSwitch
					toggleSwitchId="cell-block-input"
					text="Cell Block"
					iconText="square"
					iconClassName="material-icons"
					name="cellBlockIsChecked"
					isChecked={cellSettings.cellBlockIsChecked}
					onChange={onChange}
				/>
				<ToggleSwitch
					toggleSwitchId="shaded-cell-input"
					text="Gray"
					iconText="square"
					iconClassName="material-icons shaded-color"
					name="shadedCellIsChecked"
					isChecked={cellSettings.shadedCellIsChecked}
					onChange={onChange}
				/>
				<ToggleSwitch
					toggleSwitchId="circle-input"
					text="Circle"
					iconText="circle"
					iconClassName="material-icons-outlined"
					name="circleIsChecked"
					isChecked={cellSettings.circleIsChecked}
					onChange={onChange}
				/>
			</div>
		</div>
	);
};
