import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth-constants';
import { Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient, private storageService: StorageService, private router: Router) {}

  post(serviceName: string, data: any) {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${accessToken}`
    // });
    const headers = new HttpHeaders({});
    const options = { headers: headers};

    const url = environment.api_base_url + serviceName;

    return this.http.post(url, data);
  }

  get(serviceName: string, token: string) {
    let headers = {}
    if (token) {
      headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    const options = { headers: headers};
    const url = environment.api_base_url + serviceName;

    return this.http.get(url, options).pipe(catchError(err => {
      if (err.error.code === 401) {
        // If jwt token expired, request new jwt with refresh token
        this.refresh(serviceName);
      }
      return of(null);
    }));
  }

  async refresh(serviceName:string) {
    const refreshToken = await this.storageService.get(AuthConstants.REFRESH_TOKEN);

    this.post("/api/token/refresh", {"refreshToken": refreshToken}).subscribe(
      (res:any) => {
        if (res) {
          this.storageService.store(AuthConstants.ACCESS_TOKEN, res.token);
          this.storageService.store(AuthConstants.REFRESH_TOKEN,res.refreshToken);
          return this.get(serviceName, res.token);
        } else {
          return of(null);
        }
      },
      (err) => {
        console.log("Error: Not able to refresh token. Logout!", err);
        this.storageService.removeItem(AuthConstants.ACCESS_TOKEN);
        this.storageService.removeItem(AuthConstants.REFRESH_TOKEN);
        this.router.navigate(['login']);
        return of(null);
      });
  }
}
