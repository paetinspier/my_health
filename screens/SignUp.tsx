import { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

export default function SignUp({ setSelectedPreAuth }) {
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [firstName, setFirstName] = useState<string>();
	const [lastName, setLastName] = useState<string>();
	const [viewPassword, setViewPassword] = useState(false);
	const { signUp } = useAuth();

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
					Sign Up
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
						value={firstName}
						placeholder="First Name"
						onChangeText={(firstName) => setFirstName(firstName)}
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
						value={lastName}
						placeholder="Last Name"
						onChangeText={(lastName) => setLastName(lastName)}
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
					onPress={() => setSelectedPreAuth(2)}
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
					<Text style={{ color: "#2465FD" }}>Login</Text>
				</TouchableOpacity>
				<Button
					title="Continue"
					color="#2465FD"
					onPress={() => signUp(email, password, firstName, lastName)}
					disabled={
						!(
							email &&
							email.length > 6 &&
							password &&
							password.length > 8 &&
							firstName &&
							lastName
						)
					}
				/>
			</View>
		</View>
	);
}
