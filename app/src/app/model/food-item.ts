import {FoodItemDetails} from "./food-item-details";

export interface FoodItem {
    foodKey : string;
    name : string;
    description : string;
    foodItemDetails : FoodItemDetails;
}
