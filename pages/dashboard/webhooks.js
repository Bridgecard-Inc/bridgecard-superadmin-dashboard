import React from "react";
import { WebhookModal } from "../../app/modules/dashboard/modals/webhook/WebhookModal";
import Webhook from "../../app/modules/dashboard/webhook/Webhook";
import { TableUIProvider } from "../../_helpers/TableUIContext";

export default function webhooks() {
	return (
		<React.Fragment>
			<TableUIProvider>
				<Webhook />
			</TableUIProvider>
			<WebhookModal />
		</React.Fragment>
	);
}
