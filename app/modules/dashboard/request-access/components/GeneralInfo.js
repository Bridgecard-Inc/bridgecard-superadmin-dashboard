import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
	setProgress,
	setGeneralInfo,
} from "../../../../redux/slices/app/appSlice";

export const GeneralInfo = () => {
	const [trancVolume, setTrancVolume] = useState(0);
	const [totalUsers, setTotalUsers] = useState(0);
	const dispatch = useDispatch();
	const { progress, generalInfo } = useSelector(state => state.app);

	const handleCreateProfile = async values => {
		dispatch(setProgress(progress + 1));
	};

	const initialValues = {
		transaction_volume_in_local_currency: "",
		total_current_users: "",
		webhook_url: "",
	};

	const validationSchema = Yup.object().shape({
		transaction_volume_in_local_currency: Yup.number().required(
			"This is a required field"
		),
		total_current_users: Yup.number().required("This is required field"),
		webhook_url: Yup.string().required("This is a required field"),
	});

	const formik = useFormik({
		initialValues: generalInfo.length === 0 ? initialValues : generalInfo,
		validationSchema: validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, actions) => {
			try {
				await dispatch(setGeneralInfo(values));
				handleCreateProfile();
			} catch (err) {
			} finally {
			}
		},
	});

	const formatStr = x => {
		if (typeof x === "string") {
			return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		} else {
			return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	};

	return (
		<main className="access-card">
			<h1 className="big-heading-d">General Information</h1>
			<p className="small-p">Please fill in your details.</p>
			<form>
				<div className="auth-input-container">
					<input
						type="number"
						className={
							formik.touched.transaction_volume_in_local_currency &&
							formik.errors.transaction_volume_in_local_currency
								? "auth-input error-input"
								: "auth-input"
						}
						placeholder="Current monthly transaction volume($)"
						{...formik.getFieldProps("transaction_volume_in_local_currency")}
					/>
					{formik.errors.transaction_volume_in_local_currency && (
						<p className="error-m">
							{formik.touched.transaction_volume_in_local_currency &&
								formik.errors.transaction_volume_in_local_currency}
						</p>
					)}
				</div>
				<div className="auth-input-container">
					<input
						type="number"
						className={
							formik.touched.total_current_users &&
							formik.errors.total_current_users
								? "auth-input error-input"
								: "auth-input"
						}
						placeholder="Total number of current users"
						{...formik.getFieldProps("total_current_users")}
					/>
					{formik.touched.total_current_users &&
						formik.errors.total_current_users && (
							<p className="error-m">{formik.errors.total_current_users}</p>
						)}
				</div>
				<div className="auth-input-container">
					<input
						type="text"
						className={
							formik.touched.webhook_url && formik.errors.webhook_url
								? "auth-input error-input"
								: "auth-input"
						}
						placeholder="Enter webhook URL"
						{...formik.getFieldProps("webhook_url")}
					/>
					{formik.touched.webhook_url && formik.errors.webhook_url && (
						<p className="error-m">{formik.errors.webhook_url}</p>
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
