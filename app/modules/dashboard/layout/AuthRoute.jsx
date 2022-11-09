import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export const AuthRoute = ({ children }) => {
	const router = useRouter();
	const { authenticated } = useSelector(state => state.app);
	useEffect(() => {
		if (!authenticated) {
			router.push("/login");
		}
		return;
	}, [authenticated, router]);

	return <React.Fragment>{children}</React.Fragment>;
};
