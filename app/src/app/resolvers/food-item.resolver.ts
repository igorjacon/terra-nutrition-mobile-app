import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpService } from '../services/http.service';
import { FoodItem } from '../model/food-item';

@Injectable({
  providedIn: 'root'
})
export class FoodItemResolver implements Resolve<any> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url = <string>route.paramMap.get('url');
    return this.httpService.get(url);
  }
}
