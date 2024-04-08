import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth-constants';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  post(serviceName: string, data: any) {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${accessToken}`
    // });
    const headers = new HttpHeaders({});
    const options = { headers: headers};

    const url = environment.api_base_url + serviceName;

    return this.http.post(url, data);
  }

  get(serviceName: string, accessToken: string | null = null, refreshToken: string | null = null) {
    let headers = {}
    if (accessToken) {
      headers = new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`
      });
    }
    const options = { headers: headers};
    const url = environment.api_base_url + serviceName;

    return this.http.get(url, options).pipe(catchError(err => {
      if (err.error.code === 401) {
        // If jwt token expired, request new jwt with refresh token
        this.refresh(serviceName, accessToken, refreshToken);
      }
      return of(null);
    }));
  }

  refresh(serviceName:string, accessToken:string | null = null, refreshToken: string | null = null) {
    this.post("/token/refresh", {"refreshToken": refreshToken}).subscribe(
      (res:any) => {
        if (res) {
          this.storageService.store(AuthConstants.ACCESS_TOKEN,res.token);
          this.storageService.store(AuthConstants.REFRESH_TOKEN,res.refreshToken);
          return this.get(serviceName, accessToken, refreshToken);
        } else {
          return of(null);
        }
      }, 
      (err) => {
        console.log("Error: Not able to refresh token. Logout!");
        return of(null);
      });
  }
}
