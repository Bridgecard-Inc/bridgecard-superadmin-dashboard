import { auth } from "../firebase/firebase";

export const callApiWithPayloadToken = async (fn, payload) => {
	auth.onAuthStateChanged(user => {
		if (user !== null) {
			user.getIdToken().then(idToken => {
				fn(idToken, payload);
			});
		}
	});
};

export const callApiWithToken = async fn => {
	auth.onAuthStateChanged(user => {
		if (user !== null) {
			user.getIdToken().then(idToken => {
				fn(idToken);
			});
		}
	});
};
