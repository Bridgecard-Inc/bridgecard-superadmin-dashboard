import React, { useMemo, useEffect, useState, useId } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import * as uiHelpers from "../../../../../_helpers/TableUIHelpers";
import paginationFactory, {
	PaginationProvider,
} from "react-bootstrap-table2-paginator";

import {
	getHandlerTableChange,
	NoRecordsFoundMessage,
	PleaseWaitMessage,
} from "../../../../../_helpers/TablePaginationHelpers";
import { Pagination } from "../../../../../_helpers/pagination/index";
import { useTableUIContext } from "../../../../../_helpers/TableUIContext";
import { useSelector } from "react-redux";
import axios from "axios";
import { DateColumnFormatter } from "./column-formatters/DateColumnFormatter";
import Box from "../../../../utils/Box";
import { Text } from "../../../../utils/primitives";
import { auth } from "../../../../firebase/firebase";
import { callApiWithToken } from "../../../../utils/callApiWithToken";
import { useAuthContext } from "../../../../firebase/AuthContext";

export default function TransactionsTable() {
	const [loading, setLoading] = useState(false);
	const [totalCount, setTotalCount] = useState(0);
	const [transactions, setTransactions] = useState(null);
	const { environment } = useSelector(state => state.app);
	const tableUIContext = useTableUIContext();
	const tableUIProps = useMemo(() => {
		return {
			ids: tableUIContext.ids,
			setIds: tableUIContext.setIds,
			queryParams: tableUIContext.queryParams,
			setQueryParams: tableUIContext.setQueryParams,
		};
	}, [tableUIContext]);

	const context = useAuthContext();
	const { setTransactionRow, setIsTransactionsModalVisible, userId } = context;

	const openModal = row => {
		setIsTransactionsModalVisible(true);
		setTransactionRow(row);
	};

	function TypeColumnFormatter(cellContent, row, _rowIndex) {
		return (
			<Box
				className="d-flex align-items-center justify-content-center"
				backgroundColor={row.type === "DEBIT" ? "#FFEBEC" : "#effbf5"}
				height="20px"
				padding="0px 20px"
				borderRadius="10px"
				width="80px"
			>
				<Box ml="0">
					<Text
						as="p"
						color={row.type === "DEBIT" ? "red" : "green"}
						fontSize="14px"
						fontWeight="300"
						m="0"
						fontFamily="GT Walsheim Pro"
					>
						{cellContent}
					</Text>
				</Box>
			</Box>
		);
	}

	function TimeColumnFormatter(_cellContent, row, _rowIndex) {
		return (
			<Box className="d-flex align-items-center">
				<Box ml="0">
					<Text
						as="p"
						fontSize="12px"
						fontWeight="300"
						m="0"
						fontFamily="GT Walsheim Pro"
					>
						{row.response_time.toFixed(2)} secs
					</Text>
				</Box>
			</Box>
		);
	}

	function ViewColumnFormatter(cellContent, row, _rowIndex) {
		return (
			<Box className="d-flex align-items-center pointer">
				<Box ml="0">
					<Text
						as="p"
						color={"#AA8401"}
						fontSize="14px"
						fontWeight="500"
						m="0"
						fontFamily="GT Walsheim Pro"
					>
						${cellContent / 100}
					</Text>
				</Box>
			</Box>
		);
	}

	const columns = [
		{
			dataField: "amount",
			text: "Amount",
			formatter: ViewColumnFormatter,
			style: {
				minWidth: "150px",
			},
		},
		{
			dataField: "created_at",
			text: "Date",
			formatter: DateColumnFormatter,
			style: {
				minWidth: "200px",
			},
		},
		{
			dataField: "type",
			text: "Type",
			formatter: TypeColumnFormatter,
		},

		{
			dataField: "description",
			text: "Description",
			style: {
				minWidth: "200px",
			},
		},
	];
	const paginationOptions = {
		custom: true,
		totalSize: totalCount,
		sizePerPage: 20,
		page: tableUIProps.queryParams.pageNumber,
	};

	const fetchTransactions = async (id, token) => {
		setLoading(true);
		try {
			const res = await axios.get(
				`admin/${id}/issuing-transactions/USD/${environment}?page=${tableUIProps.queryParams.pageNumber}`,
				{
					headers: {
						token: `Bearer ${token}`,
					},
				}
			);
			setTransactions(res.data.data);
			setTotalCount(res.data.meta.total);
		} catch (err) {
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const fetchData = () => {
			const unsubscribe = auth.onAuthStateChanged(user => {
				if (user !== null) {
					user.getIdToken().then(idToken => {
						fetchTransactions(user.uid, idToken);
					});
				}
			});
		};

		callApiWithToken(fetchData);
	}, [tableUIProps.queryParams.pageNumber, environment]);

	return (
		<React.Fragment>
			<PaginationProvider pagination={paginationFactory(paginationOptions)}>
				{({ paginationProps, paginationTableProps }) => {
					return (
						<Pagination isLoading={loading} paginationProps={paginationProps}>
							<div className="table-responsive table-wrapper-scroll-y custom-scrollbar">
								<BootstrapTable
									wrapperClasses="table-responsive "
									classes="table table-head-custom table-vertical-center overflow-hidden table-head-solid"
									bootstrap4
									bordered={false}
									remote
									keyField={"id"}
									data={transactions === null ? [] : transactions}
									columns={columns}
									defaultSorted={uiHelpers.defaultSorted}
									onTableChange={getHandlerTableChange(
										tableUIProps.setQueryParams
									)}
									{...paginationTableProps}
								/>
								<PleaseWaitMessage
									entities={transactions}
									isLoading={loading}
								/>
								<NoRecordsFoundMessage
									entities={transactions}
									isLoading={loading}
								/>
							</div>
						</Pagination>
					);
				}}
			</PaginationProvider>
		</React.Fragment>
	);
}
