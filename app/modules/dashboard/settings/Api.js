import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { callApiWithToken } from "../../../utils/callApiWithToken";

export const Api = () => {
	const [fetching, setFetching] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [minCharge, setMinCharge] = useState(0);
	const [interChangeFeePer, setInterChangeFeePer] = useState(0);
	const [minInterChangeFee, setMinInterChangeFee] = useState(0);
	const [maxInterChangeFee, setMaxInterChangeFee] = useState(0);

	const [isEdited, setIsEdited] = useState(false);
	const [edit, setEdit] = useState(false);
	const [side, setSide] = useState(false);

	const toggle = () => {
		if (side === true) {
			setSide(false);
		} else if (side === false) {
			setSide(true);
		}
	};
	const fetchSettingsDeets = async id => {
		setFetching(true);
		try {
			const res = await axios.get(
				"https://bridgecard-issuing-admin-auth-service-vbdndeke7q-uc.a.run.app/v1/admin/api/settings",
				{
					headers: {
						token: `Bearer ${id}`,
					},
				}
			);

			if (res.status === 200) {
				setSide(res?.data.data.charge_maintenance_fee_from_issuing_wallet);
				setMinCharge(res?.data.data.issuing_balance_threshold);
				setInterChangeFeePer(res?.data.data.interchange_fee_percentage);
				setMinInterChangeFee(res?.data.data.minimum_interchange_fee);
				setMaxInterChangeFee(res?.data.data.maximum_interchange_fee);
			}
		} catch (err) {
		} finally {
			setFetching(false);
		}
	};

	const editSettingsDeets = async id => {
		setSubmitting(true);
		try {
			const res = await axios.patch(
				"https://bridgecard-issuing-admin-auth-service-vbdndeke7q-uc.a.run.app/v1/admin/api/settings",
				{
					charge_maintenance_fee_from_issuing_wallet: side,
					issuing_balance_threshold: minCharge,
					interchange_fee_percentage: interChangeFeePer,
					maximum_interchange_fee: maxInterChangeFee,
					minimum_interchange_fee: minInterChangeFee,
				},
				{
					headers: {
						token: `Bearer ${id}`,
					},
				}
			);
		} catch (err) {
		} finally {
			setIsEdited(prev => !prev);
			setSubmitting(false);
		}
	};

	const editProfile = () => {
		setEdit(true);
	};

	const handleCancel = () => {
		setEdit(false);
	};

	useEffect(() => {
		callApiWithToken(fetchSettingsDeets);
	}, [isEdited]);

	return fetching ? (
		<div className="loading-div">
			<ThreeDots color="#141416" height={60} width={60} />
		</div>
	) : (
		<React.Fragment>
			<h1 className="profile-heading">Authorizations</h1>
			<div className="apis-wrap">
				<div className="apis-div">
					<div className="apis-div__sub-section">
						{" "}
						<div>
							<p>Charge maintenance fee from issuing wallet</p>
							<small>
								Note: Toggle to false to charge maintenance fee directly from
								your users.
							</small>
						</div>
						{edit && (
							<div className="toggle-wrap">
								<div
									className={side ? "toggle end " : "toggle start off"}
									onClick={toggle}
								>
									<div className="toggle--switch"></div>
								</div>
							</div>
						)}
						{edit === false && <p className="capitalize">{side.toString()}</p>}
					</div>
					<div className="apis-div__sub-section">
						<p>Issuing balance threshold ($)</p>
						<div className="auth-input-container mb-0">
							<input
								type="number"
								value={minCharge}
								className="auth-input"
								placeholder="Min balance"
								onChange={e => {
									setMinCharge(e.target.value);
								}}
								disabled={edit === false}
							/>
						</div>
					</div>
					<div className="apis-div__sub-section">
						<p>Interchange fee percentage (%)</p>
						<div className="auth-input-container mb-0">
							<input
								type="number"
								value={interChangeFeePer}
								className="auth-input"
								placeholder="Min balance"
								onChange={e => {
									setInterChangeFeePer(e.target.value);
								}}
								disabled={edit === false}
							/>
						</div>
					</div>
					<div className="apis-div__sub-section">
						<p>Maximum interchange fee (In cents)</p>
						<div className="auth-input-container mb-0">
							<input
								type="number"
								value={maxInterChangeFee}
								className="auth-input"
								placeholder="Min balance"
								onChange={e => {
									setMaxInterChangeFee(e.target.value);
								}}
								disabled={edit === false}
							/>
						</div>
					</div>
					<div className="apis-div__sub-section">
						<p>Minimum interchange fee (In cents)</p>
						<div className="auth-input-container mb-0">
							<input
								type="number"
								value={minInterChangeFee}
								className="auth-input"
								placeholder="Min balance"
								onChange={e => {
									setMinInterChangeFee(e.target.value);
								}}
								disabled={edit === false}
							/>
						</div>
					</div>
				</div>

				<div className="profile-cta">
					<button
						className="edit-cta"
						onClick={edit ? handleCancel : editProfile}
					>
						{edit ? "Cancel" : "Edit authorizations"}
					</button>
					{edit && (
						<button
							className="update-cta"
							type="button"
							onClick={() => {
								callApiWithToken(editSettingsDeets);
							}}
						>
							{submitting ? (
								<ThreeDots color="#141416" height={40} width={40} />
							) : (
								"Finish"
							)}
						</button>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};
