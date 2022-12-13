import React, { Component } from "react";
import "../App.css";
import Cell from "./Cell";

class App extends Component {
	constructor(props) {
		super(props);
	}
	state = {};
	render() {
		return (
			<div className="svg-container">
				<svg width="100%" height="100%">
					<g>
						<Cell />
					</g>
				</svg>
			</div>
		);
	}
}

export default App;
