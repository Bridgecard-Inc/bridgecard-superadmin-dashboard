import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { auth } from "../app/firebase/firebase";
import firebase from "../app/firebase/firebase";
import { useRouter } from "next/router";

function Authorization() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const router = useRouter();
	useEffect(() => {
		const unsubscribe = auth?.currentUser
			.getIdTokenResult()
			.then(idTokenResult => {
				if (idTokenResult.claims.role === "superadmin") {
					router.push("/dashboard/webhooks");
				} else {
					router.push("/");
				}
			})
			.catch(error => {});
	}, []);
	return (
		<div className="App">
			<div className="loading-div">
				<ThreeDots color="#141416" height={60} width={60} />
			</div>
		</div>
	);
}

export default Authorization;
