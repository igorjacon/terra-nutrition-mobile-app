import { FoodItem } from "./food-item";
import { FoodMeasurement } from "./food-measurement";

export interface FoodItemEntry {
    id : number;
    foodItem : FoodItem;
    measurement : FoodMeasurement;
    quantity : number;
}
