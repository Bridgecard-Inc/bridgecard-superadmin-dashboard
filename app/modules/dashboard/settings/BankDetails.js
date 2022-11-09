import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { callApiWithToken } from "../../../utils/callApiWithToken";
import axios from "axios";
import SVG from "react-inlinesvg";
import { NoWebhook } from "../webhook/webhook-table/NoWebhook";
import { useAuthContext } from "../../../firebase/AuthContext";

export default function BankDetails() {
	const [fetching, setFetching] = useState(true);
	const [bankingDetails, setBankingDetails] = useState([]);
	const context = useAuthContext();
	const { hasCardChanged } = context;

	const fetchAdminDeets = async id => {
		setFetching(true);
		try {
			const res = await axios.get("admin/", {
				headers: {
					token: `Bearer ${id}`,
				},
			});

			if (res.status === 200) {
				setBankingDetails(
					res.data.data.bank_account_information
						? res.data.data.bank_account_information
						: null
				);
			}
		} catch (err) {
		} finally {
			setFetching(false);
		}
	};

	useEffect(() => {
		callApiWithToken(fetchAdminDeets);
	}, [hasCardChanged]);

	return fetching ? (
		<div className="loading-div">
			<ThreeDots color="#141416" height={60} width={60} />
		</div>
	) : (
		<React.Fragment>
			<h1 className="profile-heading">Banking Information</h1>

			{bankingDetails ? (
				<div className="profile-form-area">
					<form>
						<div className="auth-input-container">
							<label>Account Name</label>
							<input
								type="text"
								className="auth-input"
								placeholder="Account Name"
								value={bankingDetails.NGN.account_name}
								disabled
							/>
						</div>

						<div className="auth-input-container">
							<label>Account Number</label>
							<input
								type="text"
								className="auth-input"
								placeholder="Account Number"
								value={bankingDetails.NGN.account_number}
								disabled
							/>
						</div>

						<div className="auth-input-container">
							<label>Bank Name</label>
							<input
								type="text"
								className="auth-input"
								placeholder="Bank Name"
								value={bankingDetails.NGN.bank_name}
								disabled
							/>
						</div>

						<div className="auth-input-container">
							<label>Fx Rate</label>
							<input
								type="text"
								className="auth-input"
								placeholder="Fx Rate"
								value={bankingDetails.NGN.usd_to_ngn_fx_rate / 100}
								disabled
							/>
						</div>
					</form>
				</div>
			) : (
				<NoWebhook
					heading={"No banking information created"}
					title={"Your banking information will appear here"}
				/>
			)}
		</React.Fragment>
	);
}
