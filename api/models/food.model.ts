export class Food {
	id?: number;
	title: string;
	upc: string;
	calories: number;
	protein: number;
	carbohydrates: number;
	fat: number;
	servingSize: number;
	servingUnits: string;
	verified: boolean;

	constructor(
		title: string,
		upc: string,
		calories: number,
		protein: number,
		carbohydrates: number,
		fat: number,
		servingSize: number,
		servingUnits: string,
		verified: boolean,
		id?: number
	) {
		this.id = id;
		this.title = title;
		this.upc = upc;
		this.calories = calories;
		this.protein = protein;
		this.carbohydrates = carbohydrates;
		this.fat = fat;
		this.servingSize = servingSize;
		this.servingUnits = servingUnits;
		this.verified = verified;
	}
}
