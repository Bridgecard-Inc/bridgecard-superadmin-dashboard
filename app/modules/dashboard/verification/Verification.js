import React, { useState, useEffect } from "react";

export default function Verification() {
	return (
		<React.Fragment>
			<div className="issued-cards-header">
				<h1 className="dashboard-title">Manual Verification</h1>
			</div>

			<div className="verification-div">
				<p>Manually verify and approve users bvn</p>
				<button className="webhook-btn">Verify BVN</button>
			</div>
		</React.Fragment>
	);
}
