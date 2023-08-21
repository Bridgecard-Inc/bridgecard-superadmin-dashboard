import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../firebase/AuthContext";

export default function Verification() {
	const context = useAuthContext();

	const { setBvnModal } = context;

	const openModal = () => {
		setBvnModal(true);
	};

	return (
		<React.Fragment>
			<div className="issued-cards-header">
				<h1 className="dashboard-title">Manual Verification</h1>
			</div>
			<div className="verification-div">
				<p>Manually verify and approve users bvn</p>
				<button className="webhook-btn" onClick={openModal}>
					Verify BVN
				</button>
			</div>
		</React.Fragment>
	);
}
