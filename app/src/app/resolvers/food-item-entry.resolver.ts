import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpService } from '../services/http.service';
import { FoodItemEntry } from '../model/food-item-entry';

@Injectable({
  providedIn: 'root'
})
export class FoodItemEntryResolver implements Resolve<any> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url = <string>route.paramMap.get('url');
    return this.httpService.get(url);
  }
}
