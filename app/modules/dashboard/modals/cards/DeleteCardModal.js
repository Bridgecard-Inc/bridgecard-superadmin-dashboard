import React, { useState } from "react";
import styles from "./CardsModal.module.scss";
import { motion } from "framer-motion";
import SVG from "react-inlinesvg";
import { useAuthContext } from "../../../../firebase/AuthContext";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

export const DeleteCardModal = () => {
	const [message, setMessage] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const context = useAuthContext();
	const { environment, admindetails } = useSelector(state => state.app);
	const {
		isDeleteCardModalVisible,
		setIsDeleteCardModalVisible,
		cardChanged,
		cardsRow,
	} = context;

	const card_id = cardsRow?.card_id;

	const url = cardsRow.is_active
		? environment === "production"
			? `https://bridgecard-card-manager-service-vbdndeke7q-uc.a.run.app/v1/issuing/cards/freeze_card?card_id=${card_id}`
			: `https://bridgecard-card-manager-service-vbdndeke7q-uc.a.run.app/v1/issuing/sandbox/cards/freeze_card?card_id=${card_id}`
		: environment === "production"
		? `https://bridgecard-card-manager-service-vbdndeke7q-uc.a.run.app/v1/issuing/cards/unfreeze_card?card_id=${card_id}`
		: `https://bridgecard-card-manager-service-vbdndeke7q-uc.a.run.app/v1/issuing/sandbox/cards/unfreeze_card?card_id=${card_id}`;

	const token =
		environment === "production"
			? admindetails.live_authorization_token
			: admindetails.test_authorization_token;

	const closeModal = () => {
		setIsDeleteCardModalVisible(false);
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

	const freezeCard = async () => {
		setIsSubmitting(true);
		try {
			const res = await axios.patch(
				url,
				{},
				{
					headers: {
						Token: `Bearer ${token}`,
					},
				}
			);

			closeModal();
			cardChanged();
		} catch (err) {
			setError(true);
			setMessage("An error occured. Please try again later!");
		} finally {
			setIsSubmitting(false);
			setTimeout(() => {
				setError(false);
			}, 4000);
		}
	};

	return (
		isDeleteCardModalVisible && (
			<motion.div className={styles.deleteModalWrapper}>
				<motion.div
					className={styles.deleteModalCard}
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<div className={styles.modalHeader}>
						<h3>{cardsRow.is_active ? "Freeze card?" : "Unfreeze card?"}</h3>

						<div className={styles.cancel} onClick={closeModal}>
							{" "}
							<SVG src={"../media/svg/send/cancel.svg"} />
						</div>
					</div>
					<div className={styles.deleteBodyForm}>
						<p>
							{cardsRow.is_active
								? "Are you sure you want to Freeze this card?"
								: "Are you sure you want to Unfreeze this card?"}
						</p>
					</div>

					{error && (
						<div className="error-message">
							<p> {message}</p>
						</div>
					)}
					<div className={styles.modalFooter}>
						<button className="delete-btn" type="button" onClick={freezeCard}>
							{" "}
							{isSubmitting ? (
								<ThreeDots color="#141416" height={40} width={40} />
							) : cardsRow.is_active ? (
								"Freeze card"
							) : (
								"Unfreeze card"
							)}
						</button>
					</div>
				</motion.div>
			</motion.div>
		)
	);
};
