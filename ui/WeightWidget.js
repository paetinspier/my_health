import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function WeightWidget() {
	const width = Dimensions.get("window").width*.9;
	const height = 220;
	const chartConfig = {
		backgroundColor: "#338AFF",
		backgroundGradientFrom: "#338AFF",
		backgroundGradientTo: "#338AFF",
		color: (opacity = .5) => `rgba(${255}, ${255}, ${255}, ${opacity})`,
	};
	const data = {
		labels: ["08/11", "08/12", "08/13", "08/14", "08/15", "08/16"],
		datasets: [
			{
				data: [172, 175, 170, 169, 171, 168],
				color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
			},
		],
	};
	const graphStyle = {
		marginVertical: 8,
		...chartConfig.style,
	};
	return (
		<View
			style={{
				backgroundColor: "#338AFF",
				borderRadius: 20,
				paddingHorizontal: 20,
				paddingVertical: 30,
				justifyContent: "start",
				alignItems: "center",
				flexDirection: "column",
				width: "100%",
				gap: 5,
			}}
		>
			<Text
				style={{
					fontWeight: "bold",
					color: "white",
					textAlign: "left",
					width: "100%",
				}}
			>
				My Weight
			</Text>
			<LineChart
				data={data}
				width={width}
				height={height}
                withVerticalLines={false}
				chartConfig={chartConfig}
				bezier
				style={graphStyle}
			/>
		</View>
	);
}
