import { FoodItemEntry } from "./food-item-entry";

export interface MealOption {
    id : number;
    foodItemEntries : string[]; // Array of IRIs
    foodItemEntryObjects : FoodItemEntry[];
    notes : string;
    meals : string[];
    createdAt : string;
    updatedAt : string;
}
