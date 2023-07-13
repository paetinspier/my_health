import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { onSnapshot, doc } from "firebase/firestore";

export default function Header() {
	const userUid = auth.currentUser?.uid;
	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);
	useEffect(() => {
		const unsub = onSnapshot(doc(db, "users", userUid), (doc) => {
			if (doc.data()) {
				setFirstName(doc.data().firstName);
				setLastName(doc.data().lastName);
			}
		});
	}, []);

	return (
		<View
			style={{
				backgroundColor: "#fff",
				justifyContent: "space-between",
				alignItems: "center",
				flexDirection: "row",
				width: "100%",
				paddingHorizontal: 10,
				paddingBottom: 10,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					alignContent: "center",
					gap: 10,
				}}
			>
				<View
					style={{
						width: 30,
						height: 30,
						borderRadius: 100,
						overflow: "hidden",
						backgroundColor: "#2465FD",
					}}
				></View>
				<View
					style={{
						justifyContent: "flex-start",
						alignContent: "flex-start",
						flexDirection: "column",
						gap: 1,
					}}
				>
					<Text style={{ fontSize: 12, color: "gray" }}>
						Welcome Back,
					</Text>
					<Text style={{ fontWeight: "bold", color: "black" }}>
						{firstName} {lastName}
					</Text>
				</View>
			</View>

			<Feather name="bell" size={24} color="black" />
		</View>
	);
}
