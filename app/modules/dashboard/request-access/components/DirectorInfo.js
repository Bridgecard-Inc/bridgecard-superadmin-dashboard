import React, { useId, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { data } from "../../../authetication/countries";
import FileInput from "../../../../utils/fileInput";
import { storage } from "../../../../firebase/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import {
	setProgress,
	setDirectorInfo,
} from "../../../../redux/slices/app/appSlice";
import { useAuthContext } from "../../../../firebase/AuthContext";

export const DirectorInfo = () => {
	const dispatch = useDispatch();
	const { progress, directorInfo } = useSelector(state => state.app);
	const [idImage, setidImage] = useState({ url: null, fileObj: null });
	const [idImageUrl, setIdImageUrl] = useState("");
	const [uploadArray, setUploadArray] = useState([]);
	const [message, setMessage] = useState("");
	const context = useAuthContext();

	const { userId } = context;
	const initialValues = {
		director_firstname: "",
		director_lastname: "",
		country: "",
		state: "",
		city: "",
		lga: "",
		address: "",
		house_number: "",
		postal_code: "",
		id_no: "",
		bvn: "",
	};

	const validationSchema = Yup.object().shape({
		country: Yup.string().required("This is a required field"),
		state: Yup.string().required("This is a required field"),
		city: Yup.string().required("This is a required field"),
		lga: Yup.string().required("This is a required field"),
		address: Yup.string().required("This is a required field"),
		house_number: Yup.string().required("This is a required field"),
		postal_code: Yup.string().required("This is a required field"),
		director_firstname: Yup.string().required("This is a required field"),
		director_lastname: Yup.string().required("This is a required field"),
		id_no: Yup.string().required("This is a required field"),
		bvn: Yup.string()
			.min(11, "Should be 11 digits")
			.max(11, "Should be 11 digits"),
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

	const firebaseUpload = async (image, fn, setFn) => {
		if (!image) return;
		new Promise((resolve, reject) => {
			const sotrageRef = ref(storage, `admin_kyc_info/${userId}/${image.name}`);
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

	const handleCreateProfile = async values => {
		dispatch(setProgress(progress + 1));
	};

	const formik = useFormik({
		initialValues: directorInfo.length === 0 ? initialValues : directorInfo,
		validationSchema: validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, actions) => {
			let currentVal = {
				...values,
				id_image: idImageUrl,
			};

			try {
				await dispatch(setDirectorInfo(currentVal));
				handleCreateProfile();
			} catch (err) {
			} finally {
			}
		},
	});

	return (
		<main className="access-card">
			<h1 className="big-heading-d">{`Company Director’s Info`}</h1>
			<p className="small-p">Please fill in your details.</p>
			<form>
				<div className="grid-input">
					<div className="auth-input-container">
						<input
							type="text"
							className={
								formik.touched.director_firstname &&
								formik.errors.director_firstname
									? "auth-input error-input"
									: "auth-input"
							}
							placeholder="First Name"
							{...formik.getFieldProps("director_firstname")}
						/>
						{formik.touched.director_firstname &&
							formik.errors.director_firstname && (
								<p className="error-m">{formik.errors.director_firstname}</p>
							)}
					</div>

					<div className="auth-input-container">
						<input
							type="text"
							className={
								formik.touched.director_lastname &&
								formik.errors.director_lastname
									? "auth-input error-input"
									: "auth-input"
							}
							placeholder="First Name"
							{...formik.getFieldProps("director_lastname")}
						/>
						{formik.touched.director_lastname &&
							formik.errors.director_lastname && (
								<p className="error-m">{formik.errors.director_lastname}</p>
							)}
					</div>
				</div>
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

				{formik.values.country === "NG" && (
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
					<input
						type="text"
						className={
							formik.touched.id_no && formik.errors.id_no
								? "auth-input error-input"
								: "auth-input"
						}
						placeholder="Identification Number"
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
			</form>

			<button
				className="auth-btn"
				type="button"
				disabled={
					!(formik.isValid || formik.isSubmitting) || uploadArray.length === 0
				}
				onClick={formik.handleSubmit}
			>
				Proceed
			</button>
		</main>
	);
};
