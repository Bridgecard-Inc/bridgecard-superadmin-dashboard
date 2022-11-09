import React, { useState } from "react";
import FileInput from "../../../../utils/fileInput";
import { storage } from "../../../../firebase/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { setProgress } from "../../../../redux/slices/app/appSlice";
import { useAuthContext } from "../../../../firebase/AuthContext";
import { Modal } from "../../../../utils/modal";
import axios from "axios";
import { callApiWithToken } from "../../../../utils/callApiWithToken";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/router";

export const UploadDoc = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const {
		progress,
		generalInfo,
		currentAddress,
		registeredAddress,
		directorInfo,
	} = useSelector(state => state.app);
	const [cac, setCac] = useState({ url: null, fileObj: null });
	const [error, setError] = useState(false);
	const [message, setMessage] = useState("");
	const [cacUrl, setCacUrl] = useState("");
	const [memart, setMemart] = useState({ url: null, fileObj: null });
	const [memartUrl, setMemartUrl] = useState("");
	const [uploadArray, setUploadArray] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const context = useAuthContext();

	const closeModal = () => {
		setShowModal(false);
		dispatch(setProgress(0));
		router.push("/dashboard");
	};
	const { userId } = context;

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

	const handleSubmit = () => {
		let obj = {
			kyc_information: {
				utility_bill: currentAddress.utility_bill,
				office_address: {
					address: currentAddress.address,
					lga: currentAddress.lga,
					city: currentAddress.city,
					state: currentAddress.state,
					country: currentAddress.country,
					postal_code: currentAddress.postal_code,
					house_no: currentAddress.house_number,
				},
				registered_address: {
					address: registeredAddress.address,
					lga: registeredAddress.lga,
					city: registeredAddress.city,
					state: registeredAddress.state,
					country: registeredAddress.country,
					postal_code: registeredAddress.postal_code,
					house_no: registeredAddress.house_number,
				},
				cac_regisration_document: cacUrl,
				memart: memartUrl,
				director_firstname: directorInfo.director_firstname,
				director_lastname: directorInfo.director_lastname,
				director_id: {
					id_type: "NIN",
					id_no: directorInfo.id_no,
					id_image: directorInfo.id_image,
				},
				director_address: {
					address: directorInfo.address,
					lga: directorInfo.lga,
					city: directorInfo.city,
					state: directorInfo.state,
					country: directorInfo.country,
					postal_code: directorInfo.postal_code,
					house_no: directorInfo.house_number,
				},
				director_BVN: directorInfo.bvn,
			},
			transaction_volume_in_local_currency:
				generalInfo.transaction_volume_in_local_currency,
			total_current_users: generalInfo.total_current_users,
			webhook_url: generalInfo.webhook_url,
		};

		const requestAccess = async token => {
			try {
				setSubmitting(true);
				const res = await axios.post("admin/request-api-access", obj, {
					headers: {
						Token: `Bearer ${token}`,
					},
				});

				handleCreateProfile();
				setShowModal(true);
			} catch (err) {
				setError(true);
			} finally {
				setSubmitting(false);
				setTimeout(() => {
					setError(false);
				}, 3000);
			}
		};

		callApiWithToken(requestAccess);
	};

	return (
		<main className={showModal ? "access-card no-scroll" : "access-card"}>
			<h1 className="big-heading-d">{`Company’s Registration Documents`}</h1>
			<p className="small-p">Please fill in your details.</p>
			<form>
				<div className="auth-input-container">
					<label>
						{registeredAddress.country === "NG"
							? "Business CAC certificate"
							: "Incorporation Document"}
					</label>
					<FileInput
						handleChange={e => {
							handleUrlSave(e, setCacUrl, setCac);
						}}
						file={cac}
						name={"file-2"}
					/>
				</div>

				{registeredAddress.country === "NG" && (
					<div className="auth-input-container">
						<label>Business MEMART</label>
						<FileInput
							handleChange={e => {
								handleUrlSave(e, setMemartUrl, setMemart);
							}}
							file={memart}
							name={"file-1"}
						/>
					</div>
				)}
				<p className="upload-message">{message}</p>
			</form>
			{error && (
				<div className="error-message">
					<p> An error occured, please try again</p>
				</div>
			)}

			<button
				className="auth-btn"
				type="button"
				disabled={
					registeredAddress.country === "NG"
						? uploadArray.length < 2 || submitting
						: uploadArray.length < 1 || submitting
				}
				onClick={handleSubmit}
			>
				{submitting ? (
					<ThreeDots color="#141416" height={40} width={40} />
				) : (
					"Finish"
				)}
			</button>
			{showModal && (
				<Modal
					closeModal={closeModal}
					heading={"Api Access"}
					text={"Api Access Requested Successfully"}
				/>
			)}
		</main>
	);
};
