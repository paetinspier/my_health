import { ScrollView, View } from "react-native";
import MacrosWidget from "../ui/MacrosWidget";
import WeightWidget from "../ui/WeightWidget";
import T1DWidget from "../ui/T1DWidget";

export default function HomeScreen() {
	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{
					flex: 1,
					backgroundColor: "#f9f9f9",
				}}
				contentContainerStyle={{
					justifyContent: "center",
					alignItems: "center",
					gap: 15,
					marginHorizontal: 10,
					paddingVertical: 20,
				}}
			>
				<MacrosWidget />
				<WeightWidget />
				<T1DWidget />
			</ScrollView>
		</View>
	);
}
