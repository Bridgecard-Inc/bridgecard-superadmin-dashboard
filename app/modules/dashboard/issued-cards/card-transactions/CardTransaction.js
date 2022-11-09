import React from "react";
import CardTransactionTable from "./CardTransactionsTable";

export const CardTransaction = () => {
	return (
		<React.Fragment>
			<h1 className="dashboard-title">Card Transactions</h1>
			<div className="table-holder">
				{" "}
				<CardTransactionTable />
			</div>
		</React.Fragment>
	);
};
