import React, { useState, useEffect } from "react";
import styles from "./CardsModal.module.scss";
import { motion } from "framer-motion";
import { ThreeDots } from "react-loader-spinner";
import SVG from "react-inlinesvg";
import { useAuthContext } from "../../../../firebase/AuthContext";
import { formatEpoch } from "../../../../../_helpers/functions/formatDate";
import { useSelector } from "react-redux";
import axios from "axios";

export const CardDetailsModal = () => {
	const context = useAuthContext();
	const [cardDetail, setCardDetail] = useState(null);
	const { isCardModalVisible, setIsCardModalVisible, cardsRow } = context;
	const { admindetails, environment } = useSelector(state => state.app);
	const closeModal = () => {
		setIsCardModalVisible(false);
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

	const url =
		environment === "sandbox"
			? `https://bridgecard-card-manager-service-vbdndeke7q-uc.a.run.app/v1/issuing/sandbox/cards/get_card_details?card_id=${cardsRow.card_id}`
			: `https://bridgecard-card-manager-service-vbdndeke7q-uc.a.run.app/v1/issuing/cards/get_card_details?card_id=${cardsRow.card_id}`;

	const token =
		environment === "sandbox"
			? admindetails.test_authorization_token
			: admindetails.live_authorization_token;

	useEffect(() => {
		setCardDetail(null);
		const fetchData = async () => {
			try {
				const res = await axios.get(url, {
					headers: {
						token: `Bearer ${token}`,
					},
				});
				setCardDetail(res.data.data);
			} catch (err) {
			} finally {
			}
		};

		fetchData();
	}, [token, url]);

	return (
		isCardModalVisible && (
			<motion.div className={styles.modalWrapper}>
				<motion.div
					className={styles.modalCard}
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<div className={styles.modalHeader}>
						<h3>Card details</h3>
						<div className={styles.cancel} onClick={closeModal}>
							{" "}
							<SVG src={"../media/svg/send/cancel.svg"} />
						</div>
					</div>

					<div className={styles.modalBody}>
						{cardDetail ? (
							<React.Fragment>
								<div className={styles.modalDeets}>
									<h3>Billing Address</h3>
									<div className={styles.deets}>
										<h4>Card name</h4>
										<p>{cardDetail?.card_name}</p>
									</div>
									<div className={styles.deets}>
										<h4>Issuing app id</h4>
										<p>{cardDetail?.issuing_app_id}</p>
									</div>
									<div className={styles.deets}>
										<h4>Card id</h4>
										<span>{cardDetail?.card_id}</span>
									</div>
									<div className={styles.deets}>
										<h4>Card type</h4>
										<span>{cardDetail?.card_type}</span>
									</div>
									<div className={styles.deets}>
										<h4>Card currency</h4>
										<span>{cardDetail?.card_currency}</span>
									</div>
									<div className={styles.deets}>
										<h4>Card balance</h4>
										<span>${cardDetail?.balance / 100}</span>
									</div>
									<div className={styles.deets}>
										<h4>Date created</h4>
										<span>{formatEpoch(cardDetail?.created_at)}</span>
									</div>
									<div className={styles.deets}>
										<h4>Status</h4>
										{cardDetail.is_active ? (
											<button className="status-btn success">Active</button>
										) : (
											<button className="status-btn failed">Inactive</button>
										)}
									</div>
								</div>
								<div className={styles.modalData}>
									<h3>Billing Address</h3>

									<div className={styles.deets}>
										<h4>Billing Address</h4>
										<p>{cardDetail?.billing_address?.billing_address1}</p>
									</div>
									<div className={styles.deets}>
										<h4>Billing country</h4>
										<p>{cardDetail?.billing_address?.billing_country}</p>
									</div>
									<div className={styles.deets}>
										<h4>Billing city</h4>
										<p>{cardDetail?.billing_address?.billing_city}</p>
									</div>
									<div className={styles.deets}>
										<h4>Billing zip code</h4>
										<p>{cardDetail?.billing_address?.billing_zip_code}</p>
									</div>
								</div>
							</React.Fragment>
						) : (
							<div className="loading-div">
								<ThreeDots color="#141416" height={60} width={60} />
							</div>
						)}
					</div>
				</motion.div>
			</motion.div>
		)
	);
};
