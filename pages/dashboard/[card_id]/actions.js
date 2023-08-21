import React from "react";
import Actions from "../../../app/modules/dashboard/actions/Actions";
import { TableUIProvider } from "../../../_helpers/TableUIContext";

export default function actions() {
	return (
		<React.Fragment>
			<TableUIProvider>
				<Actions />
			</TableUIProvider>
		</React.Fragment>
	);
}
