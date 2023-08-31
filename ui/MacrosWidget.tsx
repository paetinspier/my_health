import { View, Text } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { auth, db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import {
	collection,
	doc,
	getDocs,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function MacrosWidget() {
	const userUid = auth.currentUser?.uid;
	const [targetProtein, setTargetProtein] = useState(0);
	const [targetCarbs, setTargetCarbs] = useState(0);
	const [targetFats, setTargetFats] = useState(0);
	const [targetCals, setTargetCals] = useState(0);
	const [currentProtein, setCurrentProtein] = useState(0);
	const [currentCarbs, setCurrentCarbs] = useState(0);
	const [currentFats, setCurrentFats] = useState(0);
	const [currentCals, setCurrentCals] = useState(0);
	const [calPercent, setCalPercent] = useState<number>();
	const [proteinPercent, setProteinPercent] = useState<number>();
	const [carbsPercent, setCarbsPercent] = useState<number>();
	const [fatsPercent, setFatsPercent] = useState<number>();
	const { firebaseUser } = useAuth();

	useEffect(() => {
		setCalPercent(
			currentCals > 0 && targetCals > 0
				? (currentCals / targetCals) * 100
				: 0
		);
		setProteinPercent(
			currentProtein > 0 && targetProtein > 0
				? (currentProtein / targetProtein) * 100
				: 0
		);
		setCarbsPercent(
			currentCarbs > 0 && targetCarbs > 0
				? (currentCarbs / targetCarbs) * 100
				: 0
		);
		setFatsPercent(
			currentFats > 0 && targetFats > 0
				? (currentFats / targetFats) * 100
				: 0
		);
	}, [
		targetCals,
		targetCarbs,
		targetFats,
		targetProtein,
		currentCals,
		currentCarbs,
		currentProtein,
		currentFats,
	]);

	useEffect(() => {
		const unsub1 = onSnapshot(doc(db, "macros", userUid), (doc) => {
			if (doc.data()) {
				setTargetProtein(doc.data().targetProtein);
				setTargetCarbs(doc.data().targetCarbs);
				setTargetFats(doc.data().targetFats);
				setTargetCals(doc.data().targetCals);
			}
		});
		if (firebaseUser && firebaseUser.uid) {
			const food_entry_query = query(
				collection(db, "food_entries"),
				where("uid", "==", firebaseUser.uid)
			);
			const unsubscribe = onSnapshot(
				food_entry_query,
				(querySnapshot) => {
					let foods = [];
					let totalCals = 0;
					let totalCarbs = 0;
					let totalProteins = 0;
					let totalFats = 0;
					querySnapshot.forEach((doc) => {
						foods.push(doc.data());
						totalCals += doc.data().calories;
						totalCarbs += doc.data().carbohydrates;
						totalFats += doc.data().fats;
						totalProteins += doc.data().proteins;
					});

					setCurrentCals(totalCals);
					setCurrentCarbs(totalCarbs);
					setCurrentFats(totalFats);
					setCurrentProtein(totalProteins);
				}
			);
		}
	}, [firebaseUser]);

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
