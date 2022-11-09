import React from "react";
import { motion } from "framer-motion";

export const Animate = ({ children }) => {
	const containerVariants = {
		hidden: {
			x: "20px",
			opacity: 0,
		},
		visible: {
			x: 0,
			opacity: 1,
			transition: { delay: 0, duration: 0.5 },
		},
		exit: {
			x: "-30px",
			transition: { ease: "easeInOut", duration: 0.5 },
		},
	};

	return (
		<motion.div
			className="send-card"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{children}
		</motion.div>
	);
};
