import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, flatMap, forkJoin, map, of } from 'rxjs';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { AuthConstants } from '../config/auth-constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MealPlan } from '../model/meal-plan';
import { Meal } from '../model/meal';
import { MealOption } from '../model/meal-option';
import { FoodItemEntry } from '../model/food-item-entry';
import { FoodItem } from '../model/food-item';

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {
  mealPlanData$ = new BehaviorSubject<any>('');

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) {}

  getMealPlanData() {
    this.storageService.get(AuthConstants.MEAL_PLAN_DATA).then(res => {
      this.mealPlanData$.next(res);
    });
  }

  registerMealOption(token: string, customer: string, date: string, meal: string, option: string) {
    let headers = {}
    if (token) {
      headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    const options = { headers: headers};
    const params = `customer=${customer}&date=${date}&meal=${meal}&option=${option}`
    const url = environment.api_base_url + "/api/meal-history/new?"+params;

    return this.http.post(url, {}, options).pipe(catchError(err => {
      if (err.error.code === 401) {
        // If jwt token expired, request new jwt with refresh token
        this.httpService.refresh("/api/meal-history/new?"+params);
      }
      return of(null);
    }));
  }

  getMealPlans(token : string, day : number) {
    // const accessToken = await this.storageService.get(AuthConstants.ACCESS_TOKEN);

    let headers = {}
    if (token) {
      headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    const options = { headers: headers};
    const url = environment.api_base_url + '/api/meal_plans?days=' + day;

    return this.http.get<MealPlan[]>(url, options).pipe(catchError(err => {
      if (err.error.code === 401) {
        // If jwt token expired, request new jwt with refresh token
        this.httpService.refresh('/api/meal_plans?days=' + day);
      }
      return of(null);
    }));
  }

  getMeal($iri : string, token : string) {
    // const accessToken = await this.storageService.get(AuthConstants.ACCESS_TOKEN);

    let headers = {}
    if (token) {
      headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    const options = { headers: headers};
    const url = environment.api_base_url + $iri;

    return this.http.get<Meal>(url, options).pipe(catchError(err => {
      if (err.error.code === 401) {
        // If jwt token expired, request new jwt with refresh token
        this.httpService.refresh($iri);
      }
      return of(null);
    }));
  }

  getMealOption($iri : string, token : string) {
    // const accessToken = await this.storageService.get(AuthConstants.ACCESS_TOKEN);
    let headers = {}
    if (token) {
      headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    const options = { headers: headers};
    const url = environment.api_base_url + $iri;

    return this.http.get<MealOption>(url, options).pipe(catchError(err => {
      if (err.error.code === 401) {
        // If jwt token expired, request new jwt with refresh token
        this.httpService.refresh($iri);
      }
      return of(null);
    }));
  }

  getFoodItemEntry($iri : string, token : string) {
    // const accessToken = await this.storageService.get(AuthConstants.ACCESS_TOKEN);
    let headers = {}
    if (token) {
      headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    const options = { headers: headers};
    const url = environment.api_base_url + $iri;

    return this.http.get<FoodItemEntry>(url, options).pipe(catchError(err => {
      if (err.error.code === 401) {
        // If jwt token expired, request new jwt with refresh token
        this.httpService.refresh($iri);
      }
      return of(null);
    }));
  }

  getFoodItem($iri : string, token : string) {
    // const accessToken = await this.storageService.get(AuthConstants.ACCESS_TOKEN);

    let headers = {}
    if (token) {
      headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    const options = { headers: headers};
    const url = environment.api_base_url + $iri;

    return this.http.get<FoodItem>(url, options).pipe(catchError(err => {
      if (err.error.code === 401) {
        // If jwt token expired, request new jwt with refresh token
        this.httpService.refresh($iri);
      }
      return of(null);
    }));
  }
}
