import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext();

export function useAuthContext() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [fetching, setFetching] = useState(false);
	const [userIdToken, setUserIdToken] = useState(null);
	const [userId, setUserId] = useState("");
	const [isWebhookModalVisible, setIsWebhookModalVisible] = useState(false);
	const [isTransactionsModalVisible, setIsTransactionsModalVisible] =
		useState(false);
	const [isCardHolderModalVisible, setIsCardHolderModalVisible] =
		useState(false);
	const [webHookRow, setWebhookRow] = useState({});
	const [transactionsRow, setTransactionsRow] = useState({});
	const [cardHolderRow, setCardHolderRow] = useState({});
	const [isCreateCardHolderModalVisible, setIsCreateCardHolderModalVisible] =
		useState(false);
	const [isCreateNewCardModalVisible, setIsCreateNewCardModalVisible] =
		useState(false);
	const [isEditCardHolderModalVisible, setIsEditCardHolderModalVisible] =
		useState(false);
	const [isDeleteCardHolderModalVisible, setIsDeleteCardHolderModalVisible] =
		useState(false);
	const [isDeleteCardModalVisible, setIsDeleteCardModalVisible] =
		useState(false);
	const [isCardModalVisible, setIsCardModalVisible] = useState(false);
	const [isFundCardModalVisible, setIsFundCardModalVisible] = useState(false);
	const [isUnloadCardModalVisible, setIsUnloadCardModalVisible] =
		useState(false);
	const [isTeamsCardModalVisible, setIsTeamsCardModalVisible] = useState(false);
	const [isRemoveMemberModalVisible, setIsRemoveMemberModalVisible] =
		useState(false);
	const [hasCardChanged, setHasCardChanged] = useState(false);
	const [cardsRow, setCardsRow] = useState({});
	const [memberRow, setMemberRow] = useState({});

	const cardChanged = () => {
		setHasCardChanged(prev => !prev);
	};
	const setWebRow = row => {
		setWebhookRow(row);
	};

	const updateCardsRow = row => {
		setCardsRow(row);
	};

	const setCardRow = row => {
		setCardHolderRow(row);
	};

	const setTransactionRow = row => {
		setTransactionsRow(row);
	};

	const setMember = row => {
		setMemberRow(row);
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
		isModalVisible,
		setIsModalVisible,
		userId,
		isWebhookModalVisible,
		setIsWebhookModalVisible,
		webHookRow,
		setWebRow,
		isCardHolderModalVisible,
		setIsCardHolderModalVisible,
		cardHolderRow,
		setCardRow,
		setTransactionRow,
		isTransactionsModalVisible,
		setIsTransactionsModalVisible,
		transactionsRow,
		isCreateCardHolderModalVisible,
		setIsCreateCardHolderModalVisible,
		isCreateNewCardModalVisible,
		setIsCreateNewCardModalVisible,
		isEditCardHolderModalVisible,
		setIsEditCardHolderModalVisible,
		isDeleteCardHolderModalVisible,
		setIsDeleteCardHolderModalVisible,
		hasCardChanged,
		cardChanged,
		isDeleteCardModalVisible,
		setIsDeleteCardModalVisible,
		updateCardsRow,
		cardsRow,
		isCardModalVisible,
		setIsCardModalVisible,
		isFundCardModalVisible,
		setIsFundCardModalVisible,
		isUnloadCardModalVisible,
		setIsUnloadCardModalVisible,
		isTeamsCardModalVisible,
		setIsTeamsCardModalVisible,
		isRemoveMemberModalVisible,
		setIsRemoveMemberModalVisible,
		memberRow,
		setMember,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
