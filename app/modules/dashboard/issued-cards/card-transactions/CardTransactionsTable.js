import React, { useMemo, useEffect, useState } from "react";
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
import { ActionsColumnFormatter } from "./column-formatters/ActionColumnFormatters";
import { DateColumnFormatter } from "./column-formatters/DateColumnFormatter";
import axios from "axios";
import Box from "../../../../utils/Box";
import { Text } from "../../../../utils/primitives";
import { useRouter } from "next/router";
import SVG from "react-inlinesvg";

export default function CardTransactionTable() {
	const [loading, setLoading] = useState(false);
	const [totalCount, setTotalCount] = useState(0);
	const [cardTransactions, setCardTransactions] = useState(null);
	const { admindetails, environment } = useSelector(state => state.app);

	const tableUIContext = useTableUIContext();
	const tableUIProps = useMemo(() => {
		return {
			ids: tableUIContext.ids,
			setIds: tableUIContext.setIds,
			queryParams: tableUIContext.queryParams,
			setQueryParams: tableUIContext.setQueryParams,
		};
	}, [tableUIContext]);

	const router = useRouter();
	const card_id = router?.query?.card_id;

	// const context = useAuthContext();
	// const {
	// 	setCardRow,
	// 	setIsCardHolderModalVisible,
	// 	setIsCreateNewCardModalVisible,
	// 	setIsEditCardHolderModalVisible,
	// 	setIsDeleteCardHolderModalVisible,
	// 	hasCardChanged,
	// } = context;

	function AmountColumnFormatter(cellContent, row, _rowIndex) {
		return (
			<Box display="flex" alignItems="center">
				{row.card_transaction_type === "DEBIT" ? (
					<SVG src={"../../../media/svg/cards/outflow.svg"} />
				) : (
					<SVG src={"../../../media/svg/cards/inflow.svg"} />
				)}
				<Text fontSize="14px" ml="5px">
					${cellContent / 100}
				</Text>
			</Box>
		);
	}

	function ViewColumnFormatter(_cellContent, row, _rowIndex) {
		return (
			<Box className="cards-actions">
				<div className="cards__action">
					<SVG src={"../../../media/svg/cards/info.svg"} />
				</div>
			</Box>
		);
	}

	const columns = [
		{
			dataField: "amount",
			text: "Transaction amount",
			formatter: AmountColumnFormatter,
		},

		,
		{
			dataField: "transaction_timestamp",
			text: "Transaction date",
			formatter: DateColumnFormatter,
		},

		{
			dataField: "client_transaction_reference",
			text: "Client transaction reference",
			style: {
				minWidth: "200px",
			},
		},

		{
			dataField: "currency",
			text: "Transaction currency",
		},

		{
			dataField: "card_transaction_type",
			text: "Transaction type",
			formatter: ActionsColumnFormatter,
		},

		{
			dataField: "description",
			text: "Description",
			style: {
				minWidth: "200px",
			},
		},

		// {
		// 	dataField: "",
		// 	text: "",
		// 	formatter: ViewColumnFormatter,
		// 	formatExtraData: {},
		// 	style: {
		// 		minWidth: "80px",
		// 	},
		// },
	];
	const paginationOptions = {
		custom: true,
		totalSize: totalCount,
		sizePerPage: 20,
		page: tableUIProps.queryParams.pageNumber,
	};

	const url =
		environment === "sandbox"
			? "https://issuecards.api.bridgecard.co/v1/issuing/sandbox/cards/get_card_transactions"
			: "https://issuecards.api.bridgecard.co/v1/issuing/cards/get_card_transactions";

	const token =
		environment === "sandbox"
			? admindetails.test_authorization_token
			: admindetails.live_authorization_token;

	useEffect(() => {
		const fetchData = async () => {
			setCardTransactions(null);
			setLoading(true);
			try {
				const res = await axios.get(
					`${url}?card_id=${card_id}&page=${tableUIProps.queryParams.pageNumber}`,
					{
						headers: {
							token: `Bearer ${token}`,
						},
					}
				);

				setCardTransactions(res.data.data.transactions);

				setTotalCount(res.data.data.meta.total);
			} catch (err) {
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [tableUIProps.queryParams.pageNumber, environment, url, token, card_id]);

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
									keyField="id"
									data={cardTransactions === null ? [] : cardTransactions}
									columns={columns}
									defaultSorted={uiHelpers.defaultSorted}
									onTableChange={getHandlerTableChange(
										tableUIProps.setQueryParams
									)}
									{...paginationTableProps}
								/>
								<PleaseWaitMessage
									entities={cardTransactions}
									isLoading={loading}
								/>
								<NoRecordsFoundMessage
									entities={cardTransactions}
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
