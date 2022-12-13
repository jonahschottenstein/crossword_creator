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
			<article className="puzzle">
				<section className="xword-clue-and-board-section">
					<Clue />
					<section className="xword-board-section">
						<div className="xword-board-container">
							<svg className="xword-board" viewBox="0 0 501 501">
								<g data-group="cells">{cells}</g>
								<g data-group="grid">
									<path
										d="M3.00,36.00 l495.00,0.00 M3.00,69.00 l495.00,0.00 M3.00,102.00 l495.00,0.00 M3.00,135.00 l495.00,0.00 M3.00,168.00 l495.00,0.00 M3.00,201.00 l495.00,0.00 M3.00,234.00 l495.00,0.00 M3.00,267.00 l495.00,0.00 M3.00,300.00 l495.00,0.00 M3.00,333.00 l495.00,0.00 M3.00,366.00 l495.00,0.00 M3.00,399.00 l495.00,0.00 M3.00,432.00 l495.00,0.00 M3.00,465.00 l495.00,0.00 M36.00,3.00 l0.00,495.00 M69.00,3.00 l0.00,495.00 M102.00,3.00 l0.00,495.00 M135.00,3.00 l0.00,495.00 M168.00,3.00 l0.00,495.00 M201.00,3.00 l0.00,495.00 M234.00,3.00 l0.00,495.00 M267.00,3.00 l0.00,495.00 M300.00,3.00 l0.00,495.00 M333.00,3.00 l0.00,495.00 M366.00,3.00 l0.00,495.00 M399.00,3.00 l0.00,495.00 M432.00,3.00 l0.00,495.00 M465.00,3.00 l0.00,495.00"
										stroke="dimgray"
										vector-effect="non-scaling-stroke"></path>
									<rect
										x="1.5"
										y="1.5"
										width="498"
										height="498"
										stroke="black"
										strokeWidth="3"
										fill="none"></rect>
								</g>
							</svg>
						</div>
					</section>
				</section>
			</article>
		);
	}
}

export default App;
