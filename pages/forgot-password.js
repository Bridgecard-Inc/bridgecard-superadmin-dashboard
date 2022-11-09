import React from "react";
import { AuthNav } from "../app/modules/authetication/auth-nav";
import { ForgotPassword } from "../app/modules/authetication/ForgotPassword";
import { Signin } from "../app/modules/authetication/sign-in";

export default function forgotpassword() {
	return (
		<section className="auth">
			<AuthNav />
			<ForgotPassword />
		</section>
	);
}
