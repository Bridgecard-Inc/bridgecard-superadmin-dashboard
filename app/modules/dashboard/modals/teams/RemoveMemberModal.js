import React, { useState } from "react";
import styles from "./TeamsModal.module.scss";
import { motion } from "framer-motion";
import SVG from "react-inlinesvg";
import { useAuthContext } from "../../../../firebase/AuthContext";
import { callApiWithToken } from "../../../../utils/callApiWithToken";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

export const RemoveMemberModal = () => {
	const [message, setMessage] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const context = useAuthContext();
	const {
		isRemoveMemberModalVisible,
		setIsRemoveMemberModalVisible,
		cardChanged,
		memberRow,
	} = context;

	const url = `/admin/team-member/${memberRow.id}/${memberRow.work_email}`;

	const closeModal = () => {
		setIsRemoveMemberModalVisible(false);
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

	const RemoveMember = async token => {
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
		isRemoveMemberModalVisible && (
			<motion.div className={styles.deleteModalWrapper}>
				<motion.div
					className={styles.deleteModalCard}
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<div className={styles.modalHeader}>
						<h3>Remove Member</h3>

						<div className={styles.cancel} onClick={closeModal}>
							{" "}
							<SVG src={"../media/svg/send/cancel.svg"} />
						</div>
					</div>
					<div className={styles.deleteBodyForm}>
						<p>
							Are you sure you want to remove {memberRow.first_name}{" "}
							{memberRow.last_name}?{" "}
						</p>
					</div>

					{error && (
						<div className="error-message">
							<p> {message}</p>
						</div>
					)}
					<div className={styles.modalFooter}>
						<button
							className="delete-btn"
							type="button"
							onClick={() => {
								callApiWithToken(RemoveMember);
							}}
						>
							{" "}
							{isSubmitting ? (
								<ThreeDots color="#141416" height={40} width={40} />
							) : (
								"Remove"
							)}
						</button>
					</div>
				</motion.div>
			</motion.div>
		)
	);
};
