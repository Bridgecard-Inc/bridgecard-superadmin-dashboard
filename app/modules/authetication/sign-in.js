import React, { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import firebase from "../../firebase/firebase";
import { signInWithEmail, auth } from "../../firebase/firebase";
import { useDispatch } from "react-redux";
import { logout, setAuth } from "../../redux/slices/app/appSlice";

export const Signin = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [passwordVisible, setPasswordShown] = useState(false);
	const [error, setError] = useState(false);
	const [message, setMessage] = useState("");

	const handleToggle = () => {
		setPasswordShown(prev => !prev);
	};

	const formatMsg = str => {
		const formatStr = str.split("/");
		const newStr = formatStr[1]?.replace(/-/g, " ");
		return newStr;
	};

	const initialValues = {
		work_email: "",
		password: "",
	};

	const validationSchema = Yup.object().shape({
		work_email: Yup.string().email().required(""),
		password: Yup.string().required("").min(8),
	});

	const formik = useFormik({
		initialValues,
		validationSchema: validationSchema,
		onSubmit: async (values, actions) => {
			dispatch(logout());
			const { work_email, password } = values;
			try {
				actions.setSubmitting(true);
				const res = await signInWithEmail(work_email, password);

				dispatch(setAuth(true));
				router.push("/dashboard/requests");
			} catch (err) {
				setError(true);
				setMessage(err.code);
			} finally {
				actions.setSubmitting(false);
				setTimeout(() => {
					setError(false);
				}, 3000);
			}
		},
	});
	return (
		<main className="auth-wrapper">
			<div className="auth-card ">
				<h1 className="big-heading">Sign in</h1>
				<p className="small-p">Welcome back, please fill in your details.</p>

				<form>
					<div className="auth-input-container">
						<input
							type="text"
							className={
								formik.touched.work_email && formik.errors.work_email
									? "auth-input error-input"
									: "auth-input"
							}
							placeholder="Email Address"
							{...formik.getFieldProps("work_email")}
						/>
					</div>

					<div className="auth-input-container">
						<div
							className={
								formik.touched.password && formik.errors.password
									? "auth-password-input password-error"
									: "auth-password-input"
							}
						>
							<input
								type={passwordVisible ? "text" : "password"}
								placeholder="Password"
								{...formik.getFieldProps("password")}
							/>
							<div className="password-icon" onClick={handleToggle}>
								{" "}
								{passwordVisible ? "Hide" : "Show"}
							</div>
						</div>
						<p
							className="forgot-p"
							onClick={() => router.push("/forgot-password")}
						>
							Forgot Password?
						</p>
					</div>

					{error && <div className="error-message">An Error Occured!</div>}

					<button
						className="auth-btn"
						type="button"
						disabled={
							!((formik.isValid && formik.dirty) || formik.isSubmitting)
						}
						onClick={formik.handleSubmit}
					>
						{formik.isSubmitting ? (
							<ThreeDots color="#141416" height={40} width={40} />
						) : (
							"Sign in"
						)}
					</button>
				</form>
			</div>
		</main>
	);
};
