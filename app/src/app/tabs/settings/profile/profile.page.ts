import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { arrowBackOutline, chevronBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {
  customer: any = {};
  formattedPhoneNumber: string = '';

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {
    addIcons({
      arrowBackOutline,
      chevronBackOutline
    })
  }

  goToDashboard() {
    console.log('test logo click')
    this.router.navigateByUrl('customer/dashboard')
  }

  ngOnInit() {
    this.authService.customerData$.subscribe((res: any) => {
      this.customer = res;
      console.log('Loading customer profile page');
      console.log('Customer Data:', res);
      
      if (this.customer.user && this.customer.user.phones) {
        this.formattedPhoneNumber = this.getFormattedPhone(this.customer.user.phones);
      }
    });
  }

  getFormattedPhone(phones: Array<{ prefix: string, number: string }>): string {
    if (phones && phones.length > 0) {
      const phone = phones[0];
      const formattedNumber = phone.number.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
      console.log('Formatting Phone:', phone);
      return `${phone.prefix} ${formattedNumber}`;
    }
    return 'N/A';
  }
}
