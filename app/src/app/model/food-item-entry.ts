import { FoodItem } from "./food-item";

export interface FoodItemEntry {
    id : number;
    foodItem : FoodItem;
    measurement : string;
    quantity : number;
    mealOption : string;
    createdAt : string;
    updatedAt : string;
}
