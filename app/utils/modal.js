import React from "react";
import SVG from "react-inlinesvg";
import { motion } from "framer-motion";

export const Modal = ({ closeModal, heading, text }) => {
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
		<motion.div className="modal-wrapper">
			<motion.div
				className="modal-card"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<div className="cancel" onClick={closeModal}>
					{" "}
					<SVG src={"../media/svg/send/cancel.svg"} />
				</div>
				<div>
					{" "}
					<SVG src={"../media/svg/send/big-info.svg"} />
				</div>
				<h3>{heading}</h3>
				<p>{text}</p>
			</motion.div>
		</motion.div>
	);
};
