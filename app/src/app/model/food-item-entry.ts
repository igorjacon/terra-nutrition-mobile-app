import { FoodItem } from "./food-item";

export interface FoodItemEntry {
    id : number;
    foodItem : string;
    foodItemObject : FoodItem;
    measurement : string;
    quantity : number;
    mealOption : string;
    createdAt : string;
    updatedAt : string;
}
