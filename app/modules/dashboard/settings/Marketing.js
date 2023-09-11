import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { callApiWithToken } from "../../../utils/callApiWithToken";
import AsyncSelect from "../../../utils/AsyncSelect";
import axios from "axios";
// import SVG from "react-inlinesvg";
// import { NoWebhook } from "../webhook/webhook-table/NoWebhook";
import Select from "react-select";
import { useAuthContext } from "../../../firebase/AuthContext";

export default function Marketing() {
	const [fetching, setFetching] = useState(false);
	const [administrators, setAdministrators] = useState([]);
	const [success, setSuccess] = useState(false);

	const [side, setSide] = useState(true);

	const toggle = () => {
		if (side === true) {
			setSide(false);
		} else if (side === false) {
			setSide(true);
		}
	};

	const setMarketing = async id => {
		setFetching(true);

		const payload = {
			company_list: administrators,
			should_include: side,
		};
		try {
			const res = await axios.post(
				"https://bridgecard-issuing-admin-auth-service-vbdndeke7q-uc.a.run.app/v1/superadmin/run_issuing_companies_analysis",
				payload
			);
			setSuccess(true);
		} catch (err) {
		} finally {
			setFetching(false);
		}
	};

	// useEffect(() => {
	// 	callApiWithToken(fetchAdminDeets);
	// }, [hasCardChanged]);

	const modifyList = arr => {
		let newArr = [];
		for (let i = 0; i < arr.length; i++) {
			newArr.push(arr[i].value);
		}

		return newArr;
	};

	const customStyles = {
		placeholder: () => ({
			fontSize: "16px",
			color: "#797979;",
		}),

		control: (base, state) => ({
			...base,
			border: state.isFocused ? "1px solid #ecc337" : "1px solid #ebebeb",
			// This line disable the blue border
			boxShadow: "none",
			borderRadius: "12px",
			minHeight: "62px",
		}),

		singleValue: (provided, state) => ({
			...provided,
			color: "#141416",
			fontSize: "16px",
		}),

		option: (provided, state) => ({
			...provided,
			color: state.isSelected ? "white" : "black",
			background: state.isSelected ? "#ecc337" : "white",
			fontSize: "16px",
		}),

		valueContainer: (provided, state) => ({
			...provided,
			minHeight: "62px",
			display: "flex",
			alignItems: "center",
			paddingLeft: "20px",
		}),
	};

	return (
		<React.Fragment>
			<h1 className="profile-heading">Issuing Company Analysis</h1>

			<div className="profile-form-area">
				<form>
					<div className="auth-input-container">
						<AsyncSelect
							url={
								"https://bridgecard-issuing-admin-auth-service-vbdndeke7q-uc.a.run.app/v1/superadmin/administrators"
							}
							customStyles={customStyles}
							placeholder="Administrators"
							reload={true}
							isMulti={true}
							isDisabled={fetching}
							closeMenuOnSelect={false}
							isSearchable={true}
							handleChange={e => {
								setAdministrators(modifyList(e));
							}}
						/>
					</div>

					<div>
						<p className="toggle--p">Should Include?</p>
						<div className="toggle-wrap">
							<div
								className={side ? "toggle end " : "toggle start off"}
								onClick={toggle}
							>
								<div className="toggle--switch"></div>
							</div>
						</div>
					</div>

					{success && (
						<div className="success-message">
							<p> Issuing Company Analysis Running in background</p>
						</div>
					)}

					<div className="profile-cta">
						<button
							className="update-cta"
							type="button"
							disabled={fetching}
							onClick={setMarketing}
						>
							{fetching ? (
								<ThreeDots color="#141416" height={40} width={40} />
							) : (
								"Finish"
							)}
						</button>
					</div>
				</form>
			</div>
		</React.Fragment>
	);
}
