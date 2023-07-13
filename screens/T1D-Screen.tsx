import { View, Text } from "react-native";

export default function T1DScreen() {
    return(
        <View style={{ flex: 1, backgroundColor: "#fff", width: '100%', justifyContent: 'center', alignItems: 'center' }}>
			<Text
				style={{
					fontSize: 24,
					fontWeight: "bold",
					marginBottom: 10,
				}}
			>
				Welcome to My App!
			</Text>
			<Text style={{ fontSize: 16, color: "#555" }}>
				Explore and enjoy the features.
			</Text>
            <Text>T1D Page</Text>
		</View>
    );
}