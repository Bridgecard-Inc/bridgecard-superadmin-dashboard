import React from "react";
import SVG from "react-inlinesvg";
import { useRouter } from "next/router";

export const AuthNav = () => {
	const router = useRouter();
	const { asPath } = router;

	return (
		<nav className="auth-nav">
			<div className="auth-nav__logo">
				<SVG src={"../media/svg/logo.svg"} />
			</div>
		</nav>
	);
};
