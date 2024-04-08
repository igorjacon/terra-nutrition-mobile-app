import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthConstants } from '../config/auth-constants';

@Injectable({
  providedIn: 'root'
})

export class AuthService
{ 
  userData$ = new BehaviorSubject<any>('');

  constructor(
    private httpService: HttpService, 
    private storageService: StorageService, 
    private router: Router
  ) {}

  authenticate(body: any): Observable<any> {
    return this.httpService.post('/login_check', body);
  }

  getAccessToken() {
    this.storageService.get(AuthConstants.ACCESS_TOKEN).then((res) => {
      res
    });
  }

  fetchUserInfo(id:number, accessToken: string|null, refreshToken: string|null): Observable<any> {
    return this.httpService.get('/users/'+id, accessToken, refreshToken);
  }

  getUserData() {
    this.storageService.get(AuthConstants.USER_DATA).then(res => {
      this.userData$.next(res);
    });
  }

  logout(refreshToken: string|null) {
    this.storageService.removeItem(AuthConstants.ACCESS_TOKEN).then((res) => {
      const body = {"refreshToken": refreshToken};
      this.httpService.post('/token/invalidate', body).subscribe();
      this.router.navigate(['login']);
    });
  }
}