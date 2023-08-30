import { useState, useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Food } from "../api/models/food.model";
import FoodSearchByName from "./FoodSearchByName";
import FoodSearchByBarcode from "./FoodSearchByBarcode";
import { searchFoodsByTerm } from "../api/foodDatabaseApi";

export default function FoodSearchWidget() {
	const [searchMode, setSearchMode] = useState(1);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [foodList, setFoodList] = useState<Food[]>([]);
	const [selectedFood, setSelectedFood] = useState<Food>();

	async function fetchData() {
		try {
			console.log("st:", searchTerm);
			const results = await searchFoodsByTerm(searchTerm, 10);
			if (results) {
				setFoodList(results);
			} else {
				setFoodList([]);
			}
		} catch (error) {
			// Handle the error, e.g., show an error message to the user
			console.log(error);
		}
	}

	useEffect(() => {
		if (!searchTerm || searchTerm.length === 0 || searchTerm === "") {
			setFoodList([]);
		} else {
			fetchData();
		}
	}, [searchTerm]);

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
					justifyContent: "center",
					alignItems: "flex-start",
				}}
			>
				<Text
					style={{ fontSize: 18, fontWeight: "bold", color: "black" }}
				>
					Food Search
				</Text>
			</View>

			<View
				style={{
					flexDirection: "row",
					gap: 3,
					flex: 1,
					justifyContent: "flex-start",
					alignItems: "center",
					width: "100%",
				}}
			>
				<TouchableOpacity
					style={
						searchMode === 1
							? {
									padding: 8,
									borderRadius: 100,
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "row",
									gap: 1,
									backgroundColor: "#2465FD",
							  }
							: {
									padding: 8,
									borderRadius: 100,
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "row",
									gap: 1,
									backgroundColor: "rgba(0,0,0,.2)",
							  }
					}
					onPress={() => setSearchMode(1)}
				>
					<Text
						style={
							searchMode === 1
								? { color: "white" }
								: { color: "#2465FD" }
						}
					>
						Search by name
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={
						searchMode === 2
							? {
									padding: 8,
									borderRadius: 100,
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "row",
									gap: 1,
									backgroundColor: "#2465FD",
							  }
							: {
									padding: 8,
									borderRadius: 100,
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "row",
									gap: 1,
									backgroundColor: "rgba(0,0,0,.2)",
							  }
					}
					onPress={() => setSearchMode(2)}
				>
					<Text
						style={
							searchMode === 2
								? { color: "white" }
								: { color: "#2465FD" }
						}
					>
						Scan barcode
					</Text>
				</TouchableOpacity>
			</View>

			{searchMode === 1 ? (
				<FoodSearchByName
					foodList={foodList}
					selectedFood={selectedFood}
					setSelectedFood={setSelectedFood}
					setFoodList={setFoodList}
				/>
			) : (
				<View style={{ flex: 1 }}>
					<FoodSearchByBarcode
						selectedFood={selectedFood}
						setSelectedFood={setSelectedFood}
					/>
				</View>
			)}
		</View>
	);
}
