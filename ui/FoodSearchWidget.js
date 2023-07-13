import { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, Button, TextInput } from "react-native";
import { SearchFoodByName } from "../api/edamam";

export default function FoodSearchWidget() {
	const [searchMode, setSearchMode] = useState(1);
	const [searchTerm, setSerachTerm] = useState("");

	useEffect(() => {
		async function fetchData() {
			try {
				const results = await SearchFoodByName(searchTerm);
			} catch (error) {
				// Handle the error, e.g., show an error message to the user
                console.log(error)
			}
		}

		fetchData();
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
					alignItems: "start",
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
					value={searchTerm}
					placeholder="Search for a food..."
					onChangeText={(term) => setSerachTerm(term)}
					style={{
						flex: 1,
						paddingVertical: 10,
						paddingHorizontal: 20,
					}}
				/>
			</View>
		</View>
	);
}
