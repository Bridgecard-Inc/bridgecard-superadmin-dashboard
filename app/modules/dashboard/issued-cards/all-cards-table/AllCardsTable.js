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
import { useAuthContext } from "../../../../firebase/AuthContext";
import { DateColumnFormatter } from "./column-formatters/DateColumnFormatter";
import { ActionsColumnFormatter } from "./column-formatters/ActionColumnFormatters";
import { useSelector } from "react-redux";
import Box from "../../../../utils/Box";
import SVG from "react-inlinesvg";
import axios from "axios";
import { useRouter } from "next/router";

export default function AllCardsTable() {
	const router = useRouter();
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
		updateCardsRow,
		hasCardChanged,
		setIsCardModalVisible,
		setIsDeleteCardModalVisible,
		setIsFundCardModalVisible,
		setIsUnloadCardModalVisible,
	} = context;

	const openModal = row => {
		setIsCardModalVisible(true);
		updateCardsRow(row);
	};

	const openFundModal = row => {
		setIsFundCardModalVisible(true);
		updateCardsRow(row);
	};

	const openUnloadModal = row => {
		setIsUnloadCardModalVisible(true);
		updateCardsRow(row);
	};

	const openDeleteModal = row => {
		setIsDeleteCardModalVisible(true);
		updateCardsRow(row);
	};

	// const openCreateCardModal = row => {
	// 	setIsCreateNewCardModalVisible(true);
	// 	setCardRow(row);
	// };

	function ViewColumnFormatter(
		_cellContent,
		row,
		_rowIndex,
		{ openModal, openDeleteModal, openFundModal, openUnloadModal }
	) {
		return (
			<Box className="cards-actions">
				<div className="cards__action" onClick={() => openModal(row)}>
					<SVG src={"../media/svg/cards/info.svg"} />
				</div>

				<div className="cards__action" onClick={() => openFundModal(row)}>
					<SVG src={"../media/svg/cards/create.svg"} />
				</div>

				<div className="cards__action" onClick={() => openUnloadModal(row)}>
					<SVG src={"../media/svg/cards/outflow.svg"} />
				</div>

				<div
					className="cards__action"
					onClick={() =>
						router.push(
							`/dashboard/issued-cards/${row.card_id}/card-transactions`
						)
					}
				>
					<SVG src={"../media/svg/cards/server.svg"} />
				</div>

				<div className="cards__action" onClick={() => openDeleteModal(row)}>
					{row.is_active ? (
						<SVG src={"../media/svg/cards/Fan.svg"} />
					) : (
						<SVG src={"../media/svg/cards/Gas-stove.svg"} />
					)}
				</div>
			</Box>
		);
	}

	const columns = [
		{
			dataField: "card_name",
			text: "Card name",
		},
		{
			dataField: "card_currency",
			text: "Card currrency",
		},
		{
			dataField: "brand",
			text: "Brand",
		},
		{
			dataField: "card_type",
			text: "Card type",
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
			formatExtraData: {
				openModal,
				openDeleteModal,
				openFundModal,
				openUnloadModal,
			},
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
			? "https://issuecards.api.bridgecard.co/v1/issuing/sandbox/cards/get_all_cards"
			: "https://issuecards.api.bridgecard.co/v1/issuing/cards/get_all_cards";

	const token =
		environment === "sandbox"
			? admindetails.test_authorization_token
			: admindetails.live_authorization_token;

	useEffect(() => {
		const fetchData = async () => {
			setTotalCount(0);
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

				setCardHolders(res.data.data.cards);
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
