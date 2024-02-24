import { Board } from "./Board";
import { BoardAndSettings } from "./BoardAndSettings";
import { CellSettings } from "./CellSettings";
import { Dashboard } from "./Dashboard";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardHeaderButton } from "./DashboardHeaderButton";
import { DashboardPage } from "./DashboardPage";
import { DashboardPageContainer } from "./DashboardPageContainer";
import { MobileKeyboard } from "./MobileKeyboard";

export const MobileContainerDashboard = ({
	direction,
	setDirection,
	cells,
	setCells,
	visibleDashPages,
	onClick,
	onChange,
	cellSettingsProps,
	boardProps,
	statsProps,
	fillContentProps,
}) => {
	return (
		<Dashboard>
			<DashboardHeader>
				{["board", "dashboard"].map((buttonLabel) => {
					return (
						<DashboardHeaderButton
							key={buttonLabel}
							buttonLabel={buttonLabel}
							labelClassName={`dashboard-header-button-label ${buttonLabel}-button-label`}
							visibleDashPage={visibleDashPages.appContentDash}
							onChange={onChange}
						/>
					);
				})}
			</DashboardHeader>
			<DashboardPageContainer>
				<DashboardPage visibleDashPage={visibleDashPages.appContentDash}>
					{visibleDashPages.appContentDash === "board" ? (
						<>
							<BoardAndSettings>
								<CellSettings
									cells={cells}
									cellSettings={cellSettingsProps.cellSettings}
									onChange={cellSettingsProps.onChange}
									setCells={setCells}
								/>
								<Board
									direction={direction}
									setDirection={setDirection}
									cells={cells}
									setCells={setCells}
									onClick={boardProps.onClick}
								/>
							</BoardAndSettings>
							<MobileKeyboard
								direction={direction}
								setDirection={setDirection}
								cells={cells}
								setCells={setCells}
							/>
						</>
					) : (
						<CrosswordDashboard
							direction={direction}
							cells={cells}
							setCells={setCells}
							visibleDashPage={visibleDashPages.crosswordDash}
							onChange={onChange}
							statsProps={statsProps}
							onClick={onClick}
							fillContentProps={fillContentProps}
						/>
					)}
				</DashboardPage>
			</DashboardPageContainer>
		</Dashboard>
	);
};
