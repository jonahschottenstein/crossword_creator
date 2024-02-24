import { ClueListsContainer } from "./ClueListsContainer";
import { Dashboard } from "./Dashboard";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardHeaderButton } from "./DashboardHeaderButton";
import { DashboardPage, FillContent } from "./DashboardPage";
import { DashboardPageContainer } from "./DashboardPageContainer";
import { DashboardStatsTable } from "./DashboardStatsTable";

export const CrosswordDashboard = ({
	direction,
	cells,
	setCells,
	visibleDashPage,
	onChange,
	statsProps,
	onClick,
	fillContentProps,
}) => {
	return (
		<Dashboard>
			<DashboardHeader>
				{["stats", "clues", "fill"].map((buttonLabel) => {
					return (
						<DashboardHeaderButton
							key={buttonLabel}
							buttonLabel={buttonLabel}
							labelClassName={`dashboard-header-button-label ${buttonLabel}-button-label`}
							visibleDashPage={visibleDashPage}
							onChange={onChange}
						/>
					);
				})}
			</DashboardHeader>
			<DashboardPageContainer>
				<DashboardPage visibleDashPage={visibleDashPage}>
					{visibleDashPage === "stats" ? (
						<DashboardStatsTable
							gridSize={statsProps.gridSize}
							totalWordCount={statsProps.totalWordCount}
							blackSquareCount={statsProps.blackSquareCount}
							avgWordLength={statsProps.avgWordLength}
							scrabbleScore={statsProps.scrabbleScore}
							pangram={statsProps.pangram}
						/>
					) : visibleDashPage === "clues" ? (
						<ClueListsContainer
							direction={direction}
							cells={cells}
							setCells={setCells}
							onClick={onClick}
						/>
					) : (
						<FillContent
							direction={direction}
							cells={cells}
							matchFilterInput={fillContentProps.matchFilterInput}
							wordMatches={fillContentProps.wordMatches}
							onAutofillGridButtonClick={
								fillContentProps.onAutofillGridButtonClick
							}
							onClearFillButtonClick={fillContentProps.onClearFillButtonClick}
							onMatchFilterChange={fillContentProps.onMatchFilterChange}
							onMatchClick={fillContentProps.onMatchClick}
						/>
					)}
				</DashboardPage>
			</DashboardPageContainer>
		</Dashboard>
	);
};
