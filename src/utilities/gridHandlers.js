import { clearFill } from "./clearFill";
import { initAutofillGrid } from "./autofillGrid";

export const handleClearFill = (setCells) => {
	clearFill(setCells);
};

export const handleFillGrid = async (cells, setCells, setIsAutofilling) => {
	await initAutofillGrid(cells, setCells, setIsAutofilling);
};
