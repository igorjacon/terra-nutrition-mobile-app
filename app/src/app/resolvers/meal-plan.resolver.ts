import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { MealPlanService } from '../services/meal-plan.service';

@Injectable({
  providedIn: 'root'
})
export class MealPlanResolver implements Resolve<any> {
  constructor(
    private mealPlanService : MealPlanService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.mealPlanService.getMealPlanData();
  }
}
