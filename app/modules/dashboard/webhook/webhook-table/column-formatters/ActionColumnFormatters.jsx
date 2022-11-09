import React from "react";
import Box from "../../../../../utils/Box";

export function ActionsColumnFormatter(
	_cellContent,
	row,
	rowIndex,
	{ openModal }
) {
	return (
		<Box>
			{row.response_status_code === 200 ? (
				<button
					className="status-btn success"
					onClick={() => {
						openModal(row);
					}}
					data-toggle="tooltip"
					data-placement="bottom"
					title="View details"
				>
					Successful
				</button>
			) : (
				<button
					className="status-btn failed"
					onClick={() => {
						openModal(row);
					}}
					data-toggle="tooltip"
					data-placement="bottom"
					title="View details"
				>
					Failed
				</button>
			)}
		</Box>
	);
}
