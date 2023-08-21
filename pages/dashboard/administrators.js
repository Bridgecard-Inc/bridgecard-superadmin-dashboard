import React from "react";
import Companies from "../../app/modules/dashboard/companies/Companies";
import { TableUIProvider } from "../../_helpers/TableUIContext";

export default function administrators() {
	return (
		<React.Fragment>
			<TableUIProvider>
				<Companies />
			</TableUIProvider>
		</React.Fragment>
	);
}
