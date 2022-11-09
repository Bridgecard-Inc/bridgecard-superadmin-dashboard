import React from "react";
import Box from "../../../../../utils/Box";

export function ActionsColumnFormatter(_cellContent, row, rowIndex) {
	return (
		<Box>
			{row.is_active ? (
				<div className="status-pill verified">active</div>
			) : (
				<div className="status-pill inactive">inactive</div>
			)}
		</Box>
	);
}
