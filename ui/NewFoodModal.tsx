import {
	Modal,
	SafeAreaView,
	TouchableOpacity,
	View,
	Text,
	TextInput,
	Button,
	ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Food, ServingSizeUnits } from "../api/models/food.model";
import { createFood } from "../api/foodDatabaseApi";
import { useToast } from "react-native-toast-notifications";

interface NewFoodModalProps {
	unkownUpc: string;
	setUnkownUpc: (data: string) => void;
	selectedFood: Food;
	setSelectedFood: (data: Food) => void;
}

export default function NewFoodModal(props: NewFoodModalProps) {
	const [newFood, setNewFood] = useState<Food>({
		title: "",
		upc: props.unkownUpc,
		calories: 0,
		protein: 0,
		carbohydrates: 0,
		fat: 0,
		servingSize: 0,
		servingUnits: ServingSizeUnits.GRAMS,
		verified: false,
	});
	const [formComplete, setFormComplete] = useState(false);
	const toast = useToast();

	useEffect(() => {
		if (newFood.title === "" || newFood.servingSize === 0 || newFood.upc) {
			setFormComplete(false);
		} else {
			setFormComplete(true);
		}
	}, [newFood]);

	const handleFormSubmit = async () => {
		try {
			newFood.upc = props.unkownUpc;
			const result = await createFood(newFood);

			if (result.id) {
				toast.show("Successfully created new food", {
					type: "success",
					placement: "top",
					duration: 1000,
					animationType: "slide-in",
				});
				props.setUnkownUpc(null);
				props.setSelectedFood(result);
			}
		} catch (error) {
			toast.show("Failed to create new food", {
				type: "warning",
				placement: "top",
				duration: 4000,
				animationType: "slide-in",
			});
			console.log(error);
			throw error;
		}
	};

	return (
		<Modal
			animationType="slide"
			transparent={false}
			visible={props.unkownUpc ? true : false}
		>
			<View style={{ backgroundColor: "#f9f9f9", flex: 1 }}>
				<SafeAreaView
					style={{
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						gap: 1,
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
						<TouchableOpacity
							onPress={() => {
								props.setUnkownUpc(null);
								setNewFood({
									title: "",
									upc: null,
									calories: 0,
									protein: 0,
									carbohydrates: 0,
									fat: 0,
									servingSize: 0,
									servingUnits: ServingSizeUnits.GRAMS,
									verified: false,
								});
							}}
						>
							<Feather name="x" size={24} color="black" />
						</TouchableOpacity>
					</View>
					<ScrollView
						showsVerticalScrollIndicator={false}
						style={{
							backgroundColor: "#f9f9f9",
							width: "100%",
						}}
						contentContainerStyle={{
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
							gap: 15,
							paddingBottom: 500,
						}}
					>
						<View
							style={{
								width: "100%",
								justifyContent: "flex-start",
								alignItems: "flex-start",
								padding: 20,
							}}
						>
							<Text style={{ fontWeight: "bold", fontSize: 20 }}>
								Add New Food To Database
							</Text>
						</View>

						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								width: "100%",
								borderBottomColor: "gray",
								borderBottomWidth: 1,
								paddingHorizontal: 20,
							}}
						>
							<Text style={{ fontWeight: "bold" }}>Title</Text>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									height: 40,
									margin: 12,
									borderWidth: 1,
									borderRadius: 20,
									width: "90%",
									paddingRight: 10,
								}}
							>
								<TextInput
									value={newFood?.title}
									onChangeText={(a) =>
										setNewFood({
											title: a,
											upc: newFood.upc,
											calories: newFood.calories,
											protein: newFood.protein,
											carbohydrates:
												newFood.carbohydrates,
											fat: newFood.fat,
											servingSize: newFood.servingSize,
											servingUnits: newFood.servingUnits,
											verified: newFood.verified,
										})
									}
									placeholder="Food title..."
									textAlign="left"
									style={{
										flex: 1,
										paddingVertical: 10,
										paddingHorizontal: 3,
									}}
								/>
							</View>
						</View>

						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								width: "100%",
								borderBottomColor: "gray",
								borderBottomWidth: 1,
								paddingHorizontal: 20,
							}}
						>
							<Text style={{ fontWeight: "bold" }}>Calories</Text>
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
									value={newFood?.calories.toString()}
									onChangeText={(a) =>
										setNewFood({
											title: newFood.title,
											upc: newFood.upc,
											calories: a ? parseFloat(a) : 0,
											protein: newFood.protein,
											carbohydrates:
												newFood.carbohydrates,
											fat: newFood.fat,
											servingSize: newFood.servingSize,
											servingUnits: newFood.servingUnits,
											verified: newFood.verified,
										})
									}
									placeholder="Calories per serving..."
									textAlign="left"
									style={{
										flex: 1,
										paddingVertical: 10,
										paddingHorizontal: 3,
									}}
								/>
							</View>
						</View>

						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								width: "100%",
								borderBottomColor: "gray",
								borderBottomWidth: 1,
								paddingHorizontal: 20,
							}}
						>
							<Text style={{ fontWeight: "bold" }}>Protein</Text>
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
									value={newFood?.protein.toString()}
									onChangeText={(a) =>
										setNewFood({
											title: newFood.title,
											upc: newFood.upc,
											calories: newFood.calories,
											protein: a ? parseFloat(a) : 0,
											carbohydrates:
												newFood.carbohydrates,
											fat: newFood.fat,
											servingSize: newFood.servingSize,
											servingUnits: newFood.servingUnits,
											verified: newFood.verified,
										})
									}
									placeholder="Protein per serving..."
									textAlign="left"
									style={{
										flex: 1,
										paddingVertical: 10,
										paddingHorizontal: 3,
									}}
								/>
							</View>
						</View>

						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								width: "100%",
								borderBottomColor: "gray",
								borderBottomWidth: 1,
								paddingHorizontal: 20,
							}}
						>
							<Text style={{ fontWeight: "bold" }}>
								Carbohydrates
							</Text>
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
									value={newFood?.carbohydrates.toString()}
									onChangeText={(a) =>
										setNewFood({
											title: newFood.title,
											upc: newFood.upc,
											calories: newFood.calories,
											protein: newFood.protein,
											carbohydrates: a
												? parseFloat(a)
												: 0,
											fat: newFood.fat,
											servingSize: newFood.servingSize,
											servingUnits: newFood.servingUnits,
											verified: newFood.verified,
										})
									}
									placeholder="Carbs per serving..."
									textAlign="left"
									style={{
										flex: 1,
										paddingVertical: 10,
										paddingHorizontal: 3,
									}}
								/>
							</View>
						</View>

						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								width: "100%",
								borderBottomColor: "gray",
								borderBottomWidth: 1,
								paddingHorizontal: 20,
							}}
						>
							<Text style={{ fontWeight: "bold" }}>Fat</Text>
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
									value={newFood?.fat.toString()}
									onChangeText={(a) =>
										setNewFood({
											title: newFood.title,
											upc: newFood.upc,
											calories: newFood.calories,
											protein: newFood.protein,
											carbohydrates:
												newFood.carbohydrates,
											fat: a ? parseFloat(a) : 0,
											servingSize: newFood.servingSize,
											servingUnits: newFood.servingUnits,
											verified: newFood.verified,
										})
									}
									placeholder="Fat per serving..."
									textAlign="left"
									style={{
										flex: 1,
										paddingVertical: 10,
										paddingHorizontal: 3,
									}}
								/>
							</View>
						</View>

						<View
							style={{
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								width: "100%",
								borderBottomColor: "gray",
								borderBottomWidth: 1,
								paddingHorizontal: 20,
								paddingBottom: 20,
								gap: 10
							}}
						>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									width: "100%",
								}}
							>
								<Text style={{ fontWeight: "bold" }}>
									Serving size
								</Text>
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
										value={newFood?.servingSize.toString()}
										onChangeText={(a) =>
											setNewFood({
												title: newFood.title,
												upc: newFood.upc,
												calories: newFood.calories,
												protein: newFood.protein,
												carbohydrates:
													newFood.carbohydrates,
												fat: newFood.fat,
												servingSize: a
													? parseFloat(a)
													: 0,
												servingUnits:
													newFood.servingUnits,
												verified: newFood.verified,
											})
										}
										placeholder="Serving size..."
										textAlign="left"
										style={{
											flex: 1,
											paddingVertical: 10,
											paddingHorizontal: 3,
										}}
									/>
								</View>
							</View>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									width: "100%",
								}}
							>
								<Text style={{ fontWeight: "bold" }}>
									Serving size
								</Text>
								<View
									style={{
										flexDirection: "row",
										gap: 10,
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<TouchableOpacity
										style={
											newFood.servingUnits === 0
												? {
														paddingHorizontal: 8,
														paddingVertical: 4,
														borderRadius: 10,
														borderWidth: 1,
														borderColor: "blue",
												  }
												: {
														paddingHorizontal: 4,
														paddingVertical: 2,
														borderRadius: 10,
												  }
										}
										onPress={() =>
											setNewFood({
												title: newFood.title,
												upc: newFood.upc,
												calories: newFood.calories,
												protein: newFood.protein,
												carbohydrates:
													newFood.carbohydrates,
												fat: newFood.fat,
												servingSize:
													newFood.servingSize,
												servingUnits: 0,
												verified: newFood.verified,
											})
										}
									>
										<Text
											style={
												newFood.servingUnits === 0
													? {
															color: "blue",
													  }
													: {
															color: "black",
													  }
											}
										>
											Grams
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={
											newFood.servingUnits === 1
												? {
														paddingHorizontal: 8,
														paddingVertical: 4,
														borderRadius: 10,
														borderWidth: 1,
														borderColor: "blue",
												  }
												: {
														paddingHorizontal: 4,
														paddingVertical: 2,
														borderRadius: 10,
												  }
										}
										onPress={() =>
											setNewFood({
												title: newFood.title,
												upc: newFood.upc,
												calories: newFood.calories,
												protein: newFood.protein,
												carbohydrates:
													newFood.carbohydrates,
												fat: newFood.fat,
												servingSize:
													newFood.servingSize,
												servingUnits: 1,
												verified: newFood.verified,
											})
										}
									>
										<Text
											style={
												newFood.servingUnits === 1
													? {
															color: "blue",
													  }
													: {
															color: "black",
													  }
											}
										>
											Milliters
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={
											newFood.servingUnits === 2
												? {
														paddingHorizontal: 8,
														paddingVertical: 4,
														borderRadius: 10,
														borderWidth: 1,
														borderColor: "blue",
												  }
												: {
														paddingHorizontal: 4,
														paddingVertical: 2,
														borderRadius: 10,
												  }
										}
										onPress={() =>
											setNewFood({
												title: newFood.title,
												upc: newFood.upc,
												calories: newFood.calories,
												protein: newFood.protein,
												carbohydrates:
													newFood.carbohydrates,
												fat: newFood.fat,
												servingSize:
													newFood.servingSize,
												servingUnits: 2,
												verified: newFood.verified,
											})
										}
									>
										<Text
											style={
												newFood.servingUnits === 2
													? {
															color: "blue",
													  }
													: {
															color: "black",
													  }
											}
										>
											Ounces
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>

						<Button
							title="Create Food"
							onPress={handleFormSubmit}
							disabled={!formComplete}
						/>
					</ScrollView>
				</SafeAreaView>
			</View>
		</Modal>
	);
}
