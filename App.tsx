import Authentication from "./screens/Authentication";
import { AuthProvider } from "./context/AuthContext";
import React from "react";
import { ToastProvider } from 'react-native-toast-notifications'

export default function App() {
	return (
		<AuthProvider>
			<ToastProvider offsetTop={50}>
				<Authentication />
			</ToastProvider>
		</AuthProvider>
	);
}
