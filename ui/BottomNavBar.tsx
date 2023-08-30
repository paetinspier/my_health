import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign, Fontisto, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

function BottomNavBar({selected, setSelected}) {
	const buttons = [
		{
			id: 1,
			icon: <AntDesign name="home" size={24} color="gray" />,
			selectedIcon: <AntDesign name="home" size={24} color="black" />,
			text: "Home",
		},
		// {
		// 	id: 2,
		// 	icon: <Fontisto name="blood-drop" size={24} color="gray" />,
		// 	selectedIcon: <Fontisto name="blood-drop" size={24} color="black" />,
		// 	text: "T1D",
		// },
		{
			id: 3,
			icon: <MaterialCommunityIcons name="food-drumstick" size={24} color="gray" />,
			selectedIcon: <MaterialCommunityIcons name="food-drumstick" size={24} color="black" />,
			text: "Nutrition",
		},
		{
			id: 4,
			icon: <Ionicons name="person" size={24} color="gray" />,
			selectedIcon: <Ionicons name="person" size={24} color="black" />,
			text: "Profile",
		}
	];
	return (
		<View
			style={{
				width: "100%",
				backgroundColor: "#fff",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				paddingTop: 20,
				paddingHorizontal: 20,
				gap: 3,
			}}
		>
			{buttons.map((button) => {
				return (
					<TouchableOpacity
						key={button.id}
						style={{
							flex: 1,
							flexDirection: "column",
							alignItems: "center",
							borderRadius: 12
						}}
						onPress={() => setSelected(button.id)}
					>
						{selected === button.id ? button.selectedIcon : button.icon}
						<Text style={selected === button.id ? {color: 'black'} : {color: 'gray'}}>{button.text}</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

export default BottomNavBar;
