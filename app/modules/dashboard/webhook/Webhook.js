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
			</div>
			<div className="table-holder">
				{" "}
				<WebhookTable />
			</div>
		</React.Fragment>
	);
}
