import React from "react";
import Box from "../../../../utils/Box";
import { Text } from "../../../../utils/primitives";

export function NameColumnFormatter(_cellContent, row, _rowIndex) {
	return (
		<Box className="d-flex align-items-center">
			<Box ml="0">
				<Text
					as="p"
					color="#141416"
					fontSize="12px"
					fontWeight="300"
					m="0"
					fontFamily="GT Walsheim Pro"
				>
					{`${row.first_name} ${row.last_name} `}
				</Text>
			</Box>
		</Box>
	);
}
