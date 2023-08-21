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
import { callApiWithToken } from "../../../../../_helpers/functions/callApi";
import { Pagination } from "../../../../../_helpers/pagination/index";
import { useTableUIContext } from "../../../../../_helpers/TableUIContext";
import axios from "axios";
import Box from "../../../../utils/Box";
import { Text } from "../../../../utils/primitives";
import { useAuthContext } from "../../../../firebase/AuthContext";
import { useRouter } from "next/router";

export default function CompaniesTable({ days }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [totalCount, setTotalCount] = useState(0);
	const [companies, setCompanies] = useState(null);
	let id = useId();
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
	const { setWebRow, setIsWebhookModalVisible } = context;

	const openModal = row => {
		setIsWebhookModalVisible(true);
		setWebRow(row);
	};

	function ResponseColumnFormatter(cellContent, row, _rowIndex) {
		return (
			<Box className="d-flex align-items-center">
				<Box ml="0">
					<Box
						className="pointer"
						cursor="pointer"
						color="#3374FF"
						fontSize="14px"
						fontWeight="300"
						m="0"
						fontFamily="GT Walsheim Pro"
					>
						${(cellContent / 100).toFixed(2)}
					</Box>
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
						{row?.response_time?.toFixed(2)} secs
					</Text>
				</Box>
			</Box>
		);
	}

	function ViewColumnFormatter(_cellContent, row, _rowIndex) {
		return (
			<Box className="d-flex align-items-center pointer">
				<Box ml="0">
					<Text
						onClick={() => router.push(`/dashboard/${row.id}/actions`)}
						as="p"
						color={"#AA8401"}
						fontSize="14px"
						fontWeight="300"
						m="0"
						fontFamily="GT Walsheim Pro"
					>
						View
					</Text>
				</Box>
			</Box>
		);
	}

	const columns = [
		{
			dataField: "company_name",
			text: "Company name",
			style: {
				minWidth: "250px",
			},
		},
		{
			dataField: "issuing_balance_USD_sandbox",
			text: "Issuing Balance(sandbox)",
			formatter: ResponseColumnFormatter,
			style: {
				minWidth: "150px",
			},
		},

		{
			dataField: "issuing_balance_USD_production",
			text: "Issuing Balance(production)",
			formatter: ResponseColumnFormatter,
			style: {
				minWidth: "150px",
			},
		},

		{
			dataField: "work_email",
			text: "Email",
			style: {
				minWidth: "150px",
			},
		},

		{
			dataField: "",
			text: "Actions",
			style: {
				minWidth: "50px",
			},
			formatter: ViewColumnFormatter,
		},
	];
	const paginationOptions = {
		custom: true,
		totalSize: totalCount,
		sizePerPage: 20,
		page: tableUIProps.queryParams.pageNumber,
	};

	useEffect(() => {
		const fetchData = async token => {
			setLoading(true);
			try {
				const res = await axios.get(
					`superadmin/administrators?fetch_type=all&page=${tableUIProps.queryParams.pageNumber}`,
					{
						headers: {
							token: `Bearer ${token}`,
						},
					}
				);

				setCompanies(
					res.data.data.data.length === 0 ? null : res.data.data.data
				);

				setTotalCount(res.data.data.meta.total);

				// setTotalCount(res.data.total_count);
			} catch (err) {
			} finally {
				setLoading(false);
			}
		};

		callApiWithToken(fetchData);
	}, [tableUIProps.queryParams.pageNumber]);

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
									keyField={id}
									data={companies === null ? [] : companies}
									columns={columns}
									defaultSorted={uiHelpers.defaultSorted}
									onTableChange={getHandlerTableChange(
										tableUIProps.setQueryParams
									)}
									{...paginationTableProps}
								/>
								<PleaseWaitMessage entities={companies} isLoading={loading} />
								<NoRecordsFoundMessage
									entities={companies}
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
