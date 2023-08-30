import { Food } from "./models/food.model";
import { db } from "../firebaseConfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export async function createFoodEntry(food: Food, userUid: string): Promise<string> {
	try {
        const docRef = await addDoc(collection(db, "food_entries"), {
            uid: userUid,
            created_at: new Date().toLocaleDateString(),
            title: food.title,
            calories: food.calories,
            proteins: food.protein,
            carbohydrates: food.carbohydrates,
            fats: food.fat,
            servingSize: food.servingSize,
            servingUnits: food.servingUnits,
            upc: food.upc,
            verified: food.verified,
            foodId: food.id
        });

        console.log('macros added ✅', docRef.id);
        return docRef.id;
	} catch (error) {
		console.log(error);
	}
}
