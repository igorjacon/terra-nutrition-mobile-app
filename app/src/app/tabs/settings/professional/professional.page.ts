import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { arrowBackOutline, chevronBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

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

  constructor(private authService: AuthService, private storageService: StorageService) {
    addIcons({
      arrowBackOutline,
      chevronBackOutline
    })
  }

  ngOnInit() {
    this.authService.customerData$.subscribe((res: any) => {
      this.customer = res;
      console.log(res);
      console.log('Loading Professional profile page');
      if (res && res.professional) {
        this.professional = res.professional;
        console.log('Professional Data:', this.professional);
          console.log('Profile Image:', this.customer.professional.user.profileImg);
        if (this.professional.user && this.professional.user.phones) {
          this.formattedPhoneNumber = this.getFormattedPhone(this.professional.user.phones);
        }
        if (this.professional.locations && this.professional.locations.length > 0 && this.professional.locations[0].phone) {
          this.formattedLocationPhoneNumber = this.getFormattedPhone([this.professional.locations[0].phone]);
        }
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

  getAppleMapsLink(address: any): string {
    if (address) {
      const query = `${address.lineOne}, ${address.lineTwo}, ${address.city}`.replace(/ /g, '+');
      return `https://maps.apple.com/?q=${query}`;
    }
    return '#';
  }
}

