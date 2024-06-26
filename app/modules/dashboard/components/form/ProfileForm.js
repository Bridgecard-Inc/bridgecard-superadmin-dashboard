import Select from "react-select";
import React, { useId, useState } from "react";
import AsyncSelect from "../../../../utils/AsyncSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ThreeDots, Oval } from "react-loader-spinner";
import axios from "axios";
import { useSelector } from "react-redux";
import {
	callApiWithToken,
	callApiWithPayloadToken,
} from "../../../../utils/callApiWithToken";

export const ProfileForm = ({ profileEdited }) => {
	const [edit, setEdit] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setIsError] = useState(false);
	const { environment } = useSelector(state => state.app);
	const [balanceDiv, setBalanceDiv] = useState(false);
	const [fetchingBalance, setFetchingBalance] = useState(false);
	const [currentBalance, setCurrentBalance] = useState("");
	const [newBalance, setNewBalance] = useState("");

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

	const initialValues = {
		administrator: "",
		amount: "",
		description: "",
	};

	const validationSchema = Yup.object().shape({
		administrator: Yup.string().required(""),
		amount: Yup.number().required(""),
		description: Yup.string().required(""),
	});

	const fetchAdminBalance = async (token, id) => {
		setBalanceDiv(true);
		setFetchingBalance(true);

		try {
			const res = await axios.get(
				`/superadmin/admin-issuing-balance/${id}/USD/production`,
				{
					headers: {
						Token: `Bearer ${token}`,
					},
				}
			);
			setCurrentBalance(res?.data.data.current_balance / 100);
		} catch (err) {
			console.log(err);
		} finally {
			setFetchingBalance(false);
		}
	};

	const formik = useFormik({
		initialValues,
		validationSchema: validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, actions) => {
			const topupAdmin = async token => {
				setSuccess(false);
				setIsError(false);
				try {
					actions.setSubmitting(true);
					const res = await axios.patch(
						`superadmin/topup-admin-issuing-balance/${values.administrator}/USD/${values.amount}/production`,
						{
							description: `WF: ${values.description}`,
						},
						{
							headers: {
								Token: `Bearer ${token}`,
							},
						}
					);
					setSuccess(true);
					setNewBalance(res.data.data.updated_balance / 100);
					handleCancel();
				} catch (err) {
					setIsError(err?.response?.data?.message);
				} finally {
					actions.setSubmitting(false);
				}
			};
			callApiWithToken(topupAdmin);
		},
	});

	const editProfile = () => {
		setEdit(true);
	};

	const handleCancel = () => {
		setEdit(false);
	};

	return (
		<main>
			<form>
				<div className="auth-input-container topup-balance">
					<AsyncSelect
						url={
							"https://bridgecard-issuing-app.com/admin-auth-service-v2/v1/superadmin/administrators"
						}
						customStyles={customStyles}
						placeholder="Administrators"
						reload={true}
						isDisabled={!edit}
						handleChange={e => {
							setBalanceDiv(false);
							setSuccess(false);
							formik.setFieldValue("administrator", e?.value);
							callApiWithPayloadToken(fetchAdminBalance, e?.value);
						}}
					/>

					{balanceDiv && (
						<div className="toggle-balance">
							{fetchingBalance ? (
								<Oval
									color="#ecc334"
									height={20}
									width={20}
									visible={true}
									ariaLabel="oval-loading"
									secondaryColor="#ecc337"
									strokeWidth={2}
									strokeWidthSecondary={2}
								/>
							) : (
								<span>${currentBalance}</span>
							)}{" "}
						</div>
					)}
				</div>

				<div className="auth-input-container">
					<input
						type="number"
						className="auth-input"
						placeholder="Amount in cents"
						disabled={!edit}
						{...formik.getFieldProps("amount")}
					/>
				</div>

				<div className="auth-input-container">
					<input
						type="text"
						className="auth-input"
						placeholder="Description"
						disabled={!edit}
						{...formik.getFieldProps("description")}
					/>
				</div>

				{error && (
					<div className="error-message">
						<p>{error}</p>
					</div>
				)}

				{success && (
					<div className="success-message">
						<p> New Balance = ${newBalance} </p>
					</div>
				)}
			</form>
			<div className="profile-cta">
				<button
					className="edit-cta"
					onClick={edit ? handleCancel : editProfile}
				>
					{edit ? "Cancel" : "Topup admin"}
				</button>
				{edit && (
					<button
						className="update-cta"
						type="button"
						disabled={
							!((formik.isValid && formik.dirty) || formik.isSubmitting)
						}
						onClick={formik.handleSubmit}
					>
						{formik.isSubmitting ? (
							<ThreeDots color="#141416" height={40} width={40} />
						) : (
							"Finish"
						)}
					</button>
				)}
			</div>
		</main>
	);
};
