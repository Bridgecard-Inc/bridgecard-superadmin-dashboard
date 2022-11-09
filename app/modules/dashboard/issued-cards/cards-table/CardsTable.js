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
import { NameColumnFormatter } from "./column-formatters/NameColumnFormatters";
import { DateColumnFormatter } from "./column-formatters/DateColumnFormatter";
import { ActionsColumnFormatter } from "./column-formatters/ActionColumnFormatters";
import { useSelector } from "react-redux";
import { useAuthContext } from "../../../../firebase/AuthContext";
import axios from "axios";
import Box from "../../../../utils/Box";
import { Text } from "../../../../utils/primitives";
import SVG from "react-inlinesvg";

export default function CardsTable() {
	const [loading, setLoading] = useState(false);
	const [totalCount, setTotalCount] = useState(0);
	const [cardHolders, setCardHolders] = useState(null);
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

	const context = useAuthContext();
	const {
		setCardRow,
		setIsCardHolderModalVisible,
		setIsCreateNewCardModalVisible,
		setIsDeleteCardHolderModalVisible,
		hasCardChanged,
	} = context;

	const openModal = row => {
		setIsCardHolderModalVisible(true);
		setCardRow(row);
	};

	// const openEditModal = row => {
	// 	setIsEditCardHolderModalVisible(true);
	// 	setCardRow(row);
	// };

	const openDeleteModal = row => {
		setIsDeleteCardHolderModalVisible(true);
		setCardRow(row);
	};

	const openCreateCardModal = row => {
		setIsCreateNewCardModalVisible(true);
		setCardRow(row);
	};

	function ViewColumnFormatter(
		_cellContent,
		row,
		_rowIndex,

		{ openModal, openDeleteModal }
	) {
		return (
			<Box className="cards-actions">
				<div className="cards__action" onClick={() => openModal(row)}>
					<SVG src={"../media/svg/cards/info.svg"} />
				</div>

				<div className="cards__action" onClick={() => openCreateCardModal(row)}>
					<SVG src={"../media/svg/cards/payment.svg"} />
				</div>

				<div className="cards__action" onClick={() => openDeleteModal(row)}>
					<SVG src={"../media/svg/cards/Trash.svg"} />
				</div>
			</Box>
		);
	}

	const columns = [
		{
			dataField: "",
			text: "Name",
			formatter: NameColumnFormatter,
		},
		{
			dataField: "email_address",
			text: "Email",
		},
		{
			dataField: "phone",
			text: "Phone number",
		},
		{
			dataField: "created_at",
			text: "Date created",
			formatter: DateColumnFormatter,
		},

		{
			dataField: "action",
			text: "Status",
			formatter: ActionsColumnFormatter,
			style: {
				minWidth: "80px",
			},
		},

		{
			dataField: "",
			text: "",
			formatter: ViewColumnFormatter,

			formatExtraData: { openModal, openDeleteModal },

			style: {
				minWidth: "80px",
			},
		},
	];
	const paginationOptions = {
		custom: true,
		totalSize: totalCount,
		sizePerPage: 20,
		page: tableUIProps.queryParams.pageNumber,
	};

	const url =
		environment === "sandbox"
			? "https://issuecards.api.bridgecard.co/v1/issuing/sandbox/cards/get_all_cardholder"
			: "https://issuecards.api.bridgecard.co/v1/issuing/cards/get_all_cardholder";
	const cardUrl =
		environment === "sandbox"
			? "https://issuecards.api.bridgecard.co/v1/issuing/sandbox/cards/get_all_cardholder"
			: "https://issuecards.api.bridgecard.co/v1/issuing/cards/get_all_cardholder";
	const token =
		environment === "sandbox"
			? admindetails.test_authorization_token
			: admindetails.live_authorization_token;

	useEffect(() => {
		const fetchData = async () => {
			setCardHolders(null);
			setLoading(true);
			try {
				const res = await axios.get(
					`${url}?page=${tableUIProps.queryParams.pageNumber}`,
					{
						headers: {
							token: `Bearer ${token}`,
						},
					}
				);

				setCardHolders(res.data.data.cardholders);
				setTotalCount();

				setTotalCount(res.data.data.meta.total);
			} catch (err) {
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [
		tableUIProps.queryParams.pageNumber,
		environment,
		url,
		token,
		hasCardChanged,
	]);

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
									data={cardHolders === null ? [] : cardHolders}
									columns={columns}
									defaultSorted={uiHelpers.defaultSorted}
									onTableChange={getHandlerTableChange(
										tableUIProps.setQueryParams
									)}
									{...paginationTableProps}
								/>
								<PleaseWaitMessage entities={cardHolders} isLoading={loading} />
								<NoRecordsFoundMessage
									entities={cardHolders}
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
