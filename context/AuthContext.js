import React, { createContext, useState, useEffect } from "react";
import { userLogout, userSignIn, userSignUp } from "../api/firebaseAuthentication";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../firebaseConfig";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
	const [firebaseUser, setFirebaseUser] = useState(null);

    useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setFirebaseUser(user);
			} else {
				setFirebaseUser(null);
			}
		});
		return () => unsubscribe();
	}, []);


	const signUp = (email, password) => {
		const res = userSignUp(email, password);
	};

	const signIn = (email, password) => {
		const res = userSignIn(email, password);
	};

	const logout = () => {
		userLogout();
	}

	const value = {
		firebaseUser,
		signUp,
		signIn,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>
			{props.children}
		</AuthContext.Provider>
	);
};
