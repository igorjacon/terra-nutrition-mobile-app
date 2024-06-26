import { Meal } from "./meal";

export interface MealPlan {
    id : number;
    active : boolean;
    title : string;
    days : number[];
    meals : Meal[];
}
