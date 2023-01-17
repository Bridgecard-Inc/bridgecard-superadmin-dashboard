import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { callApiWithToken } from "../../../utils/callApiWithToken";
import axios from "axios";
import SVG from "react-inlinesvg";
import RequestsTable from "./requests-table/RequestsTable";

export default function Requests() {
	const [filtered, setFiltered] = useState(false);
	const [days, setDays] = useState(1);

	const handleToggle = () => {
		setFiltered(prev => !prev);
	};

	return (
		<React.Fragment>
			<div className="issued-cards-header">
				<h1 className="dashboard-title">Access Requests</h1>
			</div>
			<div className="table-holder">
				{" "}
				<RequestsTable />
			</div>
		</React.Fragment>
	);
}
