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
import Ring from "./Ring";
import {
	CalculateFoodMacroPercentages,
	MacrosPercentages,
} from "../logic/MathFunctions";
import { Food } from "../api/models/food.model";

interface AddFoodModalProps {
	selectedFood: Food;
	setSelectedFood: (data: Food) => void;
}

export default function AddFoodModal(props: AddFoodModalProps) {
	const [amount, setAmount] = useState<string>(props.selectedFood?.servingSize.toString());
	const [foodColor, setFoodColor] = useState<string>();
	const [macrosPercentages, setMacrosPercentages] =
		useState<MacrosPercentages>({ protein: 0, fat: 0, carbs: 0, other: 0 });

	useEffect(() => {
		if (props.selectedFood) {
			setAmount(props.selectedFood.servingSize.toString())
			const { carbohydrates, protein, fat } = props.selectedFood;
			const maxNutrient = Math.max(
				carbohydrates ?? 0,
				protein ?? 0,
				fat ?? 0
			);

			const foodColor =
				maxNutrient === carbohydrates
					? "yellow"
					: maxNutrient === protein
					? "blue"
					: maxNutrient === fat
					? "red"
					: "black";

			setMacrosPercentages(
				CalculateFoodMacroPercentages(
					props.selectedFood.carbohydrates,
					props.selectedFood.protein,
					props.selectedFood.fat
				)
			);
			setFoodColor(foodColor);
		} else {
			setFoodColor("black");
		}
	}, [props.selectedFood]);

	return (
		<Modal
			animationType="slide"
			transparent={false}
			visible={props.selectedFood ? true : false}
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
						<TouchableOpacity
							onPress={() => props.setSelectedFood(null)}
						>
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
								color={foodColor}
							/>
							<Text style={{ fontWeight: "bold", fontSize: 20 }}>
								{props.selectedFood?.title}
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
									value={amount}
									onChangeText={(a) => setAmount(a)}
									placeholder="10"
									textAlign="right"
									style={{
										flex: 1,
										paddingVertical: 10,
										paddingHorizontal: 3,
									}}
								/>
								<Text>{props.selectedFood?.servingUnits}</Text>
							</View>
						</View>
						{/* <View
							style={{
								flexDirection: "column",
								justifyContent: "flex-start",
								alignItems: "flex-start",
								width: "100%",
							}}
						>
							<Text style={{ fontWeight: "bold" }}>
								Serving Size
							</Text>
							<View
								style={{
									flexDirection: "row",
									flexWrap: "wrap",
									justifyContent: "flex-start",
									alignItems: "flex-start",
									gap: 5,
									marginTop: 5,
								}}
							>
								{props.selectedFood?.measurements?.map((m) => {
									return (
										<TouchableOpacity
											key={m.label}
											style={
												selectedMeasurement &&
												selectedMeasurement === m.label
													? {
															backgroundColor:
																"#2465FD",
															paddingVertical: 5,
															paddingHorizontal: 10,
															borderRadius: 20,
													  }
													: {
															backgroundColor:
																"rgba(0,0,0,.2)",
															paddingVertical: 5,
															paddingHorizontal: 10,
															borderRadius: 20,
													  }
											}
											onPress={() =>
												setSelectedMeasurement(m.label)
											}
										>
											<Text
												style={
													selectedMeasurement &&
													selectedMeasurement ===
														m.label
														? { color: "white" }
														: { color: "#2465FD" }
												}
											>
												{m.label}
											</Text>
										</TouchableOpacity>
									);
								})}
							</View>
						</View> */}
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
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								gap: 20,
							}}
						>
							<View
								style={{
									flex: 1,
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Ring
									size={200}
									color1="red"
									color2="blue"
									color3="green"
									color4={"black"}
									length1={macrosPercentages.carbs}
									length2={macrosPercentages.protein}
									length3={macrosPercentages.fat}
									kcals={(
										Math.round(
											props.selectedFood?.calories
										) *
										(parseInt(amount)
											? Math.floor(parseInt(amount)/props.selectedFood.servingSize)
											: 1)
									).toString()}
								/>
							</View>

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
									Protein (
									{Math.round(
										macrosPercentages.protein * 100
									)}
									%) -{" "}
									{Math.round(props.selectedFood?.protein) *
										(parseInt(amount)
											? Math.floor(parseInt(amount)/props.selectedFood.servingSize)
											: 1)}
									g
								</Text>
								<Text
									style={{ color: "red", fontWeight: "bold" }}
								>
									Carbs (
									{Math.round(macrosPercentages.carbs * 100)}
									%) -{" "}
									{Math.round(
										props.selectedFood?.carbohydrates
									) *
										(parseInt(amount)
											? Math.floor(parseInt(amount)/props.selectedFood.servingSize)
											: 1)}
									g
								</Text>
								<Text
									style={{
										color: "green",
										fontWeight: "bold",
									}}
								>
									fats (
									{Math.round(macrosPercentages.fat * 100)}%)
									-{" "}
									{Math.round(props.selectedFood?.fat) *
										(parseInt(amount)
											? Math.floor(parseInt(amount)/props.selectedFood.servingSize)
											: 1)}
									g
								</Text>
								<Text
									style={{
										color: "black",
										fontWeight: "bold",
									}}
								>
									Other (
									{Math.round(macrosPercentages.other * 100)}
									%)
								</Text>
							</View>
						</View>
					</View>
				</SafeAreaView>
			</View>
		</Modal>
	);
}
