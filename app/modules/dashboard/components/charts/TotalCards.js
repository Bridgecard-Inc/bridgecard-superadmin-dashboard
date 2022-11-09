import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BarChart from "../../../../utils/Chart";
import { removeUnderscore } from "../../../../utils/formatters/stringFormatters";

export const TotalCards = ({ chartData }) => {
	const [userData, setUserData] = useState(null);
	const { environment } = useSelector(state => state.app);

	useEffect(() => {
		if (chartData) {
			setUserData({
				labels:
					environment === " production"
						? Object.keys(chartData?.production).map(data =>
								removeUnderscore(data)
						  )
						: Object.keys(chartData?.sandbox).map(data =>
								removeUnderscore(data)
						  ),
				datasets: [
					{
						label: "",
						data:
							environment === "production"
								? Object.values(chartData?.production).map(data => data)
								: Object.values(chartData?.sandbox).map(data => data),
						backgroundColor: ["#ecc337"],
						borderColor: ["#ecc337"],
						borderWidth: 2,
					},
				],
			});
		}
	}, [environment, chartData]);
	return (
		<div className="graph dashboard-card">
			<div className="graph__heading">
				<p>Total cards</p>
				<span>Track the total number of issued cards.</span>
				{userData && <BarChart chartData={userData} />}
			</div>
		</div>
	);
};
