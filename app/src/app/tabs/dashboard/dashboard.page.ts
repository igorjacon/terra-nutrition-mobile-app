import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {AuthService} from "../../services/auth.service";
import {StorageService} from "../../services/storage.service";
import {AuthConstants} from "../../config/auth-constants";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { IonicSlides } from '@ionic/angular';
import { addCircle, menu, settingsOutline, happyOutline, alertCircleOutline, chevronForwardCircleOutline, chevronDownCircleOutline, calendarOutline, chevronForward } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
register();


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardPage implements OnInit {
  @ViewChild('swiper', { static: false }) swiperRef: ElementRef | undefined;
  swiperModule = [IonicSlides];

  userHasCompletedIntakeForm = true;
  userHasMealPlans = false;
  customer: any;

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {
    addIcons({
      addCircle, menu, settingsOutline, happyOutline, alertCircleOutline, chevronForwardCircleOutline, chevronDownCircleOutline, calendarOutline, chevronForward
    })
   }

   ngOnInit() {
    this.authService.customerData$.subscribe((res:any) => {
      this.customer = res;
    });
  }

  navigateToMealsPage() {
    this.router.navigateByUrl('customer/meals')
  }

  navigateToProfessionalPage() {
    this.router.navigateByUrl('customer/settings/professional')
  }

  navigateToProfilePage() {
    this.router.navigateByUrl('customer/settings/profile')
  }

  navigateToRecipesPage() {
    this.router.navigateByUrl('customer/recipes')
  }

  test() {
    console.log('swiper clicked')
    // this.router.navigateByUrl('tabs/meals')
  }

}
