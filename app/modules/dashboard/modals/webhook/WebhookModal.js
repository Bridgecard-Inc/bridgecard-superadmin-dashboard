import React from "react";
import styles from "./WebhookModal.module.scss";
import { motion } from "framer-motion";
import SVG from "react-inlinesvg";
import { useAuthContext } from "../../../../firebase/AuthContext";

export const WebhookModal = () => {
	const context = useAuthContext();
	const { isWebhookModalVisible, setIsWebhookModalVisible, webHookRow } =
		context;
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
										href={
											webHookRow?.kyc_information?.cac_registration_document
										}
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
					</div>
				</motion.div>
			</motion.div>
		)
	);
};
