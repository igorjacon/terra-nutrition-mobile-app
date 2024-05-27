import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import {CommonModule, formatDate} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicSlides } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { ChangeDetectorRef } from '@angular/core';
import { addCircle, menu, alertCircleOutline, chevronForwardCircleOutline, chevronDownCircleOutline, calendarOutline, chevronForward } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { StorageService } from "../../services/storage.service";
import { AuthConstants } from "../../config/auth-constants";
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, last } from 'rxjs';
import { MealPlan } from 'src/app/model/meal-plan';
import { MealPlanService } from 'src/app/services/meal-plan.service';
import { IonHeader, IonSelect, IonSelectOption, IonToolbar, IonContent, IonSkeletonText,
  IonDatetimeButton, IonModal, IonDatetime, IonList, IonListHeader, IonItem, IonLabel,
  IonThumbnail, IonCheckbox, IonAvatar } from '@ionic/angular/standalone';
import {AuthService} from "../../services/auth.service";
import {HttpService} from "../../services/http.service";
import {MealOption} from "../../model/meal-option";
register();

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonSelect,
    IonSelectOption,
    CommonModule,
    FormsModule,
    IonToolbar,
    IonContent,
    IonDatetimeButton,
    IonModal,
    IonDatetime,
    IonSkeletonText,
    IonList,
    IonListHeader,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonCheckbox,
    IonAvatar
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MealsPage implements OnInit, OnDestroy {
  @ViewChild('swiper', { static: false }) swiperRef: ElementRef | undefined;
  swiperModule = [IonicSlides];
  currentSlideIndex: number = 0; // Current index of the active slide in the Swiper container
  previousSlideIndex: number = 0; // Previous index of the active slide in the Swiper container
  currentDate = ""; // Current date in ISO format
  loaded = false; // Flag to indicate if the meal plans have been loaded
  customerMealPlanDate = "2024-04-20T00:00:00"; // Default date for the customer's meal plan
  selectedOptionIndex: number[] = []; // Array to store the selected option index for each slide
  mealPlans : MealPlan[] = []; // Array to store the meal plans
  selectedMealPlan: MealPlan | null = null; // Default value for the selected meal plan
  selectedMealPlanId: string | null = null; // Store selected meal plan ID
  moreInfoShowing: Record<string, boolean> = {}; // Object to track the visibility state of notes for each meal option
  activeNoteIndex: number | null = null;
  currentInfoIndex: number | null = null;
  slidesPerView : number | null = null;
  selectedDate: string | null = null;
  customer: any;
  token: string = "";
  mealHistory: any[] = [];
  lockOptions: boolean = false;


  //initialise some icons used in app, and inject services that are being used/will be used
  constructor(
    // private route: ActivatedRoute,
    private mealPlanService: MealPlanService,
    private authService: AuthService,
    private storageService: StorageService,
    private httpService: HttpService,
    private router: Router,
    private cdRef: ChangeDetectorRef) {
    addIcons({
      chevronDownCircleOutline,
      chevronForwardCircleOutline,
      chevronForward,
      addCircle,
      calendarOutline,
      menu,
      alertCircleOutline
    });
    this.selectedOptionIndex = Array(this.mealPlans.length).fill(null);
  }


  goToDashboard() {
    this.router.navigateByUrl('customer/dashboard')
  }

  ngOnInit() {
    this.currentDate = new Date().toISOString();
    const today = new Date().getDay();
    this.authService.customerData$.subscribe((res:any) => {
      this.customer = res;
    });
    this.loadData(today);
    // this.loadMealHistory(this.currentDate);
  }

  //loads the date from the api
  loadData(today: number) {
    this.storageService.get(AuthConstants.ACCESS_TOKEN).then((token) => {
      this.token = token;
      this.mealPlanService.getMealPlans(token, today).pipe(
        finalize(() => {
          this.loaded = true;
        })
      ).subscribe((mealPlans: any) => {
        this.mealPlans = mealPlans;
        // Retain the selected meal plan if it exists
        if (mealPlans.length) {
          this.selectedMealPlan = this.mealPlans[0];
          this.selectedMealPlanId = this.selectedMealPlan.id.toString();
        } else {
          this.selectedMealPlan = null;
        }
        this.setSlidesPerView();
      });
    });
  }

  loadMealHistory(date: string) {
    this.httpService.get("/api/meal_histories?date=" + date, this.token).subscribe((res: any) => {
      this.mealHistory = res;
    });
  }

  ngOnDestroy() {
    const swiper = this.swiperRef?.nativeElement.swiper;
    if (swiper) {
      swiper.destroy(true, true);
    }
  }

  ionViewWillEnter() {
    this.highlightClosestMealTime();
  }
  //called when the notes ion-item-button is clicked to show more info/notes (not complete)
  toggleMoreInfoShowing(optionId: string) {
    this.moreInfoShowing[optionId] =!this.moreInfoShowing[optionId];
  }

  //takes the date from when a user clicks the calendar
  //turns that date into a date object, which is used as an argument to provide meal plan info for specific dates
  onDateChange(event: any) {
    let date = event.detail.value;
    this.selectedDate = date;
    let dateObject = new Date(date);
    let dayToday = dateObject.getDay();
    // Lock options if selected date is not today
    let selectedDate = formatDate(dateObject, 'Y-m-d', 'en');
    let currentDate = formatDate(new Date(this.currentDate), 'Y-m-d', 'en');
    if (currentDate < selectedDate || currentDate > selectedDate) {
      this.lockOptions = true
    } else {
      this.lockOptions = false
    }
    // Get meal plans for the selected date
    this.loadData(dayToday);
    // If past date, get meal history
    if (selectedDate <= currentDate) {
      this.loadMealHistory(date)
    }
    const modal = document.querySelector('ion-modal');
    if (modal) {
      modal.dismiss();
    }
  }

  checkIfOptionSelected(option: any, mealId: any, mealPlanId: any) {
    let checked = false;
    if (this.mealHistory) {
      if (this.mealHistory.length) {
        this.mealHistory.forEach((record, index) => {
          if (record.meal.id == mealId && record.mealPlan.id == mealPlanId && record.mealOption.id == option.id) {
            option.isChecked = true;
            checked = true;
          }
        });
      }
    }
    return checked;
  }

  onCheckboxChange(event: any, option: any, meal: any) {
      let selectedDate = this.selectedDate;
      if(!selectedDate) {
        //used to remove miliseconds and timezone appended on isostring for consistency (.30TZ) for example
        let lastFiveChars = 5;
        let dateString = new Date(this.currentDate).toISOString();
        selectedDate = dateString.slice(0, -lastFiveChars);
      }
      meal.options.forEach((opt: MealOption) => opt.isChecked = opt.id === option.id);
      const data = {
        'customer': this.customer.user.id,
        'date': selectedDate,
        'meal': meal.id.toString(),
        'mealPlan': this.selectedMealPlanId?.toString(),
        'option': option.id.toString(),
      }
      // Register selected meal in database
      this.httpService.post("/api/meal-history/new", data, this.token).subscribe(res => {
        console.log(res);
        console.log('show toast');
      })
  }

  //the amount of swiper slides displayed will be either 1 if only one meal category is available...
  //..or, it will be 1.3 if more than one is available (to show more than one category is available for UX purposes)
  setSlidesPerView() {
    if (this.selectedMealPlan) {
      this.slidesPerView = this.selectedMealPlan.meals.length <= 1 ? 1 : 1.3;
      this.updateSwiper();
    }
  }

  //used to update swiper, delay added to remove bug of loading before data arrives
  updateSwiper() {
    const swiper = this.swiperRef?.nativeElement.swiper;
    if (swiper) {
      setTimeout(() => {
        swiper.update();
        swiper.init(); // Reinitialize Swiper
      }, 100); // 1 second delay
    }
  }

  // Highlight the meal time closest to the current time
  highlightClosestMealTime() {
    if (this.selectedMealPlan) {
      const currentTime = new Date().getHours() * 60 + new Date().getMinutes(); // Current time in minutes
      let closestIndex = 0;
      let closestTimeDiff = Infinity;

      this.selectedMealPlan.meals.forEach((meal, index) => {
        const [hours, minutes] = meal.time.split(':').map(Number);
        const mealTime = hours * 60 + minutes; // Meal time in minutes
        const timeDiff = Math.abs(mealTime - currentTime);

        if (timeDiff < closestTimeDiff) {
          closestTimeDiff = timeDiff;
          closestIndex = index;
        }
      });

      this.currentSlideIndex = closestIndex; // Set the closest slide as the current slide

      const swiper = this.swiperRef?.nativeElement.swiper;
      if (swiper) {
        setTimeout(() => {
          swiper.slideTo(this.currentSlideIndex); // Scroll to the closest slide
          swiper.update(); // Update the Swiper to reflect the change
        }, 500);
      }
    }
  }

  //called when a meal plan is selected from the ion-select component
  handleSelectChange(event: any) {
    this.selectedMealPlanId = event.detail.value;
    if (this.selectedMealPlanId) {
      this.updateSwiperAndMealInfo(this.selectedMealPlanId);
    }
  }

  //dynamically set slides per view based on the meal categories provided by api
  //sets selected meal plan
  updateSwiperAndMealInfo(selectedMealPlanId: string) {
    const mealPlan = this.mealPlans.find(mealPlan => mealPlan.id.toString() === selectedMealPlanId);
    if (mealPlan) {
      this.selectedMealPlan = mealPlan;
      this.highlightClosestMealTime(); // Highlight the closest meal time when the meal plan changes
      this.setSlidesPerView();
    } else {
      console.log('no meals defined yet')
    }
  }

  //called when a checkbox is clicked
  toggleCheckbox(index: number): void {
    this.selectedOptionIndex[this.currentSlideIndex] = index;
  }

  //boolean value to see if a meal option checkbox is checked or not
  isChecked(slideIndex: number, optionIndex: number): boolean {
    return this.selectedOptionIndex[slideIndex] === optionIndex;
  }

  //called when a swiper slide is clicked,
  slideClick(event: any): void {
    const swiper = this.swiperRef?.nativeElement.swiper;
    if (swiper.clickedIndex!== undefined) {
      this.previousSlideIndex = this.currentSlideIndex;
      this.currentSlideIndex = swiper.clickedIndex;
    }
  }

  //This function is recommended to have when using for loops in the template
  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }
}
