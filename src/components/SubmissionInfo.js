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

export const SubmissionInfo = (props) => {
	const submissionInfoKeys = Object.keys(props.submissionInfo);

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
						value={props.submissionInfo[key]}
						onChange={props.onChange}
					/>
				);
			})}
			<button
				className="submit-info-button"
				onClick={() => getPDF(props.jsPDF, props.cells, props.submissionInfo)}>
				Download
			</button>
		</div>
	);
};
