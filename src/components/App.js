import React, { Component } from "react";
import "../App.css";
import Cell from "./Cell";
import { getCellCoordinates } from "../utilities/getCellCoordinates.js";

class App extends Component {
	constructor(props) {
		super(props);
	}
	state = {};
	render() {
		const cells = getCellCoordinates(15).map((coord, index) => {
			return <Cell key={`cell-${index + 1}`} x={coord.x} y={coord.y} />;
		});
		return (
			<div className="svg-container">
				<svg width="100%" height="100%">
					<g>{cells}</g>
				</svg>
			</div>
		);
	}
}

export default App;
