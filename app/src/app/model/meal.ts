import { MealOption } from "./meal-option";
import { MealType } from "./meal-type";

export interface Meal {
    id : number;
    time : string;
    type : MealType;
    options : MealOption[];
    notes : string;
}
