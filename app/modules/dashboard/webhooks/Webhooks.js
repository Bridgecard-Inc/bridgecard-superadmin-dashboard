import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { callApiWithToken } from "../../../utils/callApiWithToken";
import axios from "axios";
import SVG from "react-inlinesvg";
import RequestsTable from "./webhooks-table/WebhooksTable";

export default function Webhooks() {
	const [filtered, setFiltered] = useState(false);
	const [days, setDays] = useState(1);

	const handleToggle = () => {
		setFiltered(prev => !prev);
	};

	return (
		<React.Fragment>
			<div className="issued-cards-header">
				<h1 className="dashboard-title">Clients Webhooks</h1>
			</div>
			<div className="table-holder">
				{" "}
				<RequestsTable />
			</div>
		</React.Fragment>
	);
}
