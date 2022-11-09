import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { callApiWithToken } from "../../../utils/callApiWithToken";
import axios from "axios";
import SVG from "react-inlinesvg";
import WebhookTable from "./webhook-table/WebhookTable";
import { NoWebhook } from "./webhook-table/NoWebhook";

export default function Webhook() {
	const [filtered, setFiltered] = useState(false);
	const [days, setDays] = useState(1);

	const handleToggle = () => {
		setFiltered(prev => !prev);
	};

	return (
		<React.Fragment>
			<div className="issued-cards-header">
				<h1 className="dashboard-title">Webhook Events</h1>

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
			<div className="table-holder">
				{" "}
				<WebhookTable days={days} />
			</div>
		</React.Fragment>
	);
}
