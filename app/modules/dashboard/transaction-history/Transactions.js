import React from "react";
import TransactionsTable from "./transaction-table/TransactionsTable";

export default function Transactions() {
	return (
		<React.Fragment>
			<h1 className="dashboard-title">Transaction history</h1>
			<div className="table-holder">
				{" "}
				<TransactionsTable />
			</div>
		</React.Fragment>
	);
}
