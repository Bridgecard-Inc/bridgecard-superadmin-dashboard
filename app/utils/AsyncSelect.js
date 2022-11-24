import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import axios from "axios";
import { auth } from "../firebase/firebase";
import { useSelector } from "react-redux";
import { callApiWithToken } from "../../_helpers/functions/callApi";

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

	// const token =
	// 	environment === "production"
	// 		? admindetails.live_authorization_token
	// 		: admindetails.test_authorization_token;

	const callApi = async token => {
		try {
			const res = await axios.get(url, {
				headers: {
					Token: `Bearer ${token}`,
				},
			});

			setOptions(res.data.data.data ? res.data.data.data : []);
		} catch (err) {
		} finally {
			setLoading(false);
		}
	};

	const fetchData = useCallback(() => {
		setLoading(true);
		auth.onAuthStateChanged(user => {
			if (user !== null) {
				user.getIdToken().then(idToken => {
					callApi(idToken);
				});
			}
		});
	}, [url]);

	useEffect(() => {
		callApiWithToken(fetchData);
	}, [fetchData]);

	useEffect(() => {
		if (reload) {
			fetchData();
		}
	}, [reload, fetchData]);

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
