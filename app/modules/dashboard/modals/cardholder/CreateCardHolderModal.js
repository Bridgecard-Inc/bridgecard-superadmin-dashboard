import React, { useState } from "react";
import styles from "./Cardholder.module.scss";
import { motion } from "framer-motion";
import SVG from "react-inlinesvg";
import Select from "react-select";
import FileInput from "../../../../utils/fileInput";
import AsyncSelect from "../../../../utils/AsyncSelect";
import { storage } from "../../../../firebase/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { supportedCountries } from "../../../authetication/countries";
import { useAuthContext } from "../../../../firebase/AuthContext";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import * as All from "./data.js";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MetaForm } from "./MetaForm";

export const CreateCardHolderModal = () => {
	const [idImage, setidImage] = useState({ url: null, fileObj: null });
	const [idImageUrl, setIdImageUrl] = useState("");
	const [uploadArray, setUploadArray] = useState([]);
	const [metaData, setMetaData] = useState([]);
	const [message, setMessage] = useState("");

	const [errMessage, setErrMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState(false);

	const [reload, setReload] = useState(false);
	const context = useAuthContext();
	const { environment, admindetails } = useSelector(state => state.app);
	const url =
		environment === "production"
			? "https://bridgecard-card-manager-service-vbdndeke7q-uc.a.run.app/v1/issuing/cardholder/register_cardholder_synchronously"
			: "https://bridgecard-card-manager-service-vbdndeke7q-uc.a.run.app/v1/issuing/sandbox/cardholder/register_cardholder_synchronously";

	const {
		isCreateCardHolderModalVisible,
		setIsCreateCardHolderModalVisible,
		userId,

		cardsChanged,
	} = context;
	const token =
		environment === "production"
			? admindetails.live_authorization_token
			: admindetails.test_authorization_token;

	const firebaseUpload = async (image, fn, setFn) => {
		if (!image) return;
		new Promise((resolve, reject) => {
			const sotrageRef = ref(
				storage,
				`cardholder_idenity_images/${userId}/${image.name}`
			);
			const uploadTask = uploadBytesResumable(sotrageRef, image);

			uploadTask.on(
				"state_changed",
				snapShot => {},

				err => {
					reject(err);
				},

				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(fireBaseUrl => {
						fn(setFn, fireBaseUrl);
						resolve(fireBaseUrl);
						setMessage("Upload Successful");
					});
				}
			);
		});
	};

	const setMeta = val => {
		setMetaData(val);
	};

	const setUrl = (fn, url) => {
		if (uploadArray.includes(fn)) {
			return;
		} else {
			setUploadArray(prev => [...prev, fn]);
		}
		fn(url);
	};

	const handleUrlSave = async (e, setFn, fn) => {
		setMessage("Uploading document....");
		const _file = URL.createObjectURL(e.target.files[0]);
		const image = e.target.files[0];
		fn({
			url: _file,
			fileObj: e.target.files[0],
		});
		await firebaseUpload(image, setUrl, setFn);
	};

	const closeModal = () => {
		setIsCreateCardHolderModalVisible(false);
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
		first_name: "",
		last_name: "",
		country: "",
		address: "",
		city: "",
		state: "",
		phone: "",
		postal_code: "",
		house_no: "",
		email_address: "",
		id_type: "",
		id_no: "",

		bvn: "",

		id_country: "",
	};

	const validationSchema = Yup.object().shape({
		first_name: Yup.string().required(""),
		last_name: Yup.string().required(""),
		address: Yup.string().required(""),
		country: Yup.string().required(""),
		id_country: Yup.string().required(""),
		id_type: Yup.string().required(""),
		phone: Yup.string().required(""),
		city: Yup.string().required(""),
		state: Yup.string().required(""),
		email_address: Yup.string().required("").email(),

		id_no: Yup.string().required("This is a required field"),
		bvn: Yup.string()
			.min(11, "Should be 11 digits")
			.max(11, "Should be 11 digits"),
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
				first_name: values.first_name,
				last_name: values.last_name,
				address: {
					address: values.address,
					city: values.city,
					state: values.state,
					country: values.country,
					postal_code: values.postal_code,
					house_no: values.house_no,
				},
				phone: values.phone,
				email_address: values.email_address,
				identity: {
					id_type: values.id_type,
					id_no: values.id_no,
					id_image: idImageUrl,
					bvn: values.bvn,
					country: "NG",
				},
				meta_data: obj,
			};
			const createCardHolder = async () => {
				setIsSubmitting(true);
				try {
					const res = await axios.post(url, payload, {
						headers: {
							Token: `Bearer ${token}`,
						},
					});

					cardsChanged();
					closeModal();
				} catch (err) {
					setError(true);
					setErrMessage(err.response?.data?.message);
				} finally {
					setIsSubmitting(false);
					setTimeout(() => {
						setError(false);
					}, 4000);
				}
			};

			createCardHolder();
		},
	});

	const getStateUrl =
		environment === "production"
			? `https://bridgecard-card-manager-service-vbdndeke7q-uc.a.run.app/v1/issuing/cardholder/get_all_states?country=${formik.values.country}`
			: `https://bridgecard-card-manager-service-vbdndeke7q-uc.a.run.app/v1/issuing/sandbox/cardholder/get_all_states?country=${formik.values.country}`;

	const displayIdType = () => {
		switch (formik.values.id_country) {
			case "NG":
				return All.NigeriaIdType;
				break;
			case "BF":
				return All.BurkinaIdType;
				break;
			case "CM":
				return All.CamerounIdType;
				break;
			case "GA":
				return All.GabonIdType;
				break;
			case "GH":
				return All.GhanaIdType;
				break;
			case "IC":
				return All.IvoryIdType;
				break;
			case "KE":
				return All.KenyaIdType;
				break;
			case "MW":
				return All.MalawiIdType;
				break;
			case "ML":
				return All.MaliIdType;
				break;
			case "SN":
				return All.SenegalIdType;
				break;
			case "UG":
				return All.UgandaIdType;
				break;
			default:
				return [];
		}
	};

	return (
		isCreateCardHolderModalVisible && (
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
							<h3 className={styles.formSectionHeading}>Identification</h3>
							<div className="grid-input">
								<div className="auth-input-container">
									<input
										type="text"
										className={
											formik.touched.first_name && formik.errors.first_name
												? "auth-input error-input"
												: "auth-input"
										}
										placeholder="First Name"
										{...formik.getFieldProps("first_name")}
									/>
									{formik.touched.first_name && formik.errors.first_name && (
										<p className="error-m">{formik.errors.first_name}</p>
									)}
								</div>

								<div className="auth-input-container">
									<input
										type="text"
										className={
											formik.touched.last_name && formik.errors.last_name
												? "auth-input error-input"
												: "auth-input"
										}
										placeholder="Last Name"
										{...formik.getFieldProps("last_name")}
									/>
									{formik.touched.last_name && formik.errors.last_name && (
										<p className="error-m">{formik.errors.last_name}</p>
									)}
								</div>
							</div>
							<div className="auth-input-container">
								<Select
									styles={customStyles}
									placeholder="Select Country"
									options={supportedCountries}
									isSearchable={true}
									instanceId={1}
									onChange={e => formik.setFieldValue("id_country", e?.value)}
								/>
							</div>

							{formik.values.id_country === "NG" && (
								<div className="auth-input-container">
									<input
										type="number"
										className={
											formik.touched.bvn && formik.errors.bvn
												? "auth-input error-input"
												: "auth-input"
										}
										placeholder="Bank Verification Number"
										{...formik.getFieldProps("bvn")}
									/>
									{formik.touched.bvn && formik.errors.bvn && (
										<p className="error-m">{formik.errors.bvn}</p>
									)}
								</div>
							)}

							<div className="auth-input-container">
								<Select
									styles={customStyles}
									placeholder="ID Type"
									options={displayIdType()}
									isSearchable={true}
									instanceId={2}
									onChange={e => formik.setFieldValue("id_type", e?.value)}
								/>
							</div>

							<div className="auth-input-container">
								<input
									type="text"
									className={
										formik.touched.id_no && formik.errors.id_no
											? "auth-input error-input"
											: "auth-input"
									}
									placeholder="Identification Card Number"
									{...formik.getFieldProps("id_no")}
								/>
								{formik.touched.id_no && formik.errors.id_no && (
									<p className="error-m">{formik.errors.id_no}</p>
								)}
							</div>

							<div className="auth-input-container">
								<label>ID image</label>
								<FileInput
									handleChange={e => {
										handleUrlSave(e, setIdImageUrl, setidImage);
									}}
									file={idImage}
									name={"file-1"}
								/>
								<p className="upload-message">{message}</p>
							</div>

							<h3 className={styles.formSectionHeading}>Address</h3>
							<div className="auth-input-container">
								<Select
									styles={customStyles}
									placeholder="Select Country"
									options={supportedCountries}
									isSearchable={true}
									instanceId={1}
									onChange={e => {
										formik.setFieldValue("country", e?.label);
									}}
								/>
							</div>
							<div className="grid-input">
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
							</div>
							<div className="auth-input-container">
								<input
									type="text"
									className={
										formik.touched.address && formik.errors.address
											? "auth-input error-input"
											: "auth-input"
									}
									placeholder="Address"
									{...formik.getFieldProps("address")}
								/>
								{formik.touched.address && formik.errors.address && (
									<p className="error-m">{formik.errors.address}</p>
								)}
							</div>
							<div className="grid-input">
								<div className="auth-input-container">
									<input
										type="text"
										className={
											formik.touched.house_no && formik.errors.house_no
												? "auth-input error-input"
												: "auth-input"
										}
										placeholder="House number"
										{...formik.getFieldProps("house_no")}
									/>
									{formik.touched.house_no && formik.errors.house_no && (
										<p className="error-m">{formik.errors.house_no}</p>
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
							</div>

							<h3 className={styles.formSectionHeading}>Contact Information</h3>

							<div className="grid-input">
								<div className="auth-input-container">
									<input
										type="text"
										className={
											formik.touched.phone && formik.errors.phone
												? "auth-input error-input"
												: "auth-input"
										}
										placeholder="Phone number"
										{...formik.getFieldProps("phone")}
									/>
									{formik.touched.phone && formik.errors.phone && (
										<p className="error-m">{formik.errors.phone}</p>
									)}
								</div>

								<div className="auth-input-container">
									<input
										type="text"
										className={
											formik.touched.email_address &&
											formik.errors.email_address
												? "auth-input error-input"
												: "auth-input"
										}
										placeholder="Email address"
										{...formik.getFieldProps("email_address")}
									/>
									{formik.touched.email_address &&
										formik.errors.email_address && (
											<p className="error-m">{formik.errors.email_address}</p>
										)}
								</div>
							</div>

							<MetaForm setMeta={setMeta} />

							{error && (
								<div className="error-message">
									<p> {errMessage}</p>
								</div>
							)}

							<button
								className="modal-form-btn"
								type="button"
								disabled={
									!(formik.isValid || formik.isSubmitting) ||
									uploadArray.length === 0
								}
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
