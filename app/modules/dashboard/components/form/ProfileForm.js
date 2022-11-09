import Select from "react-select";
import React, { useId, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { callApiWithToken } from "../../../../utils/callApiWithToken";

export const ProfileForm = ({ adminDetails, profileEdited }) => {
	const currency = [{ value: "USD", label: "USD" }];
	const [edit, setEdit] = useState(false);
	const [error, setIsError] = useState(false);

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
		first_name: adminDetails.first_name,
		last_name: adminDetails.last_name,
		country: adminDetails.country,
		company_name: adminDetails.company_name,
		work_email: adminDetails.work_email,
		password: adminDetails.password,
		intl_phone_number: adminDetails.intl_phone_number,
		currency: "USD",
		webhook_url: adminDetails.webhook_url,
	};

	const validationSchema = Yup.object().shape({
		first_name: Yup.string().required(""),
		last_name: Yup.string().required(""),
		intl_phone_number: Yup.string().required(""),
		work_email: Yup.string(),
		webhook_url: Yup.string().required(""),
	});

	const formik = useFormik({
		initialValues,
		validationSchema: validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, actions) => {
			const {
				first_name,
				last_name,
				intl_phone_number,
				work_email,
				webhook_url,
			} = values;
			const editedValues = {
				first_name,
				last_name,
				intl_phone_number,
				work_email,
				webhook_url,
			};

			const changeProfileDeets = async token => {
				try {
					actions.setSubmitting(true);
					const res = await axios.patch("/admin/", editedValues, {
						headers: {
							Token: `Bearer ${token}`,
						},
					});

					profileEdited();
				} catch (err) {
					setIsError(true);
				} finally {
					actions.setSubmitting(false);
					setTimeout(() => {
						setIsError(false);
					}, 3000);
				}
			};
			callApiWithToken(changeProfileDeets);
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
				<div className="grid-input">
					<div className="auth-input-container">
						<input
							type="text"
							className="auth-input"
							placeholder="First Name"
							disabled={!edit}
							{...formik.getFieldProps("first_name")}
						/>
					</div>

					<div className="auth-input-container">
						<input
							type="text"
							className="auth-input"
							placeholder="Last Name"
							disabled={!edit}
							{...formik.getFieldProps("last_name")}
						/>
					</div>
				</div>

				<div className="auth-input-container">
					<input
						type="text"
						className="auth-input"
						placeholder="Work Email"
						disabled={!edit}
						{...formik.getFieldProps("work_email")}
					/>
					<p className="profile-info">
						We’ll use this mail if we need to contact you about your account.
					</p>
				</div>

				<div className="auth-input-container">
					<input
						type="text"
						className="auth-input"
						placeholder="Company Name"
						disabled
						{...formik.getFieldProps("company_name")}
					/>
				</div>

				<div className="auth-input-container">
					<input
						type="text"
						className="auth-input"
						placeholder=" Phone Number"
						disabled={!edit}
						{...formik.getFieldProps("intl_phone_number")}
					/>
				</div>

				<div className="auth-input-container">
					<input
						type="text"
						className="auth-input"
						placeholder="Webhook url"
						disabled={!edit}
						{...formik.getFieldProps("webhook_url")}
					/>
				</div>

				<div className="auth-input-container">
					<Select
						styles={customStyles}
						placeholder="Currency"
						options={currency}
						instanceId={useId()}
						value={currency}
					/>
				</div>

				{error && (
					<div className="error-message">
						<p> An error occured, please try again</p>
					</div>
				)}
			</form>
			<div className="profile-cta">
				<button
					className="edit-cta"
					onClick={edit ? handleCancel : editProfile}
				>
					{edit ? "Cancel" : "Edit Profile"}
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
