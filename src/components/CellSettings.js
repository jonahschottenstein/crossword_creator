import { useCallback, useState } from "react";
import { GridOptions } from "./GridOptions.js";
import { Popup } from "./Popup.js";
import { SubmissionInfo } from "./SubmissionInfo.js";
import { ToggleSwitch } from "./ToggleSwitch.js";

export const CellSettings = ({ cells, cellSettings, onChange, setCells }) => {
	// TODO: cell-settings-toggles should probably be its own component, maybe Memo
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
