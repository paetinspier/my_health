import React, { createContext, useState, useEffect, useContext } from "react";
import {
	userLogout,
	userSignIn,
	userSignUp,
} from "../api/firebaseAuthentication";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const AuthContext = createContext({});

export default AuthContext;

export const useAuth = () => useContext<any>(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [firebaseUser, setFirebaseUser] = useState<User|null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setFirebaseUser(user);
			} else {
				setFirebaseUser(null);
			}
		});
		return () => unsubscribe();
	}, [firebaseUser]);

	const signUp = (
		email: string,
		password: string,
		firstName: string,
		lastName: string
	) => {
		const res = userSignUp(email, password, firstName, lastName);
	};

	const signIn = (email: string, password: string) => {
		const res = userSignIn(email, password);
	};

	const logout = () => {
		userLogout();
	};

	const value = {
		firebaseUser,
		signUp,
		signIn,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
