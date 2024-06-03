import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { IonicSlides } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { environment } from 'src/environments/environment';
import { WaterGoalModalComponent } from '../../components/water-goal-modal/water-goal-modal.component';
import {
  addCircle,
  menu,
  settingsOutline,
  waterOutline,
  happyOutline,
  alertCircleOutline,
  chevronForwardCircleOutline,
  chevronDownCircleOutline,
  calendarOutline,
  chevronForward,
  addCircleOutline,
  removeCircleOutline,
  refreshCircleOutline,
  listOutline
} from 'ionicons/icons';

register();

addIcons({
  'add-circle-outline': addCircleOutline,
  'remove-circle-outline': removeCircleOutline,
  'refresh-circle-outline': refreshCircleOutline,
  'add-circle': addCircle,
  'menu': menu,
  'settings-outline': settingsOutline,
  'water-outline': waterOutline,
  'happy-outline': happyOutline,
  'alert-circle-outline': alertCircleOutline,
  'chevron-forward-circle-outline': chevronForwardCircleOutline,
  'chevron-down-circle-outline': chevronDownCircleOutline,
  'calendar-outline': calendarOutline,
  'chevron-forward': chevronForward,
  listOutline
});

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

  profileImgPath: string = "";
  userImgDir = environment.api_base_url + "/uploads/user/";

  // Variables for water intake tracking
  waterGoal: number = 8; // Default goal
  waterIntake: number = 0; // Amount of water intake
  unitPreference: string = 'glasses'; // Default unit
  unitLabel: string = 'glasses'; // Unit label for display
  hydrationTips = {
    enabled: false,
    frequency: 3 // Default frequency of 3 tips per day
  };
  currentTip: string = ''; // Current hydration tip
  tips: string[] = [
    'Drink a glass of water first thing in the morning.',
    'Keep a water bottle with you all day.',
    'Set reminders to drink water.',
    'Drink water before meals.',
    'Infuse your water with fruits for added flavor.',
    'Take sips of water between bites during meals.',
    'Replace sugary drinks with water.',
    'Drink a glass of water before, during, and after exercise.',
    'Carry a reusable water bottle with you.',
    'Drink water at regular intervals, even if you are not thirsty.',
    'Eat water-rich foods like fruits and vegetables.',
    'Add a splash of lemon or lime to your water for flavor.',
    'Track your water intake with this app.',
    'Keep a water bottle at your desk or workspace.',
    'Drink a glass of water before going to bed.',
    'Make drinking water a part of your daily routine.',
    'Add ice cubes to your water to make it refreshing.',
    'Experiment with different temperatures of water to find what you like best.',
    'Use a marked water bottle to track your intake throughout the day.',
    'Drink a glass of water when you feel hungry; sometimes thirst is mistaken for hunger.',
    'Keep water easily accessible in places you spend the most time.',
    'Choose sparkling water as a healthy alternative to soda.',
    'Drink water when you wake up to kickstart your metabolism.',
    'Flavor your water with mint leaves or cucumber slices.',
    'Drink water consistently throughout the day, not just when you feel thirsty.',
    'Set a daily water intake goal and monitor your progress.',
    'Drink water during breaks at work or while watching TV.',
    'Keep a pitcher of water in the refrigerator so its always cold and ready to drink.',
    'Add a pinch of sea salt to your water to help with hydration during workouts.'
  ];

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router, private modalController: ModalController) {
  
   }

   ngOnInit() {
    this.authService.customerData$.subscribe((res: any) => {
      this.customer = res;
      if (res.user?.profileImg) {
        this.profileImgPath = res.user.profileImg;
      } else {
        this.userImgDir = 'assets/imgs/default-profile.png';
      }
    });

    // Load stored water goal and intake from storage
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
    this.loadSettings().then(() => {
      this.updateUnitLabel();
      if (this.hydrationTips.enabled) {
        this.setupHydrationTips();
      }
    });
  }

  setupHydrationTips() {
    const startHour = 4; // 4 AM
    const endHour = 12; // 12 PM
    const tipInterval = (endHour - startHour) / this.hydrationTips.frequency;

    const tipTimes: Date[] = [];
    for (let i = 0; i < this.hydrationTips.frequency; i++) {
      const tipTime = new Date();
      tipTime.setHours(startHour + i * tipInterval, 0, 0, 0);
      tipTimes.push(tipTime);
    }

    const now = new Date();
    const currentTipIndex = tipTimes.findIndex(tipTime => now < tipTime);

    console.log('Hydration Tips Enabled:', this.hydrationTips.enabled);
    console.log('Hydration Tips Frequency:', this.hydrationTips.frequency);
    console.log('Current Time:', now);
    console.log('Calculated Tip Times:', tipTimes);
    console.log('Current Tip Index:', currentTipIndex);

    this.currentTip = this.tips[currentTipIndex < 0 ? this.tips.length - 1 : currentTipIndex];
    console.log('Current Tip:', this.currentTip);
  }
  

  async loadSettings() {
    await this.storageService.get('unitPreference').then(unit => {
      if (unit) {
        this.unitPreference = unit;
        this.updateUnitLabel();
      }
    });
    await this.storageService.get('waterGoal').then(goal => {
      if (goal) {
        this.waterGoal = goal;
      }
    });
    await this.storageService.get('waterIntake').then(intake => {
      if (intake) {
        this.waterIntake = intake;
      }
    });
    await this.storageService.get('hydrationTips').then(tips => {
      if (tips) {
        this.hydrationTips = tips;
        console.log('Loaded Hydration Tips Settings:', this.hydrationTips);
        this.setupHydrationTips();
      }
    });
  }

  updateUnitLabel() {
    if (this.unitPreference === 'ml') {
      this.unitLabel = 'milliliters (ml)';
    } else if (this.unitPreference === 'L') {
      this.unitLabel = 'liters (L)';
    } else {
      this.unitLabel = 'glasses';
    }
  }

   // Method to increment water intake
   incrementWaterIntake() {
    this.waterIntake++;
    this.storageService.set('waterIntake', this.waterIntake);
  }

  // Method to decrement water intake
  decrementWaterIntake() {
    if (this.waterIntake > 0) {
      this.waterIntake--;
      this.storageService.set('waterIntake', this.waterIntake);
    }
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

  // Method to open the modal for changing water goal
  async openWaterGoalModal() {
    const modal = await this.modalController.create({
      component: WaterGoalModalComponent,
      componentProps: {
        currentGoal: this.waterGoal
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.waterGoal = data.data;
        this.saveWaterGoal();
        this.loadSettings();
      }
    });

    return await modal.present();
  }
}