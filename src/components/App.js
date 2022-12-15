import React, { Component } from "react";
import "../App.css";
import Cell from "./Cell";
import { getCellCoordinates } from "../utilities/getCellCoordinates.js";
import { Clue } from "./Clue.js";
import { toggleCellBlock } from "../utilities/toggleCellBlock.js";
import { toggleCellBlockSymmetry } from "../utilities/toggleCellBlockSymmetry.js";
import { Checkbox } from "./Checkbox.js";
import { ToggleSwitch } from "./ToggleSwitch.js";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isChecked: true,
		};
		this.handleCellBlockToggle = this.handleCellBlockToggle.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
	}
	// state = {};
	handleCellBlockToggle(e) {
		toggleCellBlock(e);
		toggleCellBlockSymmetry(e);
	}

	handleCheckboxChange() {
		this.setState((state) => ({
			isChecked: !state.isChecked,
		}));
	}
	render() {
		const cells = getCellCoordinates(15).map((coord, index) => {
			return (
				<Cell
					key={`cell-${index + 1}`}
					x={coord.x}
					y={coord.y}
					index={index}
					onRectClick={this.handleCellBlockToggle}
				/>
			);
		});
		return (
			<article className="puzzle">
				<section className="xword-cell-block-section">
					<div className="cell-block-section-content">
						<div className="cell-block-count-container">
							<p className="cell-block-count-p">
								Cell Block Count: <span className="cell-block-count">0</span>
							</p>
						</div>
						<div className="cell-block-toggle-wrapper">
							<input type="checkbox" id="cell-block-toggle-input" />
							<label
								className="cell-block-toggle-label"
								htmlFor="cell-block-toggle-input">
								<div className="cell-block-div"></div>
							</label>
						</div>
						<ToggleSwitch
							toggleSwitchId="symmetry-input"
							text="Symmetry:"
							isChecked={this.state.isChecked}
							handleToggleSwitchChange={this.handleCheckboxChange}
						/>
					</div>
				</section>
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
										vectorEffect="non-scaling-stroke"></path>
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
