import { MealOption } from "./meal-option";

export interface Meal {
    id : number;
    time : string;
    type : string;
    options : MealOption[];
    notes : string;
}
