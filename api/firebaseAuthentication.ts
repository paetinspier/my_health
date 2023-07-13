import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export function userSignUp(
	email: string,
	password: string,
	firstName: string,
	lastName: string
) {
	createUserWithEmailAndPassword(auth, email, password)
		.then(async (userCredential) => {
			const user = userCredential.user;
			console.log("Successful user  signup ✅", user.uid);
			const userDoc = await setDoc(doc(db, "users", user.uid), {
				firstName: firstName,
				lastName: lastName,
				isDiabetic: true,
				email: email,
				dob: "",
			});
			console.log("created user in firestore ✅", userDoc);
			return user;
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;

			console.log(errorCode, errorMessage);
		});
}

export function userSignIn(email: string, password: string) {
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			console.log("User successful sign in ✅", user.uid);
			return user;
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;

			console.log(errorCode, errorMessage);
		});
}

export function userLogout() {
	signOut(auth)
		.then(() => {
			console.log("Successful sign out ✅");
		})
		.catch((error) => {
			console.log("error with signout", error);
		});
}
