import { auth } from "../../app/firebase/firebase"

export const callApiWithToken = (fn) => {
  auth.onAuthStateChanged((user) => {
    if (user !== null) {
      user.getIdToken().then((idToken) => {
        fn(idToken)
      })
    }
  })
}
