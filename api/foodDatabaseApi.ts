import axios from "axios";
import { Food } from "./models/food.model";

export async function createFood(food: Food): Promise<Food> {
	try {
		const result = await axios.post<Food>(
			`${process.env.EXPO_PUBLIC_FOOD_DATABASE_API}/food/create`,
			food
		);
		return result.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getFoodByUpc(upc: string): Promise<Food> {
	try {
		const result = await axios.get<Food>(
			`${process.env.EXPO_PUBLIC_FOOD_DATABASE_API}/food/${upc}`
		);
		return result.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getVerifiedFoodByUpc(upc: string): Promise<Food> {
	try {
		const result = await axios.get<Food>(
			`${process.env.EXPO_PUBLIC_FOOD_DATABASE_API}/food/verified/${upc}`
		);
		return result.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function searchFoodsByTerm(
	searchTerm: string,
	limit: number
): Promise<Food[]> {
	try {
		const result = await axios.get<Food[]>(
			`${process.env.EXPO_PUBLIC_FOOD_DATABASE_API}/food/search/${searchTerm}/${limit}`
		);
		return result.data;
	} catch (error) {
		console.log('food database api',error);
		throw error;
	}
}
