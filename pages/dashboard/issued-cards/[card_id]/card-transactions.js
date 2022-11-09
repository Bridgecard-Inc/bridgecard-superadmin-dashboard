import React from "react";
import { CardTransaction } from "../../../../app/modules/dashboard/issued-cards/card-transactions/CardTransaction";

import { TableUIProvider } from "../../../../_helpers/TableUIContext";

export default function CardTransactions() {
	return (
		<React.Fragment>
			<TableUIProvider>
				<CardTransaction />
			</TableUIProvider>
		</React.Fragment>
	);
}
