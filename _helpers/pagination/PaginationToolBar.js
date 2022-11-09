import React from "react";
import { PaginationTotalStandalone } from "react-bootstrap-table2-paginator";
import { ThreeDots } from "react-loader-spinner";

export function PaginationToolbar(props) {
	const { isLoading, paginationProps } = props;
	const {
		sizePerPageList,
		sizePerPage,
		totalSize,
		onSizePerPageChange = [
			{ text: "20", value: 20 },
			{ text: "50", value: 50 },
			{ text: "100", value: 100 },
		],
	} = paginationProps;
	const style = {
		width: "75px",
		marginRight: "20px",
		height: "30px",
		border: "1px solid #ecc337",
	};
	const onSizeChange = event => {
		const newSize = +event.target.value;
		onSizePerPageChange(newSize);
	};
	return (
		<div className="d-flex align-items-center py-3">
			{isLoading && (
				<div className="d-flex align-items-center mx-4">
					<ThreeDots color="#141416" height={40} width={30} />
				</div>
			)}
			<PaginationTotalStandalone
				className="pagination-standalone text-danger"
				{...paginationProps}
			/>
		</div>
	);
}
