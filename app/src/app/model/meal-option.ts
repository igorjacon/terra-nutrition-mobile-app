import { FoodItemEntry } from "./food-item-entry";

export interface MealOption {
    id : number;
    foodItemEntries : FoodItemEntry[];
    notes : string;
    meals : string[];
    createdAt : string;
    updatedAt : string;
}
