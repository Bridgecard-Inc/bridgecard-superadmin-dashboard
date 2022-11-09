import React from "react";
import styles from "./Cardholder.module.scss";
import { motion } from "framer-motion";
import SVG from "react-inlinesvg";
import { useAuthContext } from "../../../../firebase/AuthContext";
import { CodeBlock, atomOneLight } from "react-code-blocks";

export const CardHolderModal = () => {
	const context = useAuthContext();
	const {
		isCardHolderModalVisible,
		setIsCardHolderModalVisible,
		cardHolderRow,
	} = context;

	const closeModal = () => {
		setIsCardHolderModalVisible(false);
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

	return (
		isCardHolderModalVisible && (
			<motion.div className={styles.modalWrapper}>
				<motion.div
					className={styles.modalCard}
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<div className={styles.modalHeader}>
						<h3>Card holder details</h3>
						<div className={styles.cancel} onClick={closeModal}>
							{" "}
							<SVG src={"../media/svg/send/cancel.svg"} />
						</div>
					</div>

					<div className={styles.modalBody}>
						<div className={styles.modalDeets}>
							<div className={styles.deets}>
								<h4>Issuing app id</h4>
								<p>{cardHolderRow?.issuing_app_id}</p>
							</div>
							<div className={styles.deets}>
								<h4>Card holder id</h4>
								<span>{cardHolderRow?.cardholder_id}</span>
							</div>
							<div className={styles.deets}>
								<h4>Status</h4>
								{cardHolderRow.is_active ? (
									<button className="status-btn success">Active</button>
								) : (
									<button className="status-btn failed">Inactive</button>
								)}
							</div>
						</div>

						<div className={styles.modalData}>
							<h3>Address</h3>

							<div className={styles.deets}>
								<h4>Country</h4>
								<p>{cardHolderRow?.address?.country}</p>
							</div>
							<div className={styles.deets}>
								<h4>State</h4>
								<p>{cardHolderRow?.address?.state}</p>
							</div>
							<div className={styles.deets}>
								<h4>Address</h4>
								<p>{cardHolderRow?.address?.address}</p>
							</div>
							<div className={styles.deets}>
								<h4>Postal code</h4>
								<p>{cardHolderRow?.address?.postal_code}</p>
							</div>
						</div>
					</div>
				</motion.div>
			</motion.div>
		)
	);
};
