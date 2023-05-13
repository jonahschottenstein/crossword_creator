import { useCallback, useState } from "react";
import { getPDF } from "../utilities/getPDF";
import { SubmissionInfoItem } from "./SubmissionInfoItem";

const styleHyphenFormat = (propertyName) => {
	const upperToHyphenLower = (match, offset) => {
		return (offset > 0 ? "-" : "") + match.toLowerCase();
	};

	return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
};

const styleTitleFormat = (hyphenatedName) => {
	const capitalize = (match) => {
		return match.charAt(0).toUpperCase() + match.slice(1);
	};

	return hyphenatedName.replace(/\w+/g, capitalize).replace("-", " ");
};

export const SubmissionInfo = ({ cells }) => {
	const [submissionInfo, setSubmissionInfo] = useState({
		firstName: "",
		lastName: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
		email: "",
		puzzleTitle: "",
	});

	const { jsPDF } = window.jspdf;
	const submissionInfoKeys = Object.keys(submissionInfo);

	const handleInfoChange = useCallback((e) => {
		setSubmissionInfo((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	}, []);

	return (
		<div className="submission-info">
			{submissionInfoKeys.map((key) => {
				const hyphenatedName = styleHyphenFormat(key);
				const labelText = styleTitleFormat(hyphenatedName);

				return (
					<SubmissionInfoItem
						key={key}
						labelFor={hyphenatedName}
						labelText={labelText}
						type={key === "email" ? "email" : "text"}
						name={key}
						id={hyphenatedName}
						value={submissionInfo[key]}
						onChange={handleInfoChange}
					/>
				);
			})}
			<button
				className="submit-info-button"
				onClick={() => getPDF(jsPDF, cells, submissionInfo)}>
				Download
			</button>
		</div>
	);
};
