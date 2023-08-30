import { TextInput, TouchableOpacity, View, Text, Image } from "react-native";
import AddFoodModal from "./AddFoodModal";
import { Food } from "../api/models/food.model";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { searchFoodsByTerm } from "../api/foodDatabaseApi";

interface FoodSearchByNameProps {
	foodList: Food[];
	setFoodList: (data: Food[]) => void;
	selectedFood: Food;
	setSelectedFood: (data: Food) => void;
}

export default function FoodSearchByName(props: FoodSearchByNameProps) {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const fetchData = async () => {
		setLoading(true);
		try {
			const results = await searchFoodsByTerm(searchTerm, 10);
			if (results) {
				props.setFoodList(results);
			} else {
				props.setFoodList([]);
			}
			setLoading(false);
		} catch (error) {
			// Handle the error, e.g., show an error message to the user
			console.log(error);
			setLoading(false)
		}
	};
	useEffect(() => {
		console.log(props.foodList);
	}, [props.foodList]);

	
	return (
		<View style={{width: '100%'}}>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					width: "100%",
					gap: 4,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						height: 40,
						marginVertical: 12,
						borderWidth: 1,
						borderRadius: 20,
						flex: 2,
					}}
				>
					<TextInput
						value={searchTerm}
						placeholder="Search for a food..."
						onChangeText={(term) => setSearchTerm(term)}
						style={{
							flex: 1,
							paddingVertical: 10,
							paddingHorizontal: 20,
						}}
					/>
				</View>
				<TouchableOpacity
					disabled={!searchTerm || searchTerm.length < 1}
					style={{
						padding: 8,
						borderRadius: 100,
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "row",
						gap: 1,
						backgroundColor: "#2465FD",
					}}
					onPress={fetchData}
				>
					<Text style={{ color: "white" }}>Search</Text>
				</TouchableOpacity>
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
				{loading ? (
					<Text>Loading...</Text>
				) : (
					props.foodList?.map((food, index) => {
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
									paddingHorizontal: 5,
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
											fontSize: 14,
											flexDirection: "row",
											justifyContent: "center",
											alignItems: "center",
											gap: 3,
										}}
									>
										{food.title}{" "}
										<MaterialIcons
											name="verified"
											size={12}
											color="black"
										/>
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
					})
				)}
			</View>

			<AddFoodModal
				selectedFood={props.selectedFood}
				setSelectedFood={props.setSelectedFood}
			/>
		</View>
	);
}
