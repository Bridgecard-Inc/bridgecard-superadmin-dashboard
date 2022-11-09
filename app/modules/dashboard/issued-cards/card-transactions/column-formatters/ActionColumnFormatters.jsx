import React from "react";
import Box from "../../../../../utils/Box";

export function ActionsColumnFormatter(cellContent, row, rowIndex) {
	return (
		<Box>
			{row.card_transaction_type === "CREDIT" ? (
				<div className="status-pill verified">{cellContent}</div>
			) : (
				<div className="status-pill inactive">{cellContent}</div>
			)}
		</Box>
	);
}
