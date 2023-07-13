import axios from "axios";

export async function SearchFoodByName(searchTerm: string) {
	try {
		if (!searchTerm || searchTerm.length === 0) return [];
		const response = await axios.get(
			`${process.env.EXPO_PUBLIC_EDAMAM_PARSER_API_URL}?app_id=${process.env.EXPO_PUBLIC_EDAMAM_APP_ID}&app_key=${process.env.EXPO_PUBLIC_EDAMAM_API_KEY}&ingr=${searchTerm}&nutrition-type=logging`
		);

		const result = response.data.hints;

		result.forEach((r) => {
			const foodData = r.food;
			const foodMeasurement = r.measurements;
			const simplifiedFoodData = {
				category: foodData.category,
				categoryLabel: foodData.categoryLabel,
				foodId: foodData.foodId,
				image: foodData.image,
				knownAs: foodData.knownAs,
				label: foodData.label,
				nutrients: foodData.nutrients,
				measurements: foodMeasurement,
			};

			console.log(simplifiedFoodData.nutrients);
		});

		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
