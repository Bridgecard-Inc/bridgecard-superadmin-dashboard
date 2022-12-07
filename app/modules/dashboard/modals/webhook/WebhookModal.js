import React, { useState } from "react";
import styles from "./WebhookModal.module.scss";
import { motion } from "framer-motion";
import SVG from "react-inlinesvg";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useAuthContext } from "../../../../firebase/AuthContext";
import { callApiWithToken } from "../../../../../_helpers/functions/callApi";

export const WebhookModal = () => {
	const context = useAuthContext();
	const { isWebhookModalVisible, setIsWebhookModalVisible, webHookRow } =
		context;
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const closeModal = () => {
		setIsWebhookModalVisible(false);
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

	console.log(webHookRow);

	const verifyRequest = async token => {
		setIsSubmitting(true);
		try {
			const res = await axios.patch(
				`superadmin/verify-admin-kyc-information/${webHookRow.id}`,
				{},
				{
					headers: {
						Token: `Bearer ${token}`,
					},
				}
			);
			setSuccess(true);
		} catch (err) {
			setError(true);
		} finally {
			setIsSubmitting(false);
			setTimeout(() => {
				setError(false);
			}, 4000);
		}
	};

	return (
		isWebhookModalVisible && (
			<motion.div className={styles.modalWrapper}>
				<motion.div
					className={styles.modalCard}
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<div className={styles.modalHeader}>
						<h3>Request details</h3>
						<div className={styles.cancel} onClick={closeModal}>
							{" "}
							<SVG src={"../media/svg/send/cancel.svg"} />
						</div>
					</div>

					<div className={styles.modalBody}>
						<div className={styles.modalDeets}>
							<div className={styles.deets}>
								<h4>Url</h4>
								<p>{webHookRow?.webhook_url}</p>
							</div>
							<div className={styles.deets}>
								<h4>Transaction Volume</h4>
								<p>{webHookRow?.transaction_volume_in_local_currency} </p>
							</div>
						</div>

						<div className={styles.modalDeets}>
							<h3>Office Details</h3>
							<div className={styles.deets}>
								<h4>Address</h4>
								<p>{webHookRow?.kyc_information?.office_address?.address}</p>
							</div>
							<div className={styles.deets}>
								<h4>Country</h4>
								<p>{webHookRow?.kyc_information?.office_address?.country}</p>
							</div>
							<div className={styles.deets}>
								<h4>State</h4>
								<p>{webHookRow?.kyc_information?.office_address?.state}</p>
							</div>
							<div className={styles.deets}>
								<h4>Postal code</h4>
								<p>
									{webHookRow?.kyc_information?.office_address?.postal_code}
								</p>
							</div>
						</div>

						<div className={styles.modalDeets}>
							<h3>Registered Details</h3>
							<div className={styles.deets}>
								<h4>Address</h4>
								<p>
									{webHookRow?.kyc_information?.registered_address?.address}
								</p>
							</div>
							<div className={styles.deets}>
								<h4>Country</h4>
								<p>
									{webHookRow?.kyc_information?.registered_address?.country}
								</p>
							</div>
							<div className={styles.deets}>
								<h4>State</h4>
								<p>{webHookRow?.kyc_information?.registered_address?.state}</p>
							</div>
							<div className={styles.deets}>
								<h4>Postal code</h4>
								<p>
									{webHookRow?.kyc_information?.registered_address?.postal_code}
								</p>
							</div>
						</div>

						<div className={styles.modalDeets}>
							<h3>Director Details</h3>
							<div className={styles.deets}>
								<h4>Address</h4>
								<p>{webHookRow?.kyc_information?.director_address?.address}</p>
							</div>
							<div className={styles.deets}>
								<h4>Country</h4>
								<p>{webHookRow?.kyc_information?.director_address?.country}</p>
							</div>
							<div className={styles.deets}>
								<h4>State</h4>
								<p>{webHookRow?.kyc_information?.director_address?.state}</p>
							</div>
							<div className={styles.deets}>
								<h4>Postal code</h4>
								<p>
									{webHookRow?.kyc_information?.director_address?.postal_code}
								</p>
							</div>
						</div>

						<div className={styles.modalDeets}>
							<h3>Kyc Documents</h3>
							<div className={styles.kycDeets}>
								<h4>CAC registration document</h4>
								{webHookRow?.kyc_information?.cac_regisration_document.includes(
									".pdf?"
								) ? (
									<a
										href={webHookRow?.kyc_information?.cac_regisration_document}
										target="_blank"
										rel="noreferrer"
									>
										Cac registration document
									</a>
								) : (
									<img
										src={webHookRow?.kyc_information?.cac_regisration_document}
										alt=""
									/>
								)}
							</div>

							<div className={styles.kycDeets}>
								<h4>Utility bill</h4>
								{webHookRow?.kyc_information?.utility_bill.includes(".pdf?") ? (
									<a
										href={webHookRow?.kyc_information?.utility_bill}
										target="_blank"
										rel="noreferrer"
									>
										Utility bill
									</a>
								) : (
									<img src={webHookRow?.kyc_information?.utility_bill} alt="" />
								)}
							</div>

							<div className={styles.kycDeets}>
								<h4>Memart</h4>
								{webHookRow?.kyc_information?.memart.includes(".pdf?") ? (
									<a
										href={webHookRow?.kyc_information?.memart}
										target="_blank"
										rel="noreferrer"
									>
										Memart
									</a>
								) : (
									<img src={webHookRow?.kyc_information?.memart} alt="" />
								)}
							</div>

							<div className={styles.kycDeets}>
								<h4>Director Id</h4>
								{webHookRow?.kyc_information?.director_id?.id_image.includes(
									".pdf?"
								) ? (
									<a
										href={webHookRow?.kyc_information?.director_id?.id_image}
										target="_blank"
										rel="noreferrer"
									>
										Director Id Image
									</a>
								) : (
									<img
										src={webHookRow?.kyc_information?.director_id?.id_image}
										alt=""
									/>
								)}
							</div>
						</div>

						{error && (
							<div className="error-message">
								<p> An error occured, please try again</p>
							</div>
						)}

						{success && (
							<div className="success-message">
								<p> Kyc verified successfully</p>
							</div>
						)}
					</div>
					<div className={styles.modalFooter}>
						<div></div>
						<button
							className="delete-btn"
							type="button"
							onClick={() => {
								callApiWithToken(verifyRequest);
							}}
						>
							{" "}
							{isSubmitting ? (
								<ThreeDots color="#141416" height={40} width={40} />
							) : (
								"Verify Request"
							)}
						</button>
					</div>
				</motion.div>
			</motion.div>
		)
	);
};
