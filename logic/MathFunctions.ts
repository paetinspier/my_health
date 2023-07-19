export interface MacrosPercentages {
	protein: number;
	carbs: number;
	fat: number;
	other: number;
}

export function CalculateFoodMacroPercentages(
	carbs: number,
	protein: number,
	fat: number
): MacrosPercentages {
	const carbCals = carbs * 4;
	const proteinCals = protein * 4;
	const fatCals = fat * 9;
	const cals = carbCals+proteinCals+fatCals;

	const c = carbCals / cals;
	const p = proteinCals / cals;
	const f = fatCals / cals;

	const res: MacrosPercentages = {
		protein: p,
		carbs: c,
		fat: f,
		other: c + p + f === 1 ? 0 : 1 - (c + p + f),
	};
    

	return res;
}
