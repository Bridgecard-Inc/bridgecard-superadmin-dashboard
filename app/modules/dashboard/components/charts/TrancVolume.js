import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BarChart from "../../../../utils/Chart";
import { removeUnderscore } from "../../../../utils/formatters/stringFormatters";
import SVG from "react-inlinesvg";

export const TrancVolume = ({ chartData, trancType, toggleTrancType }) => {
	const [userData, setUserData] = useState(null);
	const [filtered, setFiltered] = useState(false);

	const handleToggle = () => {
		setFiltered(prev => !prev);
	};

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
			<div className="graph__tranc--heading">
				<div>
					<p>Transaction Volume($).</p>
					<span>Track your total transaction volume.</span>
				</div>

				<div className="tranc-filter" onClick={handleToggle}>
					<div className="filter-div">
						<SVG src={"../media/svg/filter.svg"} />
						<p>Filter</p>
					</div>
					{filtered && (
						<div className="filters">
							<div
								className={trancType === "Credit" ? "active-tranc" : null}
								onClick={() => toggleTrancType("Credit")}
							>
								Credit
							</div>
							<div
								className={trancType === "Debit" ? "active-tranc-2" : null}
								onClick={() => toggleTrancType("Debit")}
							>
								Debit
							</div>
						</div>
					)}
				</div>
			</div>
			{userData && <BarChart chartData={userData} />}
		</div>
	);
};
