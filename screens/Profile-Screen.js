import { View, Text, TextInput, Button } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen() {
	const userUid = auth.currentUser?.uid;
	const [loading, setLoading] = useState(true);
	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);
	const [email, setEmail] = useState(null);
	const [dob, setDob] = useState(null);
	const [isDiabetic, setIsDiabetic] = useState(null);
	const { logout } = useContext(AuthContext);

	useEffect(() => {
		const fetchData = async () => {
			try {

				const docRef = doc(db, "users", userUid);
				const docSnap = await getDoc(docRef);
				const userData = docSnap.data();
				if (userData) {
					setFirstName(userData.firstName);
					setLastName(userData.lastName);
					setEmail(userData.email);
					setDob(userData.dob);
					setIsDiabetic(userData.isDiabetic);
				}
			} catch (error) {
				console.log("Error fetching data:", error);
				// Handle the error, e.g., show an error message to the user
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#f9f9f9",
				width: "100%",
				justifyContent: "center",
				alignItems: "center",
				paddingHorizontal: 20,
			}}
		>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					padding: 20,
					backgroundColor: "#fff",
					borderRadius: 20,
				}}
			>
				<Text
					style={{ fontSize: 24, fontWeight: "bold", color: "black" }}
				>
					My Profile
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
						value={dob}
						placeholder="Birthday"
						onChangeText={(dob) => setDob(dob)}
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
					<Text style={{ color: "black", flex: 1, padding: 10 }}>
						isDiabetic: {isDiabetic ? "yes" : "no"}
					</Text>
				</View>

				<Button title="Logout" onPress={() => logout()} color="red" />
			</View>
		</View>
	);
}
