import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { IonicSlides } from '@ionic/angular';
import { addCircle, menu, settingsOutline, waterOutline, happyOutline, alertCircleOutline, chevronForwardCircleOutline, chevronDownCircleOutline, calendarOutline, chevronForward } from 'ionicons/icons';
import { addIcons } from 'ionicons';

register();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardPage implements OnInit {
  @ViewChild('swiper', { static: false }) swiperRef: ElementRef | undefined;
  swiperModule = [IonicSlides];

  userHasCompletedIntakeForm = true;
  userHasMealPlans = false;
  customer: any;

  // Variables for water intake tracking
  waterGoal: number = 8; // Default goal
  waterIntake: number = 0; // Amount of water intake

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {
    addIcons({
      addCircle, menu, waterOutline, settingsOutline, happyOutline, alertCircleOutline, chevronForwardCircleOutline, chevronDownCircleOutline, calendarOutline, chevronForward
    })
   }

   ngOnInit() {
    this.authService.customerData$.subscribe((res: any) => {
      this.customer = res;
    });

    // Load stored water goal and intake if available
    this.storageService.get('waterGoal').then(goal => {
      if (goal) {
        this.waterGoal = goal;
      }
    });
    this.storageService.get('waterIntake').then(intake => {
      if (intake) {
        this.waterIntake = intake;
      }
    });
  }

  // Method to increment water intake
  incrementWaterIntake() {
    this.waterIntake++;
    this.storageService.set('waterIntake', this.waterIntake);
  }

  // Method to save water goal
  saveWaterGoal() {
    this.storageService.set('waterGoal', this.waterGoal);
  }

   // Method to reset water intake
   resetWaterIntake() {
    this.waterIntake = 0;
    this.storageService.set('waterIntake', this.waterIntake);
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
