import React, { useState } from "react";
import styles from "./CardsModal.module.scss";
import { motion } from "framer-motion";
import SVG from "react-inlinesvg";
import { useAuthContext } from "../../../../firebase/AuthContext";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import Select from "react-select";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

export const FundCardModal = () => {
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const context = useAuthContext();
	const { environment, admindetails } = useSelector(state => state.app);

	const {
		isFundCardModalVisible,
		setIsFundCardModalVisible,
		cardChanged,
		cardsRow,
	} = context;

	const card_id = cardsRow?.card_id;

	const url =
		environment === "production"
			? `https://bridgecard-card-manager-service-vbdndeke7q-uc.a.run.app/v1/issuing/cards/fund_card`
			: `https://bridgecard-card-manager-service-vbdndeke7q-uc.a.run.app/v1/issuing/sandbox/cards/fund_card`;

	const token =
		environment === "production"
			? admindetails.live_authorization_token
			: admindetails.test_authorization_token;

	const closeModal = () => {
		setIsFundCardModalVisible(false);
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

	const currency = [{ label: "USD", value: "USD" }];

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
		amount: "",
		currency: "",
	};

	const validationSchema = Yup.object().shape({
		amount: Yup.string().required("This is a required field"),
		currency: Yup.string().required("This is a required field"),
	});

	const formik = useFormik({
		initialValues,
		validationSchema: validationSchema,
		onSubmit: async (values, actions) => {
			setIsSubmitting(true);

			const payload = {
				...values,
				card_id,
				actual_amount: values.amount,
				transaction_reference: uuidv4(),
			};
			const fundCard = async () => {
				setIsSubmitting(true);
				try {
					const res = await axios.patch(url, payload, {
						headers: {
							Token: `Bearer ${token}`,
						},
					});

					closeModal();
					cardChanged();
				} catch (err) {
				} finally {
					setIsSubmitting(false);
					// setTimeout(() => {
					// 	setError(false);
					// }, 3000);
				}
			};

			fundCard();
		},
	});

	return (
		isFundCardModalVisible && (
			<motion.div className={styles.deleteModalWrapper}>
				<motion.div
					className={styles.autoModalCard}
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<div className={styles.modalHeader}>
						<h2>Fund card</h2>
						<div className={styles.cancel} onClick={closeModal}>
							{" "}
							<SVG src={"../media/svg/send/cancel.svg"} />
						</div>
					</div>
					<div className={styles.autoModalBody}>
						<form className={styles.modalForm}>
							<div className="auth-input-container">
								<input
									type="number"
									className={
										formik.touched.id_no && formik.errors.id_no
											? "auth-input error-input"
											: "auth-input"
									}
									placeholder="Fund amount in cents"
									{...formik.getFieldProps("amount")}
								/>
								{formik.touched.amount && formik.errors.amount && (
									<p className="error-m">{formik.errors.amount}</p>
								)}
							</div>

							<div className="auth-input-container">
								<Select
									styles={customStyles}
									placeholder="Currency"
									options={currency}
									isSearchable={true}
									instanceId={1}
									onChange={e => formik.setFieldValue("currency", e?.value)}
								/>
								{formik.touched.currency && formik.errors.currency && (
									<p className="error-m">{formik.errors.currency}</p>
								)}
							</div>
						</form>
					</div>
					<div className={styles.modalFooter}>
						<button
							className="delete-btn"
							type="button"
							disabled={!(formik.isValid || formik.isSubmitting)}
							onClick={formik.handleSubmit}
						>
							{" "}
							{isSubmitting ? (
								<ThreeDots color="#141416" height={40} width={40} />
							) : (
								"Fund card"
							)}
						</button>
					</div>
				</motion.div>
			</motion.div>
		)
	);
};
