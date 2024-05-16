import { FoodItemEntry } from "./food-item-entry";

export interface MealOption {
    id : number;
    foodItemEntries : FoodItemEntry[];
    description : string;
    notes : string;
    meals : string[];
    createdAt : string;
    updatedAt : string;
}
