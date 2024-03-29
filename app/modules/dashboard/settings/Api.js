import Select from "react-select";
import React, { useId, useState } from "react";
import AsyncSelect from "../../../utils/AsyncSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useSelector } from "react-redux";
import { callApiWithToken } from "../../../utils/callApiWithToken";

export const Api = ({ adminDetails, profileEdited }) => {
	const [edit, setEdit] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setIsError] = useState(false);
	const { environment } = useSelector(state => state.app);

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

	const formik = useFormik({
		initialValues,
		validationSchema: validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, actions) => {
			const debitAdmin = async token => {
				try {
					actions.setSubmitting(true);
					const res = await axios.patch(
						`superadmin/debit_admin_issuing_balance/${
							values.administrator
						}/USD/${
							values.amount
						}/${environment}?is_wallet_balance_operation=${true}`,
						{
							description: values.description,
						},
						{
							headers: {
								Token: `Bearer ${token}`,
							},
						}
					);

					formik.resetForm();
					setSuccess(true);
					handleCancel();
				} catch (err) {
					setIsError(true);
				} finally {
					actions.setSubmitting(false);
					setTimeout(() => {
						setIsError(false);
						setSuccess(false);
					}, 3000);
				}
			};
			callApiWithToken(debitAdmin);
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
			<h1 className="profile-heading">Debit Admin</h1>
			<form className="profile-form-area">
				<div className="auth-input-container">
					<AsyncSelect
						url={
							"https://bridgecard-issuing-app.com/admin-auth-service-v2/v1/superadmin/administrators"
						}
						customStyles={customStyles}
						placeholder="Administrators"
						reload={true}
						isDisabled={!edit}
						handleChange={e => {
							formik.setFieldValue("administrator", e?.value);
						}}
					/>
				</div>

				<div className="auth-input-container">
					<input
						type="amount"
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
						<p> An error occured, please try again</p>
					</div>
				)}

				{success && (
					<div className="success-message">
						<p> Admin topped up successfully</p>
					</div>
				)}

				<div className="profile-cta">
					<button
						type="button"
						className="edit-cta"
						onClick={edit ? handleCancel : editProfile}
					>
						{edit ? "Cancel" : "Debit admin"}
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
			</form>
		</main>
	);
};
