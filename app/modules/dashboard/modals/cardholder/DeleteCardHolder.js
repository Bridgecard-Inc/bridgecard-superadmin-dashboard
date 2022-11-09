import React, { useState } from "react";
import styles from "./Cardholder.module.scss";
import { motion } from "framer-motion";
import SVG from "react-inlinesvg";
import { useAuthContext } from "../../../../firebase/AuthContext";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { callApiWithToken } from "../../../../utils/callApiWithToken";
import axios from "axios";

export const DeleteCardHolderModal = () => {
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const context = useAuthContext();
	const { environment, admindetails } = useSelector(state => state.app);

	const {
		isDeleteCardHolderModalVisible,
		setIsDeleteCardHolderModalVisible,
		cardChanged,
		cardHolderRow,
	} = context;

	const cardholder_id = cardHolderRow?.cardholder_id;

	const url =
		environment === "production"
			? `https://bridgecard-card-manager-service-vbdndeke7q-uc.a.run.app/v1/issuing/cardholder/delete_cardholder/${cardholder_id}`
			: `https://bridgecard-card-manager-service-vbdndeke7q-uc.a.run.app/v1/issuing/sandbox/cardholder/delete_cardholder/${cardholder_id}`;

	const token =
		environment === "production"
			? admindetails.live_authorization_token
			: admindetails.test_authorization_token;

	const closeModal = () => {
		setIsDeleteCardHolderModalVisible(false);
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

	const deleteCardHolder = async () => {
		setIsSubmitting(true);
		try {
			const res = await axios.delete(url, {
				headers: {
					Token: `Bearer ${token}`,
				},
			});

			closeModal();
			cardChanged();
		} catch (err) {
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		isDeleteCardHolderModalVisible && (
			<motion.div className={styles.deleteModalWrapper}>
				<motion.div
					className={styles.deleteModalCard}
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<div className={styles.modalHeader}>
						<h3>Delete card holder</h3>
						<div className={styles.cancel} onClick={closeModal}>
							{" "}
							<SVG src={"../media/svg/send/cancel.svg"} />
						</div>
					</div>
					<div className={styles.deleteBodyForm}>
						<p>Are you sure you want to delete this card holder?</p>
					</div>
					<div className={styles.modalFooter}>
						<button
							className="delete-btn"
							type="button"
							onClick={deleteCardHolder}
						>
							{" "}
							{isSubmitting ? (
								<ThreeDots color="#141416" height={40} width={40} />
							) : (
								"Delete card"
							)}
						</button>
					</div>
				</motion.div>
			</motion.div>
		)
	);
};
