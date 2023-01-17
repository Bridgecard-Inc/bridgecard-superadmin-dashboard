import React from "react";
import { WebhookModal } from "../../app/modules/dashboard/modals/webhook/WebhookModal";
import Requests from "../../app/modules/dashboard/requests/Requests";

import { TableUIProvider } from "../../_helpers/TableUIContext";

export default function webhooks() {
	return (
		<React.Fragment>
			<TableUIProvider>
				<Requests />
			</TableUIProvider>
			<WebhookModal />
		</React.Fragment>
	);
}
