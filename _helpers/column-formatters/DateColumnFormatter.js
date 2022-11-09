import React from "react"
import { formatEpoch } from "../functions/formatDate"

export const DateColumnFormatter = (cellContent) => {
  return (
    <span className={`label label-lg label-inline`}>
      {formatEpoch(cellContent)}
    </span>
  )
}
