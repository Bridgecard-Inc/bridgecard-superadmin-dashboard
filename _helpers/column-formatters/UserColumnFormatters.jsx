import React from "react"
import Box from "../../app/styled-components/Box"
import { Text } from "../../app/styled-components/primitives"

export function UserColumnFormatter(_cellContent, row, _rowIndex) {
  return (
    <Box className="d-flex align-items-center" mr="15px">
      <Box ml="0">
        <Text as="p" color="#002E5A" fontSize="16px" fontWeight="300" m="0" fontFamily='GT Walsheim Pro'>
          {row.name}
        </Text>
      </Box>
    </Box>
  )
}
