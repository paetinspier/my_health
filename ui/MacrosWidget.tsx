import { View, Text } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { auth, db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

export default function MacrosWidget() {
	const userUid = auth.currentUser?.uid;
	const [targetProtein, setTargetProtein] = useState(2000);
	const [targetCarbs, setTargetCarbs] = useState(2000);
	const [targetFats, setTargetFats] = useState(2000);
	const [targetCals, setTargetCals] = useState(
		targetProtein * 4 + targetCarbs * 4 + targetFats * 9
	);
	const [currentProtein, setCurrentProtein] = useState(170);
	const [currentCarbs, setCurrentCarbs] = useState(100);
	const [currentFats, setCurrentFats] = useState(100);
	const [currentCals, setCurrentCals] = useState(
		currentProtein * 4 + currentCarbs * 4 + currentFats * 9
	);
	const [calPercent, setCalPercent] = useState((currentCals / targetCals)*100);
	const [proteinPercent, setProteinPercent] = useState(
		(currentProtein / targetProtein)*100
	);
	const [carbsPercent, setCarbsPercent] = useState(
		(currentCarbs / targetCarbs)*100
	);
	const [fatsPercent, setFatsPercent] = useState(currentFats / targetFats);

	useEffect(() => {
		const unsub = onSnapshot(doc(db, "macros", userUid), (doc) => {
			if (doc.data()) {
				setTargetProtein(doc.data().targetProtein);
				setTargetCarbs(doc.data().targetCarbs);
				setTargetFats(doc.data().targetFats);
			}
		});
	}, []);

	useEffect(() => {
		setTargetCals(targetProtein * 4 + targetCarbs * 4 + targetFats * 9);
		setCalPercent((currentCals / targetCals)*100);
		setProteinPercent((currentProtein / targetProtein)*100);
		setCarbsPercent((currentCarbs / targetCarbs)*100);
		setFatsPercent((currentFats / targetFats)*100);
	}, [targetCarbs, targetFats, targetProtein]);

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
			<Text
				style={{
					fontWeight: "bold",
					color: "black",
					textAlign: "left",
					width: "100%",
				}}
			>
				My Macros
			</Text>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "row",
					gap: 50,
				}}
			>
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							gap: 3,
							flexDirection: "row",
						}}
					>
						<Text style={{ color: "gray", textAlign: "center" }}>
							Calories
						</Text>
						<Text style={{ color: "gray" }}>
							{currentCals.toString()} / {targetCals.toString()}
						</Text>
					</View>
					<CircularProgress
						value={calPercent}
						valueSuffix="%"
						activeStrokeColor={"#2465FD"}
						activeStrokeSecondaryColor={"#C25AFF"}
						duration={2000}
					/>
				</View>
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							gap: 3,
							flexDirection: "row",
						}}
					>
						<Text style={{ color: "gray", textAlign: "center" }}>
							Protein
						</Text>
						<Text style={{ color: "gray" }}>
							{currentProtein} / {targetProtein}
						</Text>
					</View>
					<CircularProgress
						value={proteinPercent}
						valueSuffix="%"
						activeStrokeColor={"#2465FD"}
						activeStrokeSecondaryColor={"#C25AFF"}
						duration={2000}
					/>
				</View>
			</View>
			<View
				style={{
					justifyContent: "center",
					gap: 50,
					alignItems: "center",
					flexDirection: "row",
				}}
			>
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							gap: 3,
							flexDirection: "row",
						}}
					>
						<Text style={{ color: "gray", textAlign: "center" }}>
							Carbs
						</Text>
						<Text style={{ color: "gray" }}>
							{currentCarbs} / {targetCarbs}
						</Text>
					</View>
					<CircularProgress
						value={carbsPercent}
						valueSuffix="%"
						activeStrokeColor={"#2465FD"}
						activeStrokeSecondaryColor={"#C25AFF"}
						duration={2000}
					/>
				</View>
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							gap: 3,
							flexDirection: "row",
						}}
					>
						<Text style={{ color: "gray", textAlign: "center" }}>
							Fats
						</Text>
						<Text style={{ color: "gray" }}>
							{currentFats} / {targetFats}
						</Text>
					</View>
					<CircularProgress
						value={fatsPercent}
						valueSuffix="%"
						activeStrokeColor={"#2465FD"}
						activeStrokeSecondaryColor={"#C25AFF"}
						duration={2000}
					/>
				</View>
			</View>
		</View>
	);
}
