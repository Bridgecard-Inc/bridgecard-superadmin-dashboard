import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

export const Status = () => {
	const [fetching, setFetching] = useState(true);
	const [statuses, setStatuses] = useState([]);

	const formatStatus = str => {
		let newStr = str.replace(/_/g, " ");
		return newStr;
	};

	useEffect(() => {
		const fetchStatus = async () => {
			setFetching(true);
			try {
				const res = await axios.get(
					"https://issuecards.api.bridgecard.co/v1/issuing/cards/get_api_status"
				);
				setStatuses(res.data.data.api_status);
			} catch (err) {
			} finally {
				setFetching(false);
			}
		};

		fetchStatus();
	}, []);

	let allArr = statuses?.filter(api => api.currently_availble === false);

	return fetching ? (
		<div className="loading-div">
			<ThreeDots color="#141416" height={60} width={60} />
		</div>
	) : (
		<React.Fragment>
			<h1 className="profile-heading">Api status</h1>
			{allArr.length === 0 && (
				<div className="status-ad"> All Apis are operational</div>
			)}
			<div className="status-wrapper">
				<div className="status-card">
					{statuses?.map((api, index) => {
						return (
							<div className="status-row" key={index}>
								<div className="status-des">
									<p>{formatStatus(api.endpoint_url)}</p>
									<small>{api.description}</small>
								</div>

								<p
									className={
										api.currently_available
											? "status-code green"
											: "status-code red"
									}
								>
									{api.currently_available ? "Operational" : "Not operational"}
								</p>
							</div>
						);
					})}
				</div>
			</div>
			<div className="status-update">
				Last update: {statuses[0]?.last_updated_date}
			</div>
		</React.Fragment>
	);
};
