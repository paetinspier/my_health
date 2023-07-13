import axios from "axios";

export async function SearchFoodByName(searchTerm) {
	try {
		const response = await axios.get(
			`${process.env.EXPO_PUBLIC_EDAMAM_PARSER_API_URL}?app_id=${process.env.EXPO_PUBLIC_EDAMAM_APP_ID}&app_key=${process.env.EXPO_PUBLIC_EDAMAM_API_KEY}&ingr=${searchTerm}&nutrition-type=logging`
		);
        
        const result = response.data();
        console.log('search', result)

        return result;
	} catch (error) {
		console.log(error);
        throw error;
	}
}
