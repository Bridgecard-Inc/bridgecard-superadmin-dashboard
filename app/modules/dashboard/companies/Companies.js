import React, { useState, useEffect } from "react";
import CompaniesTable from "./companies-table/CompaniesTable";

export default function Companies() {
	const [filtered, setFiltered] = useState(false);
	const [days, setDays] = useState(1);

	const handleToggle = () => {
		setFiltered(prev => !prev);
	};

	return (
		<React.Fragment>
			<div className="issued-cards-header">
				<h1 className="dashboard-title">Admnistrators</h1>
			</div>
			<div className="table-holder">
				{" "}
				<CompaniesTable />
			</div>
		</React.Fragment>
	);
}
