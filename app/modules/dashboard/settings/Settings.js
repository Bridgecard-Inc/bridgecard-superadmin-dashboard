import React, { useState } from "react";
import Profile from "../components/Profile";
import { Api } from "./Api";
import BankDetails from "./BankDetails";
import { Teams } from "./Teams";

export const Settings = () => {
	const [activeState, toggleActiveState] = useState(1);
	const navs = [
		{ id: 1, name: "Profile" },
		{ id: 3, name: "Api" },
		{ id: 2, name: "Bank Details" },
		{ id: 4, name: "Teams" },
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

	const compToReturn = () => {
		if (activeState === 1) {
			return <Profile />;
		} else if (activeState === 3) {
			return <Api />;
		} else if (activeState === 2) {
			return <BankDetails />;
		} else if (activeState === 4) {
			return <Teams />;
		}
	};

	return (
		<React.Fragment>
			<h1 className="dashboard-title">Settings</h1>
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
			{compToReturn()}
		</React.Fragment>
	);
};
