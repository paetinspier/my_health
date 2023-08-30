import {
	Modal,
	SafeAreaView,
	TouchableOpacity,
	View,
	Text,
	TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
	Feather,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import { Food } from "../api/models/food.model";
import { createFoodEntry } from "../api/food_entry_service";
import { useAuth } from "../context/AuthContext";
import { useToast } from "react-native-toast-notifications";

interface AddFoodModalProps {
	selectedFood: Food;
	setSelectedFood: (data: Food) => void;
}

export default function AddFoodModal({
	selectedFood,
	setSelectedFood,
}: AddFoodModalProps) {
	const [foodEntry, setFoodEntry] = useState<Food>({
		id: 0,
		title: "",
		upc: "",
		calories: 0,
		protein: 0,
		carbohydrates: 0,
		fat: 0,
		servingSize: 0,
		servingUnits: 0,
		verified: false,
	});
	const { firebaseUser } = useAuth();
	const toast = useToast();

	useEffect(() => {
		if (selectedFood && selectedFood.title !== foodEntry.title) {
			setFoodEntry(selectedFood);
		} else if (!selectedFood) {
			setFoodEntry({
				id: 0,
				title: "",
				upc: "",
				calories: 0,
				protein: 0,
				carbohydrates: 0,
				fat: 0,
				servingSize: 0,
				servingUnits: 0,
				verified: false,
			});
		}
	}, [selectedFood]);

	function changeServingSize(value: string) {
		if (value.length < 0 || isNaN(parseInt(value))) {
			value = "0";
		}

		const newServingSize = parseInt(value);
		const baseServingSize = selectedFood.servingSize;

		const servingMultiplier =
			newServingSize === 0 ? 0 : newServingSize / baseServingSize;

		setFoodEntry({
			id: foodEntry.id,
			title: foodEntry.title,
			upc: foodEntry.upc,
			calories: Math.round(selectedFood.calories * servingMultiplier),
			protein: Math.round(selectedFood.protein * servingMultiplier),
			carbohydrates: Math.round(
				selectedFood.carbohydrates * servingMultiplier
			),
			fat: Math.round(selectedFood.fat * servingMultiplier),
			servingSize: newServingSize,
			servingUnits: foodEntry.servingUnits,
			verified: foodEntry.verified,
		});
	}

	const handleAddedFood = () => {
		let result = createFoodEntry(foodEntry, firebaseUser.uid);

		if(result){
			toast.show("Successfully added new food entry", {
				type: "success",
				placement: "top",
				duration: 1000,
				animationType: "slide-in",
			});
			setSelectedFood(null);
		}
	}

	return (
		<Modal
			animationType="slide"
			transparent={false}
			visible={selectedFood ? true : false}
		>
			<View style={{ backgroundColor: "#f9f9f9", flex: 1 }}>
				<SafeAreaView
					style={{
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						gap: 20,
					}}
				>
					<View
						style={{
							width: "100%",
							justifyContent: "flex-end",
							alignItems: "flex-end",
							padding: 20,
						}}
					>
						<TouchableOpacity onPress={() => setSelectedFood(null)}>
							<Feather name="x" size={24} color="black" />
						</TouchableOpacity>
					</View>
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
							gap: 20,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "flex-start",
								alignItems: "center",
								width: "100%",
								gap: 10,
							}}
						>
							<MaterialCommunityIcons
								name="silverware"
								size={24}
								color={"black"}
							/>
							<Text style={{ fontWeight: "bold", fontSize: 20 }}>
								{selectedFood?.title}
							</Text>
							<MaterialIcons
								name="verified"
								size={24}
								color="green"
							/>
						</View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								width: "100%",
								borderBottomColor: "gray",
								borderBottomWidth: 1,
							}}
						>
							<Text style={{ fontWeight: "bold" }}>Amount</Text>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									height: 40,
									margin: 12,
									borderWidth: 1,
									borderRadius: 20,
									width: "50%",
									paddingRight: 10,
								}}
							>
								<TextInput
									keyboardType="numeric"
									value={foodEntry.servingSize.toString()}
									onChangeText={(a) => changeServingSize(a)}
									placeholder="10"
									textAlign="right"
									style={{
										flex: 1,
										paddingVertical: 10,
										paddingHorizontal: 3,
									}}
								/>
								{(() => {
									switch (selectedFood?.servingUnits) {
										case 0:
											return <Text>g</Text>;
										case 1:
											return <Text>ml</Text>;
										case 2:
											return <Text>oz</Text>;
									}
								})()}
							</View>
						</View>
					</View>

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
							gap: 20,
						}}
					>
						<View style={{ width: "100%" }}>
							<Text
								style={{
									fontWeight: "bold",
									fontSize: 24,
									textAlign: "left",
								}}
							>
								Energy Summary
							</Text>
						</View>

						<View
							style={{
								width: "100%",
								flexDirection: "row",
								justifyContent: "flex-start",
								alignItems: "flex-start",
								gap: 20,
							}}
						>
							<View
								style={{
									flexDirection: "column",
									justifyContent: "flex-start",
									alignItems: "flex-start",
									gap: 10,
								}}
							>
								<Text
									style={{
										color: "blue",
										fontWeight: "bold",
									}}
								>
									Calories - {foodEntry.calories} Kcals
								</Text>
								<Text
									style={{
										color: "blue",
										fontWeight: "bold",
									}}
								>
									Protein - {foodEntry.protein} g
								</Text>
								<Text
									style={{ color: "red", fontWeight: "bold" }}
								>
									Carbs - {foodEntry.carbohydrates} g
								</Text>
								<Text
									style={{
										color: "green",
										fontWeight: "bold",
									}}
								>
									fats - {foodEntry.fat} g
								</Text>
							</View>
						</View>
					</View>

					<View
						style={{
							flexDirection: "row",
							gap: 30,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<TouchableOpacity
							style={{
								paddingVertical: 20,
								paddingHorizontal: 50,
								borderRadius: 20,
								borderWidth: 1,
								borderColor: "red",
							}}
						>
							<Text style={{ color: "black" }}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={handleAddedFood}
							style={{
								paddingVertical: 20,
								paddingHorizontal: 50,
								borderRadius: 20,
								borderWidth: 1,
								borderColor: "green",
							}}
						>
							<Text style={{ color: "green" }}>Add Food</Text>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			</View>
		</Modal>
	);
}
