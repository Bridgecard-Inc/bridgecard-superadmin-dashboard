import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext();

export function useAuthContext() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [fetching, setFetching] = useState(false);
	const [userIdToken, setUserIdToken] = useState(null);
	const [userId, setUserId] = useState("");
	const [isWebhookModalVisible, setIsWebhookModalVisible] = useState(false);
	const [webHookRow, setWebhookRow] = useState({});
	const [bvnModal, setBvnModal] = useState(false);

	const setWebRow = row => {
		setWebhookRow(row);
	};

	const signin = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	useEffect(() => {
		setFetching(true);
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user);
			if (user !== null) {
				setUserId(user.uid);
				user.getIdToken().then(idToken => {
					setUserIdToken(idToken);
				});
			}
		});

		return unsubscribe;
	}, [currentUser, userIdToken]);

	const value = {
		currentUser,
		userIdToken,
		signin,
		fetching,
		userId,
		isWebhookModalVisible,
		setIsWebhookModalVisible,
		webHookRow,
		setWebRow,
		bvnModal,
		setBvnModal,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
