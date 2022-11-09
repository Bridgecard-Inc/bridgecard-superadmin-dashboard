import React, { useState } from "react";
import SVG from "react-inlinesvg";
import { passwordReset } from "../../firebase/firebase";
import { ThreeDots } from "react-loader-spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { Modal } from "../../utils/modal";

export const ForgotPassword = () => {
	const router = useRouter();
	const [error, setError] = useState(false);
	const [message, setMessage] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const resetPassword = async email => {
		setIsSubmitting(true);
		try {
			await passwordReset(email);
			setShowModal(true);
		} catch (err) {
		} finally {
			setIsSubmitting(false);
		}
	};

	const closeModal = () => {
		setShowModal(false);
	};

	const initialValues = {
		work_email: "",
	};

	const validationSchema = Yup.object().shape({
		work_email: Yup.string().email().required(""),
	});

	const formik = useFormik({
		initialValues,
		validationSchema: validationSchema,
	});

	return (
		<main className="auth-wrapper">
			<div className={showModal ? "auth-card no-scroll" : "auth-card"}>
				<div className="fancy-heading">
					<div onClick={() => router.push("/login")}>
						{" "}
						<SVG src={"../media/svg/send/arrow-left.svg"} />
					</div>
					<h3>Forgot password</h3>
				</div>

				<div className="payment-header">
					<div>
						<SVG src={"../media/svg/send/check.svg"} />
					</div>
					<h3>Forgot Password? </h3>
					<p>
						No worries, we’ll send you reset instructions. Enter your registered
						email address below.
					</p>
				</div>

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

					{error && (
						<div className="error-message">
							<p>{formatMsg(message)}</p>
						</div>
					)}

					<button
						className="auth-btn"
						type="button"
						disabled={!((formik.isValid && formik.dirty) || isSubmitting)}
						onClick={() => resetPassword(formik.values.work_email)}
					>
						{isSubmitting ? (
							<ThreeDots color="#141416" height={40} width={40} />
						) : (
							"Reset password"
						)}
					</button>
				</form>
				{showModal && (
					<Modal
						closeModal={closeModal}
						heading={"Reset email sent"}
						text={
							"The link to rest your pasword has been sent to your email address"
						}
					/>
				)}
			</div>
		</main>
	);
};
