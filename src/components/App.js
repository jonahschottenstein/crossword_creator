import React, { Component } from "react";
import "../App.css";
import Cell from "./Cell";
import { getCellCoordinates } from "../utilities/getCellCoordinates.js";
import { Clue } from "./Clue.js";

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
			<section className="xword-clue-and-board-section">
				<Clue />
				<section className="xword-board-section">
					<div className="xword-board-container">
						<svg className="xword-board" width="100%" height="100%">
							<g>{cells}</g>
						</svg>
					</div>
				</section>
			</section>
		);
	}
}

export default App;
