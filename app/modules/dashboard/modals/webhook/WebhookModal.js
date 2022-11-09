import React from "react";
import styles from "./WebhookModal.module.scss";
import { motion } from "framer-motion";
import SVG from "react-inlinesvg";
import { useAuthContext } from "../../../../firebase/AuthContext";
import { CodeBlock, atomOneLight } from "react-code-blocks";

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

	const codeText = `
      {
        "amount":  ${webHookRow?.data?.data?.amount},
        "card_id": ${webHookRow?.data?.data?.card_id},
        "card_transaction_type":  ${webHookRow?.data?.data?.card_transaction_type},
        "cardholder_id":  ${webHookRow?.data?.data?.cardholder_id},
        "currency":  ${webHookRow?.data?.data?.currency},
        "description":  ${webHookRow?.data?.data?.description},
        "issuing_app_id":  ${webHookRow?.data?.data?.issuing_app_id},
        "livemode":  ${webHookRow?.data?.data?.livemode},
        "transaction_reference":  ${webHookRow?.data?.data?.transaction_reference},

      }
  `;

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
						<h3>Webhook details</h3>
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
								<h4>Response time</h4>
								<p>{webHookRow?.response_time?.toFixed(2)} secs</p>
							</div>
							<div className={styles.deets}>
								<h4>Status</h4>
								{webHookRow.response_status_code === 200 ? (
									<button className="status-btn success">Successful</button>
								) : (
									<button className="status-btn failed">Failed</button>
								)}
							</div>
						</div>

						<div className={styles.modalData}>
							<CodeBlock
								text={codeText}
								language={"javascript"}
								codeBlock={true}
								showLineNumbers={true}
								wrapLines
								wrapLongLines={true}
								theme={atomOneLight}
								customStyle={{
									height: "340px",
									overflowY: "scroll",
									margin: "0px",
									borderRadius: "0px",
									fontSize: "15px",
									textColor: "#000",
									padding: "0px 10px",
								}}
							/>
						</div>
					</div>
				</motion.div>
			</motion.div>
		)
	);
};
