import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useToast } from "react-native-toast-notifications";

interface Macronutrients {
	calories: number;
	protein: number;
	carbohydrates: number;
	fats: number;
}

export default function MacroGoalsWidget() {
	const userUid = auth.currentUser?.uid;
	const [targetProtein, setTargetProtein] = useState<number | null>(null);
	const [targetCarbs, setTargetCarbs] = useState<number | null>(null);
	const [targetFats, setTargetFats] = useState<number | null>(null);
	const [targetCals, setTargetCals] = useState<number | null>(
		targetProtein * 4 + targetCarbs * 4 + targetFats * 9
	);
	const [databaseData, setDatabaseData] = useState<Macronutrients>();
	const [macrosChange, setMacrosChange] = useState(false);
	const toast = useToast();

	useEffect(() => {
		const fetch = async () => {
			const docRef = doc(db, "macros", userUid);
			const docSnap = await getDoc(docRef);
			const macroData = docSnap.data();
			if (macroData) {
				setDatabaseData({
					calories: macroData.targetCals,
					protein: macroData.targetProtein,
					carbohydrates: macroData.targetCarbs,
					fats: macroData.targetFats,
				});
				setTargetProtein(macroData.targetProtein?.toString());
				setTargetCarbs(macroData.targetCarbs?.toString());
				setTargetFats(macroData.targetFats?.toString());
			}
		};

		fetch();
	}, []);

	useEffect(() => {
		setTargetCals(
			(targetProtein ? targetProtein : 0) * 4 +
				(targetCarbs ? targetCarbs : 0) * 4 +
				(targetFats ? targetFats : 0) * 9
		);
		const currData = {
			currCals: targetCals,
			currProtein: targetProtein,
			currCarbs: targetCarbs,
			currFats: targetFats,
		};
		if (
			databaseData?.carbohydrates !== currData.currCarbs ||
			databaseData?.protein !== currData.currProtein ||
			databaseData?.fats !== currData.currFats
		) {
			setMacrosChange(true);
		} else {
			setMacrosChange(false);
		}
	}, [targetProtein, targetCarbs, targetFats]);

	const updateMacrosInDatabase = async () => {
		try {
			const macroRef = doc(db, "macros", userUid);
			await updateDoc(macroRef, {
				targetCals: targetCals,
				targetProtein: targetProtein,
				targetCarbs: targetCarbs,
				targetFats: targetFats,
			});
			setMacrosChange(false);
			toast.show("Successfully updated macros", {
				type: "success",
				placement: "top",
				duration: 1000,
				animationType: "slide-in",
			});
		} catch (error) {
			console.log(error);
			setMacrosChange(false);
			toast.show("Failed to update macros", {
				type: "warning",
				placement: "top",
				duration: 4000,
				animationType: "slide-in",
			});
		}
	};

	return (
		<View
			style={{
				backgroundColor: "white",
				borderRadius: 20,
				paddingHorizontal: 20,
				paddingVertical: 30,
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				width: "100%",
				gap: 5,
			}}
		>
			<View
				style={{
					width: "100%",
					justifyContent: "space-between",
					alignItems: "center",
					gap: 5,
					flexDirection: "row",
				}}
			>
				<Text
					style={{
						fontWeight: "bold",
						fontSize: 18,
						color: "black",
						textAlign: "left",
						width: "auto",
					}}
				>
					My Macro Goals
				</Text>
				<Text
					style={{
						fontWeight: "bold",
						fontSize: 35,
						color: "black",
						textAlign: "left",
						width: "auto",
					}}
				>
					{targetCals}Kcals
				</Text>
			</View>
			<View
				style={{
					width: "100%",
					justifyContent: "space-between",
					alignItems: "center",
					gap: 5,
					flexDirection: "row",
				}}
			>
				<Text
					style={{ fontSize: 12, fontWeight: "700", color: "black" }}
				>
					Target Protein
				</Text>
				<TextInput
					value={targetProtein?.toString()}
					keyboardType="numeric"
					onChangeText={(number) => setTargetProtein(parseInt(number))}
					style={{
						height: 40,
						margin: 12,
						borderWidth: 1,
						padding: 10,
						width: 100,
						borderRadius: 20,
					}}
				/>
			</View>
			<View
				style={{
					width: "100%",
					justifyContent: "space-between",
					alignItems: "center",
					gap: 5,
					flexDirection: "row",
				}}
			>
				<Text
					style={{ fontSize: 12, fontWeight: "700", color: "black" }}
				>
					Target Carbs
				</Text>
				<TextInput
					value={targetCarbs?.toString()}
					keyboardType="numeric"
					onChangeText={(number) => setTargetCarbs(parseInt(number))}
					style={{
						height: 40,
						margin: 12,
						borderWidth: 1,
						padding: 10,
						width: 100,
						borderRadius: 20,
					}}
				/>
			</View>
			<View
				style={{
					width: "100%",
					justifyContent: "space-between",
					alignItems: "center",
					gap: 5,
					flexDirection: "row",
				}}
			>
				<Text
					style={{ fontSize: 12, fontWeight: "700", color: "black" }}
				>
					Target Fats
				</Text>
				<TextInput
					value={targetFats?.toString()}
					keyboardType="numeric"
					onChangeText={(number) => setTargetFats(parseInt(number))}
					style={{
						height: 40,
						margin: 12,
						borderWidth: 1,
						padding: 10,
						width: 100,
						borderRadius: 20,
					}}
				/>
			</View>
			{macrosChange && (
				<TouchableOpacity
					style={{
						width: "auto",
						backgroundColor: "#2465FD",
						paddingHorizontal: 40,
						paddingVertical: 10,
						borderRadius: 20,
					}}
					onPress={() => updateMacrosInDatabase()}
				>
					<Text
						style={{
							fontSize: 18,
							color: "white",
							fontWeight: "700",
						}}
					>
						Save Changes
					</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}
