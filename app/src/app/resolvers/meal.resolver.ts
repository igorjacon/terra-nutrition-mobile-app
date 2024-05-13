import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpService } from '../services/http.service';
import { Meal } from '../model/meal';

@Injectable({
  providedIn: 'root'
})
export class MealResolver implements Resolve<any> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url = <string>route.paramMap.get('path');
    const mealData = this.httpService.get(url);
    return mealData;
  }
}
