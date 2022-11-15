import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { callApiWithToken } from "../../../utils/callApiWithToken";
import { useSelector } from "react-redux";
import axios from "axios";
import SVG from "react-inlinesvg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ApiCalls } from "./charts/ApiCalls";
import { TrancVolume } from "./charts/TrancVolume";
import { TotalCards } from "./charts/TotalCards";
import { ActiveCards } from "./charts/ActiveCards";

export const Overview = () => {
	const { environment } = useSelector(state => state.app);
	const [fetching, setFetching] = useState(true);
	const [adminDetails, setAdminDetails] = useState([]);
	const [stats, setStats] = useState([]);
	const [liveTokenVisible, setLiveTokenVisible] = useState(false);
	const [liveKeyVisible, setLiveKeyVisible] = useState(false);
	const [testTokenVisible, setTestTokenVisible] = useState(false);
	const [testKeyVisible, setTestKeyVisible] = useState(false);
	const [issuingId, setIssuingId] = useState(false);
	const [trancType, setTrancType] = useState("Debit");

	const toggleTrancType = tranc => {
		setTrancType(tranc);
	};

	const [copy, setCopy] = useState(false);
	const [copy1, setCopy1] = useState(false);
	const [copy2, setCopy2] = useState(false);
	const [copy3, setCopy3] = useState(false);
	const [copy4, setCopy4] = useState(false);

	const handleCopy = fn => {
		fn(true);
		setTimeout(() => {
			fn(false);
		}, 3000);
	};

	const handleToggle = fn => {
		fn(prev => !prev);
	};

	// const fetchAdminDeets = async id => {
	// 	setFetching(true);
	// 	try {
	// 		const res = await axios.get("admin/", {
	// 			headers: {
	// 				token: `Bearer ${id}`,
	// 			},
	// 		});

	// 		if (res.status === 200) {
	// 			setAdminDetails(res.data.data);
	// 		}
	// 	} catch (err) {
	// 	} finally {
	// 		setFetching(false);
	// 	}
	// };

	// const fetchStats = async id => {
	// 	setFetching(true);
	// 	try {
	// 		const res = await axios.get("admin/api/stats", {
	// 			headers: {
	// 				token: `Bearer ${id}`,
	// 			},
	// 		});

	// 		if (res.status === 200) {
	// 			setStats(res.data.data);
	// 		}
	// 	} catch (err) {
	// 	} finally {
	// 		setFetching(false);
	// 	}
	// };

	const formatStr = x => {
		let converted = x / 100;
		let formatted = converted.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return `$${formatted}`;
	};

	// useEffect(() => {
	// 	callApiWithToken(fetchAdminDeets);
	// }, []);

	// useEffect(() => {
	// 	callApiWithToken(fetchStats);
	// }, []);

	return fetching ? (
		<div className="loading-div">
			<ThreeDots color="#141416" height={60} width={60} />
		</div>
	) : (
		<React.Fragment>
			<h1 className="dashboard-title">Overview</h1>
			<div className="balance-div">
				{environment === "sandbox" && (
					<React.Fragment>
						{" "}
						<div className="dashboard-card balance">
							<span>Issuing Balance (sandbox)</span>
							<p>{formatStr(adminDetails?.issuing_balance_USD_sandbox)}</p>
						</div>
						<div className="dashboard-card balance">
							<span>Revenue Balance (sandbox)</span>
							<p>{formatStr(adminDetails?.revenue_balance_USD_sandbox)}</p>
						</div>
					</React.Fragment>
				)}
				{environment === "production" && (
					<React.Fragment>
						{" "}
						<div className="dashboard-card balance">
							<span>Issuing Balance (production)</span>
							<p>{formatStr(adminDetails?.issuing_balance_USD_production)}</p>
						</div>
						<div className="dashboard-card balance">
							<span>Revenue Balance (production)</span>
							<p>{formatStr(adminDetails?.revenue_balance_USD_production)}</p>
						</div>
					</React.Fragment>
				)}
			</div>
			<h1 className="dashboard-title">Api Keys</h1>
			<div className="api-div">
				{environment === "sandbox" ? (
					<React.Fragment>
						<div className="dashboard-card key">
							<div className="key__heading">
								<span>Test Authorization Token</span>
								<CopyToClipboard
									text={adminDetails.test_authorization_token}
									onCopy={() => {
										handleCopy(setCopy);
									}}
								>
									<div className="copy">
										{" "}
										<SVG src={"../media/svg/copy.svg"} />
									</div>
								</CopyToClipboard>
							</div>

							<div className="auth-input-container">
								<div className={"auth-password-input"}>
									<input
										type={testTokenVisible ? "text" : "password"}
										defaultValue={adminDetails.test_authorization_token}
										disabled
									/>
									<div
										className="password-icon"
										onClick={() => handleToggle(setTestTokenVisible)}
									>
										{" "}
										{testTokenVisible ? "Hide" : "Show"}
									</div>
								</div>
							</div>
							{copy && <div className="copy-message">Copied!</div>}
						</div>

						<div className="dashboard-card key">
							<div className="key__heading">
								<span>Test Secret Key</span>
								<div className="copy">
									{" "}
									<CopyToClipboard
										text={adminDetails.test_secret_key}
										onCopy={() => {
											handleCopy(setCopy1);
										}}
									>
										<div className="copy">
											{" "}
											<SVG src={"../media/svg/copy.svg"} />
										</div>
									</CopyToClipboard>
								</div>
							</div>

							<div className="auth-input-container">
								<div className={"auth-password-input"}>
									<input
										type={testKeyVisible ? "text" : "password"}
										defaultValue={adminDetails.test_secret_key}
										disabled
									/>
									<div
										className="password-icon"
										onClick={() => handleToggle(setTestKeyVisible)}
									>
										{" "}
										{testKeyVisible ? "Hide" : "Show"}
									</div>
								</div>
							</div>
							{copy1 && <div className="copy-message">Copied!</div>}
						</div>
					</React.Fragment>
				) : (
					<React.Fragment>
						<div className="dashboard-card key">
							<div className="key__heading">
								<span>Live Authorization Token</span>
								<div className="copy">
									{" "}
									<CopyToClipboard
										text={adminDetails.live_authorization_token}
										onCopy={() => {
											handleCopy(setCopy2);
										}}
									>
										<div className="copy">
											{" "}
											<SVG src={"../media/svg/copy.svg"} />
										</div>
									</CopyToClipboard>
								</div>
							</div>

							<div className="auth-input-container">
								<div className={"auth-password-input"}>
									<input
										type={liveTokenVisible ? "text" : "password"}
										defaultValue={adminDetails.live_authorization_token}
										disabled
									/>
									<div
										className="password-icon"
										onClick={() => handleToggle(setLiveTokenVisible)}
									>
										{" "}
										{liveTokenVisible ? "Hide" : "Show"}
									</div>
								</div>
							</div>
							{copy2 && <div className="copy-message">Copied!</div>}
						</div>

						<div className="dashboard-card key">
							<div className="key__heading">
								<span>Live Secret Key</span>
								<div className="copy">
									{" "}
									<CopyToClipboard
										text={adminDetails.live_secret_key}
										onCopy={() => {
											handleCopy(setCopy3);
										}}
									>
										<div className="copy">
											{" "}
											<SVG src={"../media/svg/copy.svg"} />
										</div>
									</CopyToClipboard>
								</div>
							</div>

							<div className="auth-input-container">
								<div className={"auth-password-input"}>
									<input
										type={liveKeyVisible ? "text" : "password"}
										defaultValue={adminDetails.live_secret_key}
										disabled
									/>
									<div
										className="password-icon"
										onClick={() => handleToggle(setLiveKeyVisible)}
									>
										{" "}
										{liveKeyVisible ? "Hide" : "Show"}
									</div>
								</div>
							</div>
							{copy3 && <div className="copy-message">Copied!</div>}
						</div>
					</React.Fragment>
				)}
				<div className="dashboard-card key">
					<div className="key__heading">
						<span>Issuing Id</span>
						<div className="copy">
							{" "}
							<CopyToClipboard
								text={adminDetails.issuing_app_id}
								onCopy={() => {
									handleCopy(setCopy4);
								}}
							>
								<div className="copy">
									{" "}
									<SVG src={"../media/svg/copy.svg"} />
								</div>
							</CopyToClipboard>
						</div>
					</div>

					<div className="auth-input-container">
						<div className={"auth-password-input"}>
							<input
								type={issuingId ? "text" : "password"}
								defaultValue={adminDetails.issuing_app_id}
								disabled
							/>
							<div
								className="password-icon"
								onClick={() => handleToggle(setIssuingId)}
							>
								{" "}
								{issuingId ? "Hide" : "Show"}
							</div>
						</div>
					</div>
					{copy4 && <div className="copy-message">Copied!</div>}
				</div>
			</div>
			<h1 className="dashboard-title">Stats</h1>
			<div className="chart-area">
				<div className="chart-area__chart">
					<ApiCalls chartData={stats?.total_api_calls} />
					<TrancVolume
						chartData={
							trancType === "Debit"
								? stats?.total_transaction_volume_debits
								: stats?.total_transaction_volume_credits
						}
						toggleTrancType={toggleTrancType}
						trancType={trancType}
					/>
				</div>

				<div className="chart-area__chart">
					<TotalCards chartData={stats?.total_issued_cards} />
					<ActiveCards chartData={stats?.total_active_cards} />
				</div>
			</div>
		</React.Fragment>
	);
};
