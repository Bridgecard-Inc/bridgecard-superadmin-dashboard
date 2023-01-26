import React from "react";
import Webhooks from "../../app/modules/dashboard/webhooks/Webhooks";
import { TableUIProvider } from "../../_helpers/TableUIContext";

export default function webhooks() {
	return (
		<React.Fragment>
			<TableUIProvider>
				<Webhooks />
			</TableUIProvider>
		</React.Fragment>
	);
}
