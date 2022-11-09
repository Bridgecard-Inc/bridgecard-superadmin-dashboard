import React from "react";
import { WebhookModal } from "../../app/modules/dashboard/modals/webhook/WebhookModal";
import Transactions from "../../app/modules/dashboard/transaction-history/Transactions";
import Webhook from "../../app/modules/dashboard/webhook/Webhook";
import { TableUIProvider } from "../../_helpers/TableUIContext";

export default function TransactionHistory() {
	return (
		<React.Fragment>
			<TableUIProvider>
				<Transactions />
			</TableUIProvider>
		</React.Fragment>
	);
}
