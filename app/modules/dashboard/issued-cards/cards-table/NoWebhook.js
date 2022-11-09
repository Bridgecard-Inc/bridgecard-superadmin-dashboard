import React from "react";
import SVG from "react-inlinesvg";

export const NoWebhook = () => {
	return (
		<div className="webhook__empty">
			<SVG src={"../media/svg/webhook.svg"} />
			<div className="webhook__empty__content">
				<h3>No Webhooks Yet</h3>
				<p>Your webhook events will appear here.</p>
			</div>
		</div>
	);
};
