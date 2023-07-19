import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { getFoodByUpc } from "../api/foodDatabaseApi";
import { Food } from "../api/models/food.model";
import AddFoodModal from "./AddFoodModal";
import NewFoodModal from "./NewFoodModal";

interface FoodSearchByBarcodeProps {
	selectedFood: Food;
	setSelectedFood: (data: Food) => void;
}

export default function FoodSearchByBarcode(props: FoodSearchByBarcodeProps) {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	const [type, setType] = useState(CameraType.back);
	const [unkownUpc, setUnkownUpc] = useState<string>();

	useEffect(() => {
		const getCameraPermission = async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
		};
		getCameraPermission();
	}, []);

	function toggleCameraType() {
		setType((current) =>
			current === CameraType.back ? CameraType.front : CameraType.back
		);
	}

	const handleBarCodeScanned = async ({ type, data }) => {
		setScanned(true);
		try {
			if (!scanned) {
				const result: Food = await getFoodByUpc(data.toString());
				if (result.id) {
					props.setSelectedFood(result);
				} else {
					setUnkownUpc(data);
				}
			}
		} catch (error) {
			console.log(error);
			alert("Failed to retrieve nutritional facts");
			alert(error);
		}
	};

	if (hasPermission === null) {
		return <Text>Requesting camera permission...</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			<Camera
				barCodeScannerSettings={{
					barCodeTypes: [BarCodeScanner.Constants.BarCodeType.ean13],
				}}
				onBarCodeScanned={handleBarCodeScanned}
				style={{
					height: 300,
					width: 300,
					justifyContent: "center",
					alignItems: "center",
				}}
				type={type}
			>
				<View
					style={{
						padding: 10,
						position: "absolute",
						top: 0,
						right: 0,
					}}
				>
					<TouchableOpacity style={{}} onPress={toggleCameraType}>
						<MaterialIcons
							name="flip-camera-ios"
							size={24}
							color="white"
						/>
					</TouchableOpacity>
				</View>
				<View
					style={{
						width: "70%",
						height: "50%",
						borderWidth: 3,
						borderColor: "rgba(0,0,0,.2)",
						borderRadius: 10,
					}}
				></View>
				{scanned && (
					<Text
						style={{ marginTop: 20, fontSize: 16, color: "white" }}
						onPress={() => setScanned(false)}
					>
						Tap to Scan Again
					</Text>
				)}
			</Camera>
			<AddFoodModal
				selectedFood={props.selectedFood}
				setSelectedFood={props.setSelectedFood}
			/>
			<NewFoodModal
				unkownUpc={unkownUpc}
				setUnkownUpc={setUnkownUpc}
				selectedFood={props.selectedFood}
				setSelectedFood={props.setSelectedFood}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		borderWidth: 1,
	},
});
