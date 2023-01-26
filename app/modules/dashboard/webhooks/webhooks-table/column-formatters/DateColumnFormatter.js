import React from "react";
import { formatEpoch } from "../../../../../../_helpers/functions/formatDate";

export const DateColumnFormatter = cellContent => {
	return (
		<span className={`label label-lg label-inline`}>
			{formatEpoch(cellContent)}
		</span>
	);
};
