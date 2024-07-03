import React, { useState } from "react";
import styles from "./RequestsModal.module.scss";
import { motion } from "framer-motion";
import SVG from "react-inlinesvg";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useAuthContext } from "../../../../firebase/AuthContext";
import { callApiWithToken } from "../../../../../_helpers/functions/callApi";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

export const RequestsModal = () => {
	const context = useAuthContext();
	const {
		isWebhookModalVisible,
		setIsWebhookModalVisible,
		webHookRow,
		cardChanged,
	} = context;
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
			cardChanged();
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
								<h4>ID</h4>
								<p>{webHookRow?.id}</p>
							</div>
							<div className={styles.deets}>
								<h4>
									{webHookRow?.kyc_information.signature
										? "Signature"
										: "Webhook Url"}
								</h4>
								<p>
									{webHookRow?.kyc_information.signature
										? webHookRow?.kyc_information.signature
										: webHookRow?.webhook_url}{" "}
								</p>
							</div>
						</div>

						<div className={styles.modalDeets}>
							<h3>Business Identify Info</h3>

							<JSONPretty
								id="json-pretty"
								data={webHookRow.kyc_information.business_identity_info}
								style={{ fontSize: "1.5em" }}
								mainStyle="padding:1em"
							></JSONPretty>
						</div>

						<div className={styles.modalDeets}>
							<h3>Physical Business Info</h3>

							<JSONPretty
								id="json-pretty"
								data={webHookRow.kyc_information.physical_business_info}
								style={{ fontSize: "1.5em" }}
								mainStyle="padding:1em"
							></JSONPretty>
						</div>

						<div className={styles.modalDeets}>
							<h3>Address of Incorporation</h3>

							<JSONPretty
								id="json-pretty"
								data={webHookRow.kyc_information.address_of_incorporation}
								style={{ fontSize: "1.5em" }}
								mainStyle="padding:1em"
							></JSONPretty>
						</div>

						<div className={styles.modalDeets}>
							<h3>Principal Office</h3>

							<JSONPretty
								id="json-pretty"
								data={webHookRow.kyc_information.principal_office}
								style={{ fontSize: "1.5em" }}
								mainStyle="padding:1em"
							></JSONPretty>
						</div>

						<div className={styles.modalDeets}>
							<h3>Principal Owners</h3>

							<JSONPretty
								id="json-pretty"
								data={webHookRow.kyc_information.principal_owners}
								style={{ fontSize: "1.5em" }}
								mainStyle="padding:1em"
							></JSONPretty>
						</div>

						<div className={styles.modalDeets}>
							<h3>Business Leadership</h3>

							<JSONPretty
								id="json-pretty"
								data={webHookRow.kyc_information.business_leadership}
								style={{ fontSize: "1.5em" }}
								mainStyle="padding:1em"
							></JSONPretty>
						</div>

						<div className={styles.modalDeets}>
							<h3>Documents Checklist</h3>

							<JSONPretty
								id="json-pretty"
								data={webHookRow.kyc_information.document_check_list}
								style={{ fontSize: "1.5em" }}
								mainStyle="padding:1em"
							></JSONPretty>
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
