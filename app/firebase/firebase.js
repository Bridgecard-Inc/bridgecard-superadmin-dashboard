import * as firebase from "firebase/app";
import { getStorage } from "firebase/storage";

import {
	getAuth,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
// Initialize Firebase

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = getStorage(app);
export const auth = getAuth(app);

export const signInWithEmail = async (email, password) => {
	return await signInWithEmailAndPassword(auth, email, password);
};

export const passwordReset = async email => {
	await sendPasswordResetEmail(auth, email)
		.then(() => {
			// Password reset email sent!
		})
		.catch(error => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
};

export { storage, firebase as default };
