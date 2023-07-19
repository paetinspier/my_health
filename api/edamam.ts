// import axios, { AxiosResponse } from "axios";

// export interface Food {
// 	category: string;
// 	categoryLabel: string;
// 	foodId: string;
// 	image: string;
// 	knownAs: string;
// 	label: string;
// 	nutrients: Nutrients;
// 	measurements: Measurement[];
// }

// interface Nutrients {
// 	[key: string]: number;
// 	CHOCDF: number;
// 	ENERC_KCAL: number;
// 	FAT: number;
// 	FIBTG: number;
// 	PROCNT: number;
// }

// interface Measurement {
// 	uri: string;
// 	label: string;
// 	weight: number;
// }

// export async function SearchFoodByName(searchTerm: string): Promise<Food[]> {
// 	try {
// 		if (!searchTerm || searchTerm.length === 0) return [];
// 		const response: AxiosResponse<any> = await axios.get(
// 			`${process.env.EXPO_PUBLIC_EDAMAM_PARSER_API_URL}?app_id=${process.env.EXPO_PUBLIC_EDAMAM_APP_ID}&app_key=${process.env.EXPO_PUBLIC_EDAMAM_API_KEY}&ingr=${searchTerm}&nutrition-type=logging`
// 		);

// 		const result: any[] = response.data.hints;

// 		const foods: Food[] = result.map((r) => {
// 			const foodData = r.food;
// 			const foodMeasurement = r.measures;
// 			console.log('image url', foodData.image)
// 			const simplifiedFoodData: Food = {
// 				category: foodData.category,
// 				categoryLabel: foodData.categoryLabel,
// 				foodId: foodData.foodId,
// 				image: foodData.image,
// 				knownAs: foodData.knownAs,
// 				label: foodData.label,
// 				nutrients: foodData.nutrients,
// 				measurements: foodMeasurement,
// 			};
			
// 			return simplifiedFoodData;
// 		});

// 		return foods;
// 	} catch (error) {
// 		console.log(error);
// 		throw error;
// 	}
// }
