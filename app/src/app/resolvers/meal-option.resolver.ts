import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpService } from '../services/http.service';
import { MealOption } from '../model/meal-option';

@Injectable({
  providedIn: 'root'
})
export class MealOptionResolver implements Resolve<any> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url = <string>route.paramMap.get('url');
    return this.httpService.get(url);
  }
}
