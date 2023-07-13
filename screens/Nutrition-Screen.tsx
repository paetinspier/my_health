import { ScrollView, View, Text, TouchableOpacity, Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import MacrosWidget from "../ui/MacrosWidget";
import MacroGoalsWidget from "../ui/MacroGoalsWidget";
import { useState } from 'react'
import FoodSearchWidget from "../ui/FoodSearchWidget";

export default function NutritionScreen() {
	const [addFood, setAddFood] = useState(false);

	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{
					flex: 1,
					backgroundColor: "#f9f9f9",
				}}
				contentContainerStyle={{
					justifyContent: "center",
					alignItems: "center",
					gap: 15,
					marginHorizontal: 10,
					paddingVertical: 20,
				}}
			>
				<View
					style={{
						width: "100%",
						justifyContent: "space-between",
						alignItems: "center",
						flexDirection: "row",
					}}
				>
					<Text
						style={{
							fontSize: 20,
							fontWeight: "bold",
							color: "black",
						}}
					>
						Nutrition Dashboard
					</Text>
					{addFood ? (
						<TouchableOpacity
							onPress={() => setAddFood(false)}
							style={{
								padding: 8,
								borderRadius: 100,
								justifyContent: "center",
								alignItems: "center",
								flexDirection: "row",
								gap: 1,
								backgroundColor: "rgba(0,0,0,.2)",
							}}
						>
							<Text style={{ color: "#2465FD", fontSize: 16 }}>
								Back
							</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							onPress={() => setAddFood(true)}
							style={{
								padding: 8,
								borderRadius: 100,
								justifyContent: "center",
								alignItems: "center",
								flexDirection: "row",
								gap: 1,
								backgroundColor: "rgba(0,0,0,.2)",
							}}
						>
							<AntDesign name="plus" size={16} color="#2465FD" />
							<Text style={{ color: "#2465FD", fontSize: 16 }}>
								Add Food
							</Text>
						</TouchableOpacity>
					)}
				</View>
				{/* ADD FOOD SCREEN */}
				{addFood && <FoodSearchWidget/>}

				{!addFood && <MacrosWidget />}
				{!addFood && <MacroGoalsWidget />}
			</ScrollView>
		</View>
	);
}
