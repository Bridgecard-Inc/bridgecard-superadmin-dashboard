export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const sizePerPageList = [
	{ text: "20", value: 20 },
	{ text: "50", value: 50 },
	{ text: "100", value: 100 },
];
export const initialFilter = {
	filter: {
		status: "",
		role: "",
		searchText: "",
	},
	sortOrder: "asc", // asc||desc
	sortField: "userName",
	pageNumber: 1,
	pageSize: 10,
};
