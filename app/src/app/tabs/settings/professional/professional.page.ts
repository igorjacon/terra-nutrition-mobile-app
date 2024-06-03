import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { arrowBackOutline, chevronBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.page.html',
  styleUrls: ['./professional.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfessionalPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef<HTMLElement> = {} as ElementRef;
  customer: any = {};
  professional: any = {};

  formattedPhoneNumber: string = '';
  formattedLocationPhoneNumber: string = '';

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {
    addIcons({
      arrowBackOutline,
      chevronBackOutline
    })
  }

  ngOnInit() {
    this.authService.customerData$.subscribe((res: any) => {
      this.customer = res;
      if (res && res.professional) {
        this.professional = res.professional;
        if (this.professional.user && this.professional.user.phones) {
          this.formattedPhoneNumber = this.getFormattedPhone(this.professional.user.phones);
        }
        if (this.professional.locations && this.professional.locations.length > 0 && this.professional.locations[0].phone) {
          this.formattedLocationPhoneNumber = this.getFormattedPhone([this.professional.locations[0].phone]);
        }
      }
    });
  }

  goToDashboard() {
    console.log('test logo click')
    this.router.navigateByUrl('customer/dashboard')
  }

  getFormattedPhone(phones: Array<{ prefix: string, number: string }>): string {
    if (phones && phones.length > 0) {
      const phone = phones[0];
      const formattedNumber = phone.number.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
      return `${phone.prefix} ${formattedNumber}`;
    }
    return 'N/A';
  }

  getAppleMapsLink(address: any): string {
    if (address) {
      const query = `${address.lineOne}, ${address.lineTwo}, ${address.city}`.replace(/ /g, '+');
      return `https://maps.apple.com/?q=${query}`;
    }
    return '#';
  }
}

