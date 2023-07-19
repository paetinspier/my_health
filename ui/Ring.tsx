import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import PieChart from "react-native-pie-chart";

interface RingProps {
	size: number;
	color1: string;
	color2: string;
	color3: string;
	color4: string;
	length1: number;
	length2: number;
	length3: number;
	kcals: string;
}

const Ring: React.FC<RingProps> = ({
	size,
	color1,
	color2,
	color3,
	length1,
	length2,
	length3,
	kcals,
}) => {
	const widthAndHeight = 150;
	const [series, setSeries] = useState<number[]>([1, 1, 1]);
	const sliceColor = [color1, color2, color3];

	const checkforzerosum = () => {
		let sum = 0;
		series.forEach((s) => {
			sum += s;
		});

		if (sum === 0) {
			setSeries([1, 1, 1]);
		} 
    // else {
		// 	setSeries([length1, length2, length3]);
		// }
	};

	useEffect(() => {
    checkforzerosum();
  }, [series, length1, length2, length3]);

	return (
		<View>
			<PieChart
				widthAndHeight={widthAndHeight}
				series={series}
				sliceColor={sliceColor}
				coverRadius={0.75}
				coverFill={"#FFF"}
			/>
			<View
				style={{
					position: "absolute",
					top: -25,
					left: -25,
					width: size,
					height: size,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text style={{ fontWeight: "bold", fontSize: 16 }}>
					{kcals}kcals
				</Text>
			</View>
		</View>
	);
};

export default Ring;
