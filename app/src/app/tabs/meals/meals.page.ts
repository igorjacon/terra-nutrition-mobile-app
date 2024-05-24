import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { finalize } from 'rxjs';
import { MealPlan } from 'src/app/model/meal-plan';
import { MealPlanService } from 'src/app/services/meal-plan.service';
import { IonHeader, IonSelect, IonSelectOption, IonToolbar, IonContent, IonSkeletonText,
  IonDatetimeButton, IonModal, IonDatetime, IonList, IonListHeader, IonItem, IonLabel,
  IonThumbnail, IonCheckbox, IonAvatar } from '@ionic/angular/standalone';
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

  //initialise some icons used in app, and inject services that are being used/will be used
  constructor(
    // private route: ActivatedRoute,
    private mealPlanService: MealPlanService,
    private storageService: StorageService,
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
    console.log('test logo click')
    this.router.navigateByUrl('customer/dashboard')
  }

  ngOnInit() {
    this.currentDate = new Date().toISOString();
    const today = new Date().getDay();
    this.loadData(today);
    // this.getCaloriesFromKjls(153, 200);
    // this.displayCalories();
  }

  ngOnDestroy() {
    const swiper = this.swiperRef?.nativeElement.swiper;
    if (swiper) {
      swiper.destroy(true, true);
    }
  }

  //called when the notes ion-item-button is clicked to show more info/notes (not complete)
  toggleMoreInfoShowing(optionId: string) {
    this.moreInfoShowing[optionId] =!this.moreInfoShowing[optionId];
  }

  //takes the date from when a user clicks the calander
  //turns that date into a date object, which is used as an argument to provide meal plan info for specific dates
  onDateChange(event: any) {
    let date = event.detail.value;
    // console.log(date)
    let dateObject = new Date(date);
    // console.log(dateObject)
    let dayToday = dateObject.getDay()
    // console.log(dayToday)
    this.loadData(dayToday);
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


  //loads the date from the api
  loadData(today: number) {
    this.storageService.get(AuthConstants.ACCESS_TOKEN).then((token) => {
      this.mealPlanService.getMealPlans(token, today).pipe(
        finalize(() => {
          this.loaded = true;
        })
      ).subscribe((mealPlans: any) => {
        this.mealPlans = mealPlans;

        // Retain the selected meal plan if it exists
        if (this.selectedMealPlanId) {
          this.selectedMealPlan = this.mealPlans.find(plan => plan.id.toString() === this.selectedMealPlanId) || this.mealPlans[0];
        } else {
          this.selectedMealPlan = this.mealPlans[0];
        }
        this.setSlidesPerView();
      });
    });
  }

  // displayCalories() {

  // }

  // getKjs() {
  //   //will need to loop through all the items, save their quantities and serviving sizes, and execute the getCaloriesFromKjs function
  //  let kjs = this.selectedMealPlan?.meals[0].options[0].foodItemEntries[0].foodItem.foodItemDetails.energyWithFibreKj; //object

  //  console.log(kjs)
  // //  setTimeout(() => {
  // //   console.log(quantity)
  // //  }, 100)
  // }

  // /* The getCaloriesFromKjls function
  // This method will help us calculate the calories from a food item
  // We have access to the food item
  // Takes in a number in Kjls, multiplies it with

  // */
  // getCaloriesFromKjls(servingSizeKjls100: number, quantity: number) {
  //   //by default, we are provided with the kjs per 100ml/g of food items
  //   //by dividing by 100, we get the serving size per 1ml/g of food, which we can use to multiply by the serving size
  //   let servingSize = servingSizeKjls100 / 100;
  //   let kjs = this.selectedMealPlan?.meals[0].options[0].foodItemEntries[3].foodItem.foodItemDetails.energyWithFibreKj; //object
  //   console.log(kjs)
  //   console.log(servingSize)
  //   let calories = Math.trunc((servingSize * quantity));
  //   console.log(calories)
  //   return calories;
  // }

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
