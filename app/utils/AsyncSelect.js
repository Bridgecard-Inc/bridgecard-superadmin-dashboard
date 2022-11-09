import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AsyncSelect({
	url,
	value,
	handleChange,
	placeholder,
	label,
	reload,
	isDisabled,
	customStyles,
}) {
	const [loading, setLoading] = useState(true);
	const [options, setOptions] = useState([]);
	const { environment, admindetails } = useSelector(state => state.app);
	const token =
		environment === "production"
			? admindetails.live_authorization_token
			: admindetails.test_authorization_token;

	const fetchData = useCallback(() => {
		setLoading(true);
		axios
			.get(url, {
				headers: {
					Token: `Bearer ${token}`,
				},
			})
			.then(({ data: res }) => {
				setOptions(res.data.states ? res.data.states : []);
			})
			.catch(error => {})
			.finally(() => setLoading(false));
	}, [url]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	useEffect(() => {
		if (reload) {
			fetchData();
		}
	}, [reload]);

	return (
		<>
			{label && <label>{label}</label>}
			<Select
				styles={customStyles}
				boxShadow="none"
				options={options}
				value={value}
				onChange={handleChange}
				placeholder={loading ? "Please wait..." : placeholder}
				isLoading={loading}
				isDisabled={isDisabled}
			/>
		</>
	);
}
