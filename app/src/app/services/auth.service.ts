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
  customerData$ = new BehaviorSubject<any>('');
  userData$ = new BehaviorSubject<any>('');

  constructor(
    private httpService: HttpService, 
    private storageService: StorageService, 
    private router: Router
  ) {}

  authenticate(body: any): Observable<any> {
    return this.httpService.post('/api/login_check', body);
  }

  getAccessToken() {
    this.storageService.get(AuthConstants.ACCESS_TOKEN).then((res) => {
      res
    });
  }

  fetchCustomerInfo(id:number) {
    return this.httpService.get('/api/customers/'+id);
  }

  fetchUserInfo(url:string) {
    return this.httpService.get(url);
  }

  getCustomerData() {
    this.storageService.get(AuthConstants.CUSTOMER_DATA).then(res => {
      this.customerData$.next(res);
    });
  }

  getUserData() {
    this.storageService.get(AuthConstants.USER_DATA).then(res => {
      this.userData$.next(res);
    });
  }

  async logout(refreshToken: string|null) {
    await this.storageService.removeItem(AuthConstants.ACCESS_TOKEN);
    await this.storageService.removeItem(AuthConstants.REFRESH_TOKEN);
    await this.storageService.removeItem(AuthConstants.CUSTOMER_DATA);
    
    const body = {"refreshToken": refreshToken};
    this.httpService.post('/api/token/invalidate', body).subscribe();
    this.router.navigate(['login']);
  }
}