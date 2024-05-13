import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { BehaviorSubject, Observable, forkJoin, from, map, of } from 'rxjs';
import { HttpService } from '../services/http.service';
import { MealResolver } from './meal.resolver';
import { MealOptionResolver } from './meal-option.resolver';
import { FoodItemEntryResolver } from './food-item-entry.resolver';
import { FoodItemResolver } from './food-item.resolver';
import { MealPlan } from '../model/meal-plan';
import { Meal } from '../model/meal';
import { MealPlanService } from '../services/meal-plan.service';
import { FoodItem } from '../model/food-item';
import { StorageService } from '../services/storage.service';
import { AuthConstants } from '../config/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class MealPlanResolver implements Resolve<any> {
  constructor(
    private mealPlanService : MealPlanService,
    private storageService : StorageService
  ) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      const mealPlanCache = await this.storageService.get(AuthConstants.MEAL_PLAN_DATA);
      // if (mealPlanCache) {
      //   return this.mealPlanService.getMealPlanData();
      // }

      // Fetch meal plan data
      const mealPlanObservables = await this.mealPlanService.getMealPlans();

      // Define empty array to hold resolved meals
      const resolvedMeals: string[] = [];
      // Create observables for resolving option IRIs
      const mealObservables: Observable<Meal>[] = [];

      return mealPlanObservables.pipe(
        map(mealPlans => {
          if (mealPlans) {
            mealPlans.forEach(mealPlan => {
              mealPlan.meals.forEach(async (mealIri) => {
                mealPlan.mealObjects = [];
                const mealObservable = await this.mealPlanService.getMeal(mealIri);
                mealObservable.subscribe(meal => {
                  if (meal) {
                    mealPlan.mealObjects.push(meal);
                    meal.options.forEach(async (optionIri) => {
                      meal.optionObjects = [];
                      const optionObservable = await this.mealPlanService.getMealOption(optionIri);
                      optionObservable.subscribe(option => {
                        if (option) {
                          meal.optionObjects.push(option);
                          option.foodItemEntries.forEach(async (foodItemEntryIri) => {
                            option.foodItemEntryObjects = [];
                            const foodItemEntryObservable = await this.mealPlanService.getFoodItemEntry(foodItemEntryIri);
                            foodItemEntryObservable.subscribe(async (itemEntry) => {
                              if (itemEntry) {
                                option.foodItemEntryObjects.push(itemEntry);
                                
                                const foodItemObservable = await this.mealPlanService.getFoodItem(itemEntry.foodItem);
                                foodItemObservable.subscribe(foodItem => {
                                  if (foodItem) {
                                    itemEntry.foodItemObject = foodItem;
                                  }
                                });
                              }
                            });
                          });
                        }
                      });
                    });
                  }
                });
              });
            });
            return mealPlans;
          } else {
            return 'Error fetching meal plans';
          }
        })
      );
    } catch (error) {
      console.error('Error fetching meal plans:', error);
      return of(null);
      // Handle error appropriately
    }
  }
}
