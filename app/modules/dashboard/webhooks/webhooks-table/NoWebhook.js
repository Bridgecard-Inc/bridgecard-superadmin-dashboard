import React, { useState } from "react";
import SVG from "react-inlinesvg";
import { useRouter } from "next/router";
import { ThreeDots } from "react-loader-spinner";
import { useAuthContext } from "../../../../firebase/AuthContext";
import { callApiWithToken } from "../../../../utils/callApiWithToken";
import axios from "axios";

export const NoWebhook = ({ heading, title }) => {
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);

	const context = useAuthContext();
	const { cardChanged } = context;

	const createNGN = async id => {
		setSubmitting(true);
		try {
			const res = await axios.get(
				"/admin/ngn-virtual-account",

				{
					headers: {
						token: `Bearer ${id}`,
					},
				}
			);
			cardChanged();
		} catch (err) {
		} finally {
			setSubmitting(false);
		}
	};

	router.asPath = "/dashboard/settings";
	return (
		<div className="webhook__empty">
			<SVG src={"../media/svg/webhook.svg"} />
			<div className="webhook__empty__content">
				<h3>{heading}</h3>
				<p>{title}</p>
				{router.asPath === "/dashboard/settings" && (
					<button
						className="webhook-btn"
						onClick={() => {
							callApiWithToken(createNGN);
						}}
					>
						{submitting ? (
							<ThreeDots color="#141416" height={60} width={60} />
						) : (
							"		Generate NGN Account"
						)}
					</button>
				)}
			</div>
		</div>
	);
};
