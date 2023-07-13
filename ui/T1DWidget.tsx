import {useEffect, useState} from "react";
import { View, Text } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

export default function T1DWidget() {
    const tir = 75;
    const bad = '#FF6833';
    const ok = '#FFC433';
    const good = '#2ecc71';
    const [tirColor, setTirColor] = useState(bad);
    useEffect(() => {
        if(tir<60) setTirColor(bad);
        else if(tir<70) setTirColor(ok);
        else setTirColor(good)
    },[])

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
			<Text
				style={{
					fontWeight: "bold",
					color: "black",
					textAlign: "left",
					width: "100%",
				}}
			>
				T1D Summary
			</Text>

			<View
				style={{
					width: "100%",
					justifyContent: "flex-start",
					alignItems: "center",
					gap: 3,
					flexDirection: "row",
				}}
			>
				<Text style={{ color: "gray", textAlign: "left" }}>
					Time in range
				</Text>
			</View>

			<CircularProgress
				radius={90}
				value={tir}
				titleColor="#222"
				titleFontSize={20}
				valueSuffix="%"
				activeStrokeColor={tirColor}
				inActiveStrokeOpacity={0.2}
				duration={3000}
			/>
		</View>
	);
}
