import React, { useState } from "react";
import Profile from "../components/Profile";
import { Api } from "./Api";

export const Settings = () => {
	const [activeState, toggleActiveState] = useState(1);
	const navs = [
		{ id: 1, name: "Topup Admin" },
		{ id: 3, name: "Debit Admin" },
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
