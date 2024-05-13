import { MealOption } from "./meal-option";

export interface Meal {
    id : number;
    time : string;
    type : string;
    options : string[]; // Array of IRIs
    optionObjects : MealOption[];
    createdAt : string;
    updatedAt : string;
}
