import { getPDF } from "../utilities/getPDF";
import { PersonalInfoItem } from "./PersonalInfoItem";

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

export const PersonalInfo = (props) => {
	const personalInfoKeys = Object.keys(props.personalInfo);

	return (
		<div className="personal-info">
			{personalInfoKeys.map((key) => {
				const hyphenatedName = styleHyphenFormat(key);
				const labelText = styleTitleFormat(hyphenatedName);

				return (
					<PersonalInfoItem
						key={key}
						labelFor={hyphenatedName}
						labelText={labelText}
						type="text"
						name={key}
						id={hyphenatedName}
						value={props.personalInfo[key]}
						onChange={props.onChange}
					/>
				);
			})}
			<button
				className="submit-info-button"
				onClick={() => getPDF(props.jsPDF, props.cells, props.personalInfo)}>
				Download
			</button>
		</div>
	);
};
