import React from "react";
import { RequestsModal } from "../../app/modules/dashboard/modals/requests/RequestsModal";
import Requests from "../../app/modules/dashboard/requests/Requests";

import { TableUIProvider } from "../../_helpers/TableUIContext";

export default function webhooks() {
	return (
		<React.Fragment>
			<TableUIProvider>
				<Requests />
			</TableUIProvider>
			<RequestsModal />
		</React.Fragment>
	);
}
