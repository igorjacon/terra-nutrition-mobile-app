import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.page.html',
  styleUrls: ['./professional.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfessionalPage implements OnInit {
  customer: any;

  constructor(private authService: AuthService, private storageService: StorageService) { }

  ngOnInit() {
    this.authService.customerData$.subscribe((res:any) => {
      this.customer = res;
    });
  }

  logoutAction() {
    this.storageService.get(AuthConstants.REFRESH_TOKEN).then(res => {
      this.authService.logout(res);
    });
  }
}
