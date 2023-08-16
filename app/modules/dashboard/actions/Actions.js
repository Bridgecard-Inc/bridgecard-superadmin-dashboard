import React, { useState } from "react";

import SVG from "react-inlinesvg";
import { useAuthContext } from "../../../firebase/AuthContext";
import ClientLogsTable from "./ClientLogsTable";
import ClientsWebhooksTable from "./ClientsWebhooksTable";

export default function Actions() {
	const [activeState, toggleActiveState] = useState(1);
	const [filtered, setFiltered] = useState(false);
	const [days, setDays] = useState(1);

	const handleToggle = () => {
		setFiltered(prev => !prev);
	};

	const navs = [
		{ id: 1, name: "Webhooks" },
		{ id: 3, name: "Client Logs" },
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

	// const context = useAuthContext();
	// const { setIsCreateCardHolderModalVisible, setIsCreateNewCardModalVisible } =
	// 	context;
	// const openModal = () => {
	// 	setIsCreateCardHolderModalVisible(true);
	// };
	return (
		<React.Fragment>
			<div className="issued-cards-header">
				<h1 className="dashboard-title">Administrators Details</h1>

				<div className="tranc-filter" onClick={handleToggle}>
					<div className="filter-div">
						<SVG src={"../media/svg/filter.svg"} />
						<p>Filter</p>
					</div>
					{filtered && (
						<div className="filters">
							<div
								className={days === 1 ? "active-tranc" : null}
								onClick={() => setDays(1)}
							>
								Today
							</div>
							<div
								className={days === 7 ? "active-tranc-2" : null}
								onClick={() => setDays(7)}
							>
								Last 7 days
							</div>
							<div
								className={days === 30 ? "active-tranc-2" : null}
								onClick={() => setDays(30)}
							>
								Last 30 days
							</div>
						</div>
					)}
				</div>
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
				{activeState === 1 ? (
					<ClientLogsTable days={days} />
				) : (
					<ClientsWebhooksTable days={days} />
				)}
			</div>
		</React.Fragment>
	);
}
