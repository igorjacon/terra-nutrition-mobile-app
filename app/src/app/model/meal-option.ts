import { FoodItemEntry } from "./food-item-entry";

export interface MealOption {
    id : number;
    foodItemEntries : FoodItemEntry[];
    description : string;
    notes : string;
    isChecked: boolean;
    totalQuantity: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    totalCalories: number;
}
