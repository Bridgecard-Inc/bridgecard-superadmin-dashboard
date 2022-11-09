import React, { useState } from "react";
import styles from "./CardsModal.module.scss";
import { motion } from "framer-motion";
import SVG from "react-inlinesvg";
import Select from "react-select";
import { useAuthContext } from "../../../../firebase/AuthContext";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MetaForm } from "./MetaForm";

export const CreateCardModal = () => {
	const [metaData, setMetaData] = useState([]);
	const [message, setMessage] = useState("");
	const [error, setError] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const context = useAuthContext();
	const { environment, admindetails } = useSelector(state => state.app);
	const url =
		environment === "production"
			? "https://bridgecard-card-manager-service-vbdndeke7q-uc.a.run.app/v1/issuing/cards/create_card"
			: "https://bridgecard-card-manager-service-vbdndeke7q-uc.a.run.app/v1/issuing/sandbox/cards/create_card";
	const {
		isCreateNewCardModalVisible,
		setIsCreateNewCardModalVisible,
		cardHolderRow,
		cardChanged,
	} = context;
	const token =
		environment === "production"
			? admindetails.live_authorization_token
			: admindetails.test_authorization_token;

	const setMeta = val => {
		setMetaData(val);
	};

	const closeModal = () => {
		setIsCreateNewCardModalVisible(false);
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

	const cardType = [{ label: "Virtual Card", value: "virtual" }];
	const currency = [{ label: "USD", value: "USD" }];
	const cardBrand = [{ label: "VISA", value: "Visa" }];

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
		card_type: "",
		card_brand: "",
		card_currency: "",
	};

	const validationSchema = Yup.object().shape({
		card_type: Yup.string().required("This a required field"),
		card_brand: Yup.string().required("This is a required field"),
		card_currency: Yup.string().required("This is a required field"),
	});

	const formik = useFormik({
		initialValues,
		validationSchema: validationSchema,
		onSubmit: async (values, actions) => {
			setIsSubmitting(true);
			const obj = metaData.reduce((accumulator, value) => {
				return { ...accumulator, [value.name]: value.value };
			}, {});

			const payload = {
				...values,
				cardholder_id: cardHolderRow.cardholder_id,
				meta_data: obj,
			};
			const createCard = async () => {
				setIsSubmitting(true);
				try {
					const res = await axios.post(url, payload, {
						headers: {
							Token: `Bearer ${token}`,
						},
					});

					closeModal();
					cardChanged();
				} catch (err) {
					setError(true);
					setMessage(err.response?.data?.message);
				} finally {
					setIsSubmitting(false);
					setTimeout(() => {
						setError(false);
					}, 4000);
				}
			};

			createCard();
		},
	});

	return (
		isCreateNewCardModalVisible && (
			<motion.div className={styles.modalWrapper}>
				<motion.div
					className={styles.modalCard}
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<div className={styles.modalHeader}>
						<h3>Create new card </h3>
						<div className={styles.cancel} onClick={closeModal}>
							{" "}
							<SVG src={"../media/svg/send/cancel.svg"} />
						</div>
					</div>

					<div className={styles.modalBodyForm}>
						<form className={styles.modalForm}>
							<h3 className={styles.formSectionHeading}>Card Details</h3>

							<div className="auth-input-container">
								<Select
									styles={customStyles}
									placeholder="Card Type"
									options={cardType}
									isSearchable={true}
									instanceId={1}
									onChange={e => formik.setFieldValue("card_type", e?.value)}
								/>
								{formik.touched.card_type && formik.errors.card_type && (
									<p className="error-m">{formik.errors.card_type}</p>
								)}
							</div>

							<div className="auth-input-container">
								<Select
									styles={customStyles}
									placeholder="Card Brand"
									options={cardBrand}
									isSearchable={true}
									instanceId={1}
									onChange={e => formik.setFieldValue("card_brand", e?.value)}
								/>
								{formik.touched.card_brand && formik.errors.card_brand && (
									<p className="error-m">{formik.errors.card_brand}</p>
								)}
							</div>

							<div className="auth-input-container">
								<Select
									styles={customStyles}
									placeholder="Card Currency"
									options={currency}
									isSearchable={true}
									instanceId={1}
									onChange={e =>
										formik.setFieldValue("card_currency", e?.value)
									}
								/>
								{formik.touched.card_currency &&
									formik.errors.card_currency && (
										<p className="error-m">{formik.errors.card_currency}</p>
									)}
							</div>

							<MetaForm setMeta={setMeta} />

							{error && (
								<div className="error-message">
									<p> {message}</p>
								</div>
							)}

							<button
								className="modal-form-btn"
								type="button"
								disabled={!(formik.isValid || formik.isSubmitting)}
								onClick={formik.handleSubmit}
							>
								{" "}
								{isSubmitting ? (
									<ThreeDots color="#141416" height={40} width={40} />
								) : (
									"Create card"
								)}
							</button>
						</form>
					</div>
				</motion.div>
			</motion.div>
		)
	);
};
