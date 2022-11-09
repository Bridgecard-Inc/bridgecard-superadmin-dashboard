import React, { useId } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { data } from "../../../authetication/countries";
import { useDispatch, useSelector } from "react-redux";
import {
	setProgress,
	setRegisteredAddress,
} from "../../../../redux/slices/app/appSlice";

export const RegisteredAddress = () => {
	const dispatch = useDispatch();
	const { progress, registeredAddress } = useSelector(state => state.app);
	const initialValues = {
		country: "",
		state: "",
		city: "",
		lga: "",
		address: "",
		house_number: "",
		postal_code: "",
	};

	const validationSchema = Yup.object().shape({
		country: Yup.string().required("This is a required field"),
		state: Yup.string().required("This is a required field"),
		city: Yup.string().required("This is a required field"),
		lga: Yup.string().required("This is a required field"),
		address: Yup.string().required("This is a required field"),
		house_number: Yup.string().required("This is a required field"),
		postal_code: Yup.string().required("This is a required field"),
	});

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

	const handleCreateProfile = async values => {
		dispatch(setProgress(progress + 1));
	};

	const formik = useFormik({
		initialValues:
			registeredAddress.length === 0 ? initialValues : registeredAddress,
		validationSchema: validationSchema,
		enableReinitialize: true,
		onSubmit: async values => {
			try {
				dispatch(setRegisteredAddress(values));
				handleCreateProfile();
			} catch (err) {
			} finally {
			}
		},
	});

	return (
		<main className="access-card">
			<h1 className="big-heading-d">Registered Business Address</h1>
			<p className="small-p">Please fill in your details.</p>
			<form>
				<div className="auth-input-container">
					<Select
						styles={customStyles}
						placeholder="Select Country"
						options={data}
						isSearchable={true}
						instanceId={useId()}
						onChange={e => formik.setFieldValue("country", e?.value)}
					/>
				</div>
				<div className="auth-input-container">
					<input
						type="text"
						className={
							formik.touched.state && formik.errors.state
								? "auth-input error-input"
								: "auth-input"
						}
						placeholder="State"
						{...formik.getFieldProps("state")}
					/>
					{formik.touched.state && formik.errors.state && (
						<p className="error-m">{formik.errors.state}</p>
					)}
				</div>
				<div className="auth-input-container">
					<input
						type="text"
						className={
							formik.touched.city && formik.errors.city
								? "auth-input error-input"
								: "auth-input"
						}
						placeholder="City"
						{...formik.getFieldProps("city")}
					/>
					{formik.touched.city && formik.errors.city && (
						<p className="error-m">{formik.errors.city}</p>
					)}
				</div>
				<div className="auth-input-container">
					<input
						type="text"
						className={
							formik.touched.lga && formik.errors.lga
								? "auth-input error-input"
								: "auth-input"
						}
						placeholder="Lga"
						{...formik.getFieldProps("lga")}
					/>
					{formik.touched.lga && formik.errors.lga && (
						<p className="error-m">{formik.errors.lga}</p>
					)}
				</div>
				<div className="auth-input-container">
					<input
						type="text"
						className={
							formik.touched.address && formik.errors.address
								? "auth-input error-input"
								: "auth-input"
						}
						placeholder="Office Address"
						{...formik.getFieldProps("address")}
					/>
					{formik.touched.address && formik.errors.address && (
						<p className="error-m">{formik.errors.address}</p>
					)}
				</div>
				<div className="auth-input-container">
					<input
						type="text"
						className={
							formik.touched.house_number && formik.errors.house_number
								? "auth-input error-input"
								: "auth-input"
						}
						placeholder="House Number"
						{...formik.getFieldProps("house_number")}
					/>
					{formik.touched.house_number && formik.errors.house_number && (
						<p className="error-m">{formik.errors.house_number}</p>
					)}
				</div>
				<div className="auth-input-container">
					<input
						type="text"
						className={
							formik.touched.postal_code && formik.errors.postal_code
								? "auth-input error-input"
								: "auth-input"
						}
						placeholder="Postal code"
						{...formik.getFieldProps("postal_code")}
					/>
					{formik.touched.postal_code && formik.errors.postal_code && (
						<p className="error-m">{formik.errors.postal_code}</p>
					)}
				</div>
			</form>

			<button
				className="auth-btn"
				type="button"
				disabled={!(formik.isValid || formik.isSubmitting)}
				onClick={formik.handleSubmit}
			>
				Proceed
			</button>
		</main>
	);
};
