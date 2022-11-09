import React, { createContext, useContext, useState, useCallback } from 'react'
import { isEqual, isFunction } from 'lodash'
import { initialFilter } from './TableUIHelpers'

const TableUIContext = createContext()

export function useTableUIContext() {
  return useContext(TableUIContext)
}

export function TableUIProvider({ children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter)
  const [ids, setIds] = useState([])
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams)
      }
      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams
      }
      return nextQueryParams
    })
  }, [])

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
  }

  return (
    <TableUIContext.Provider value={value}>{children}</TableUIContext.Provider>
  )
}
