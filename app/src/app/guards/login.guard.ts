import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { AuthConstants } from '../config/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  public constructor(private storageService: StorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve) => {
        this.storageService.get(AuthConstants.ACCESS_TOKEN).then((res) => {
          if (res) {
            this.router.navigate(['/customer/dashboard']);
            resolve(false);
          } else {
            resolve(true);
          }
        }).catch((err) => {
          console.log('error ' + err);
          resolve(false);
        });
      });
  }
  
}
