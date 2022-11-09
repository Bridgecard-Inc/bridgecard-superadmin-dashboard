import React, { useState } from "react";
import AllCardsTable from "./all-cards-table/AllCardsTable";
import CardsTable from "./cards-table/CardsTable";
import SVG from "react-inlinesvg";
import { useAuthContext } from "../../../firebase/AuthContext";

export default function IssuedCards() {
	const [activeState, toggleActiveState] = useState(1);
	const navs = [
		{ id: 1, name: "Card holders" },
		{ id: 3, name: "Issued cards" },
	];
	const toggleActive = index => {
		toggleActiveState(navs[index].id);
	};

	const toggleActiveStyles = index => {
		if (navs[index].id === activeState) {
			return "active-li";
		} else {
			return;
		}
	};

	const context = useAuthContext();
	const { setIsCreateCardHolderModalVisible, setIsCreateNewCardModalVisible } =
		context;
	const openModal = () => {
		setIsCreateCardHolderModalVisible(true);
	};
	return (
		<React.Fragment>
			<div className="issued-cards-header">
				<h1 className="dashboard-title">Issued Cards</h1>

				{activeState === 1 && (
					<button
						className="add-new-btn"
						onClick={activeState === 1 ? openModal : null}
					>
						<SVG src={"../media/svg/cards/plus.svg"} />
						<span>Create card holder</span>
					</button>
				)}
			</div>
			<ul className="table-nav">
				{navs.map((nav, index) => (
					<li
						key={nav.id}
						className={`nav-items ${toggleActiveStyles(index)}`}
						onClick={() => toggleActive(index)}
					>
						{nav.name}
					</li>
				))}
			</ul>
			<div className="table-holder">
				{" "}
				{activeState === 1 ? <CardsTable /> : <AllCardsTable />}
			</div>
		</React.Fragment>
	);
}
