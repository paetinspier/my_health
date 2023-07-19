import { TextInput, TouchableOpacity, View, Text, Image } from "react-native";
import AddFoodModal from "./AddFoodModal";
import { Food } from "../api/models/food.model";
import { MaterialIcons } from '@expo/vector-icons';

interface FoodSearchByNameProps {
	searchTerm: string;
	setSearchTerm: (data: string) => void;
	foodList: Food[];
	selectedFood: Food;
	setSelectedFood: (data: Food) => void;
}

export default function FoodSearchByName(props: FoodSearchByNameProps) {
	return (
		<View>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					height: 40,
					margin: 12,
					borderWidth: 1,
					borderRadius: 20,
					width: "100%",
				}}
			>
				<TextInput
					value={props.searchTerm}
					placeholder="Search for a food..."
					onChangeText={(term) => props.setSearchTerm(term)}
					style={{
						flex: 1,
						paddingVertical: 10,
						paddingHorizontal: 20,
					}}
				/>
			</View>

			<View
				style={{
					width: "100%",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					gap: 10,
				}}
			>
				{props.foodList?.map((food, index) => {
					return (
						<TouchableOpacity
							key={food.id}
							style={{
								width: "100%",
								justifyContent: "flex-start",
								alignItems: "center",
								flexDirection: "row",
								backgroundColor: "#f9f9f9",
								borderRadius: 20,
								paddingVertical: 10,
								gap: 20,
							}}
							onPress={() => props.setSelectedFood(food)}
						>
							<View
								style={{
									width: 25,
									height: 25,
									borderRadius: 20,
									backgroundColor: "#2465FD",
								}}
							></View>
							<View
								style={{
									justifyContent: "flex-start",
									alignItems: "flex-start",
									flexDirection: "column",
								}}
							>
								<Text
									style={{
										color: "black",
										fontWeight: "bold",
										fontSize: 12,
										flexDirection: 'row',
										justifyContent: 'center', 
										alignItems: 'center',
										gap: 3
									}}
								>
									{food.title} <MaterialIcons name="verified" size={24} color="black" />
								</Text>
								<Text style={{ color: "gray" }}>
									Kcal: {Math.round(food.calories)} | P:{" "}
									{Math.round(food.protein)} | C:{" "}
									{Math.round(food.carbohydrates)} | F:{" "}
									{Math.round(food.fat)}
								</Text>
							</View>
						</TouchableOpacity>
					);
				})}
			</View>

			<AddFoodModal
				selectedFood={props.selectedFood}
				setSelectedFood={props.setSelectedFood}
			/>
		</View>
	);
}
