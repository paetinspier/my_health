import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

export default function Login({ setSelectedPreAuth }) {
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [viewPassword, setViewPassword] = useState(false);
	const { signIn } = useAuth();

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				padding: 20,
				backgroundColor: "#f9f9f9",
			}}
		>
			<View
				style={{
					backgroundColor: "white",
					padding: 10,
					borderRadius: 20,
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<Text
					style={{ color: "black", fontSize: 24, fontWeight: "bold" }}
				>
					Login
				</Text>

				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						height: 40,
						margin: 12,
						borderWidth: 1,
						borderRadius: 20,
					}}
				>
					<TextInput
						value={email}
						placeholder="Email"
						keyboardType="email-address"
						onChangeText={(email) => setEmail(email)}
						style={{
							flex: 1,
							padding: 10,
						}}
					/>
				</View>

				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						height: 40,
						margin: 12,
						borderWidth: 1,
						borderRadius: 20,
					}}
				>
					<TextInput
						value={password}
						placeholder="Password"
						onChangeText={(password) => setPassword(password)}
						secureTextEntry={viewPassword}
						style={{
							flex: 1,
							padding: 10,
						}}
					/>
					<TouchableOpacity
						style={{ paddingRight: 10 }}
						onPress={() => setViewPassword(!viewPassword)}
					>
						<Feather
							name={viewPassword ? "eye" : "eye-off"}
							size={12}
							color="black"
						/>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					onPress={() => setSelectedPreAuth(1)}
					style={{
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "row",
						gap: 3,
					}}
				>
					<Text style={{ color: "black" }}>
						Already have an account?
					</Text>
					<Text style={{ color: "#2465FD" }}>Sign Up</Text>
				</TouchableOpacity>
				<Button
					title="Continue"
					color="#2465FD"
					onPress={() => signIn(email, password)}
					disabled={
						!(
							email &&
							email.length > 6 &&
							password &&
							password.length > 8
						)
					}
				/>
			</View>
		</View>
	);
}
