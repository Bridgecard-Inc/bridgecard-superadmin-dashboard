import React, { useState } from "react";
import styles from "./Bvn.module.scss";
import { motion } from "framer-motion";
import SVG from "react-inlinesvg";
import { useAuthContext } from "../../../../firebase/AuthContext";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { callApiWithToken } from "../../../../../_helpers/functions/callApi";

export const BvnModal = () => {
	const [message, setMessage] = useState("");
	const [bvnDeets, setBvnDeets] = useState(null);

	const [errMessage, setErrMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState(false);

	const context = useAuthContext();
	const { environment, admindetails } = useSelector(state => state.app);

	const { setBvnModal, bvnModal } = context;

	const closeModal = () => {
		setMessage("");
		setBvnDeets(null);
		setBvnModal(false);
		formik.resetForm();
	};
	const containerVariants = {
		hidden: {
			y: "-200px",
			opacity: 0,
		},
		visible: {
			y: 0,
			opacity: 1,
			transition: { delay: 0, duration: 0.5 },
		},
		exit: {
			y: "-200px",
			opacity: 0,
			transition: { ease: "easeInOut" },
		},
	};

	const initialValues = {
		bvn: "",
	};

	const validationSchema = Yup.object().shape({
		bvn: Yup.string()
			.min(11, "Should be 11 digits")
			.max(11, "Should be 11 digits")
			.required("BVN is requiired"),
	});

	const formik = useFormik({
		initialValues,
		validationSchema: validationSchema,
		onSubmit: async (values, actions) => {
			setIsSubmitting(true);

			const verifyBvn = async token => {
				setIsSubmitting(true);
				try {
					const res = await axios.get(`support/bvn/?bvn=${values.bvn}`, {
						headers: {
							Token: `Bearer ${token}`,
						},
					});
					console.log("first", res);
					setBvnDeets(res.data.data);
				} catch (err) {
					console.log("err", err);
					// setError(true);
					// setErrMessage(err.response?.data?.message);
				} finally {
					setIsSubmitting(false);
					setTimeout(() => {
						setError(false);
					}, 4000);
				}
			};

			const verifyKYC = async token => {
				setIsSubmitting(true);
				try {
					const res = await axios.get(`support/bvn/verify?bvn=${values.bvn}`, {
						headers: {
							Token: `Bearer ${token}`,
						},
					});
					console.log("first", res);
					setMessage(res.data.message);
					formik.resetForm();
				} catch (err) {
					console.log("err", err);
					// setError(true);
					// setErrMessage(err.response?.data?.message);
				} finally {
					setIsSubmitting(false);
					setTimeout(() => {
						setError(false);
					}, 4000);
				}
			};

			bvnDeets ? callApiWithToken(verifyKYC) : callApiWithToken(verifyBvn);
		},
	});

	return (
		bvnModal && (
			<motion.div className={styles.modalWrapper}>
				<motion.div
					className={styles.modalCard}
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<div className={styles.modalHeader}>
						<h3>Create card holder</h3>
						<div className={styles.cancel} onClick={closeModal}>
							{" "}
							<SVG src={"../media/svg/send/cancel.svg"} />
						</div>
					</div>

					<div className={styles.modalBodyForm}>
						<form className={styles.modalForm}>
							<div className="auth-input-container">
								<label>BVN</label>
								<input
									type="text"
									className={
										formik.touched.bvn && formik.errors.bvn
											? "auth-input error-input"
											: "auth-input"
									}
									placeholder="Enter BVN"
									{...formik.getFieldProps("bvn")}
								/>
							</div>
							{error && (
								<div className="error-message">
									<p> {errMessage}</p>
								</div>
							)}
							{bvnDeets && (
								<div className={styles.modalDeets}>
									<h3>Bvn details</h3>
									<div className={styles.deets}>
										<h4>First name</h4>
										<p>{bvnDeets?.first_name}</p>
									</div>
									<div className={styles.deets}>
										<h4>Middle name</h4>
										<p>{bvnDeets?.middle_name}</p>
									</div>
									<div className={styles.deets}>
										<h4>Last name</h4>
										<p>{bvnDeets?.last_name}</p>
									</div>

									<h3>Bvn image</h3>
									<img
										src={`data:image/jpeg;base64, ${bvnDeets?.base_64_image}`}
										alt="Bvn Image"
									/>
								</div>
							)}
							{message && (
								<div className="success-message">
									<p> {message}</p>
								</div>
							)}
							{bvnDeets ? (
								<button
									className="modal-form-btn"
									type="button"
									disabled={!formik.isValid || formik.isSubmitting}
									onClick={formik.handleSubmit}
								>
									{" "}
									{isSubmitting ? (
										<ThreeDots color="#141416" height={40} width={40} />
									) : (
										"Verify KYC"
									)}
								</button>
							) : (
								<button
									className="modal-form-btn"
									type="button"
									disabled={!formik.isValid || formik.isSubmitting}
									onClick={formik.handleSubmit}
								>
									{" "}
									{isSubmitting ? (
										<ThreeDots color="#141416" height={40} width={40} />
									) : (
										"Verify Bvn"
									)}
								</button>
							)}
						</form>
					</div>
				</motion.div>
			</motion.div>
		)
	);
};
