import React from "react"
import Box from "../../app/styled-components/Box"
import { Dropdown, Menu } from "antd"

export function ActionsColumnFormatter(
  _cellContent,
  row,
  rowIndex,
  { openNotificationModal, setUser, deleteUser }
) {
  const actions = (
    <Menu className="dropdown">
      <Menu.Item key="2" className="dropdown-menu">
        <p>View Profile</p>
      </Menu.Item>
      <Menu.Item key="3" className="dropdown-menu">
        <p>Transactions</p>
      </Menu.Item>
      <Menu.Item
        key="4"
        className="dropdown-menu"
        onClick={() => {
          setUser(row.id)
        }}
      >
        <p>Add Test User</p>
      </Menu.Item>
      <Menu.Item
        key="5"
        className="dropdown-menu"
        onClick={() => {
          deleteUser(row.id)
        }}
      >
        <p>Delete User</p>
      </Menu.Item>
    </Menu>
  )

  return (
    <Box className=" pr-0 text-right pointer">
      <Dropdown overlay={actions} placement={"bottomRight"} trigger={["click"]}>
        <span>
          <i className="las la-ellipsis-v la-2x"></i>
        </span>
      </Dropdown>
    </Box>
  )
}
