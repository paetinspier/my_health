import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import Header from "../ui/Header";
import BottomNavBar from "../ui/BottomNavBar";
import HomeScreen from "./Home-Screen";
import T1DScreen from "./T1D-Screen";
import NutritionScreen from "./Nutrition-Screen";
import ProfileScreen from "./Profile-Screen";
import SignUp from "./SignUp";
import Login from "./Login";
import { useAuth } from "../context/AuthContext";

export default function Authentication() {
	const [selected, setSelected] = useState(1);
	const [selectedPreAuth, setSelectedPreAuth] = useState(2);
	const { firebaseUser } = useAuth();

	const authPages = [
		{
			id: 1,
			page: <HomeScreen key={1} />,
		},
		{
			id: 2,
			page: <T1DScreen key={2} />,
		},
		{
			id: 3,
			page: <NutritionScreen key={3} />,
		},
		{
			id: 4,
			page: <ProfileScreen key={4} />,
		},
	];

	const preAuthPages = [
		{
			id: 1,
			page: <SignUp key={1} setSelectedPreAuth={setSelectedPreAuth} />,
		},
		{
			id: 2,
			page: <Login key={2} setSelectedPreAuth={setSelectedPreAuth} />,
		},
	];

	if (firebaseUser) {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
				<View
					style={{
						flex: 4,
						justifyContent: "flex-start",
						alignItems: "center",
						backgroundColor: "#f9f9f9",
					}}
				>
					<Header />
					{authPages.map((page) => {
						if (page.id === selected) {
							return page.page;
						}
					})}
				</View>
				<BottomNavBar selected={selected} setSelected={setSelected} />
			</SafeAreaView>
		);
	} else {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
				<View
					style={{
						flex: 4,
						justifyContent: "flex-start",
						alignItems: "center",
						backgroundColor: "#f9f9f9",
					}}
				>
					{selectedPreAuth === 1 && (
						<SignUp setSelectedPreAuth={setSelectedPreAuth} />
					)}
					{selectedPreAuth === 2 && (
						<Login setSelectedPreAuth={setSelectedPreAuth} />
					)}
				</View>
			</SafeAreaView>
		);
	}
}
