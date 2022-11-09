import React from "react";
import { getPages, getPagesCount } from "../TablePaginationHelpers";

export function PaginationLinks({ paginationProps }) {
	const { totalSize, sizePerPage, page, paginationSize } = paginationProps;
	const pagesCount = getPagesCount(totalSize, sizePerPage);
	const pages = getPages(page, pagesCount, paginationSize);
	const handleFirstPage = ({ onPageChange }) => {
		onPageChange(1);
	};
	const handlePrevPage = ({ page, onPageChange }) => {
		onPageChange(page - 1);
	};
	const handleNextPage = ({ page, onPageChange }) => {
		if (page < pagesCount) {
			onPageChange(page + 1);
		}
	};
	const handleLastPage = ({ onPageChange }) => {
		onPageChange(pagesCount);
	};
	const handleSelectedPage = ({ onPageChange }, pageNum) => {
		onPageChange(pageNum);
	};
	const disabledClass = pagesCount > 1 ? "" : "disabled";
	return (
		<>
			{pagesCount < 2 && <></>}
			{pagesCount > 1 && (
				<>
					<div className={`d-flex flex-wrap py-2 mr-3 ${disabledClass}`}>
						<a
							onClick={() => handlePrevPage(paginationProps)}
							className="pagination-arrow"
						>
							<i className="las la-angle-left "></i>
						</a>
						{page > 1 && <a className="pagination-dots">...</a>}
						{pages.map(p => (
							<a
								key={p}
								onClick={() => handleSelectedPage(paginationProps, p)}
								className={`pagination-numbers ${
									page === p ? " pagination-active" : ""
								} `}
							>
								{p}
							</a>
						))}
						{page < pagesCount && <a className="pagination-dots">...</a>}
						<a
							onClick={() => handleNextPage(paginationProps)}
							className="pagination-arrow"
						>
							<i className="las la-angle-right "></i>
						</a>
					</div>
				</>
			)}
		</>
	);
}
