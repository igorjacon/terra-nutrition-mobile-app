import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicSlides } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { addCircle, menu, chevronForwardCircleOutline, chevronDownCircleOutline, calendarOutline, chevronForward } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";
import { AuthConstants } from "../../config/auth-constants";
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MealPlan } from 'src/app/model/meal-plan';
import { MealPlanService } from 'src/app/services/meal-plan.service';
import { IonHeader, ModalController, IonSelect, IonSelectOption, IonToolbar, IonContent, IonDatetimeButton, IonModal, IonDatetime, IonList, IonItem, IonLabel, IonCheckbox, IonAvatar } from '@ionic/angular/standalone';
register();

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
  standalone: true,
  imports: [IonHeader, IonSelect, IonSelectOption, CommonModule, FormsModule, IonToolbar, IonContent, IonDatetimeButton, IonModal, IonDatetime, IonList, IonItem, IonLabel, IonCheckbox, IonAvatar],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MealsPage implements OnInit {
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  swiperModule = [IonicSlides];
  currentSlideIndex: number = 0;
  previousSlideIndex: number = 0;
  currentDate = "";
  customerMealPlanDate = "2024-04-20T00:00:00";
  selectedOptionIndex: number[] = [];
  mealPlans: MealPlan[] = [];
  selectedMealPlan: any; // Default valu
  selectedMealPlanObject: any;
  defaultMealPlanObject: any;
  infoShowing= false;
  currentInfoIndex: number | null = null; // Initialize to null
  

  constructor(
    private route: ActivatedRoute,
    private mealPlanService: MealPlanService,
    private storageService: StorageService) {
    addIcons({
      chevronDownCircleOutline,
      chevronForwardCircleOutline,
      chevronForward,
      addCircle,
      calendarOutline,
      menu
    });
    this.selectedOptionIndex = Array(this.mealPlans.length).fill(null);
    console.log(this.kjsToCalories(2000))
  }

  ngOnInit() {
    this.currentDate = new Date().toISOString();
    this.loadData();
  }

  handleSelectChange(event: any) {
    this.selectedMealPlan = event.detail.value;
    console.log(event.detail.value)
    this.updateSwiperAndMealInfo(); 
  }

  async loadData() {
     this.mealPlanService.mealPlanData$.subscribe(async (res: any) => {
      if (res) {
        this.mealPlans = res;     
        this.updateSwiperAndMealInfo(); 
        this.setDefaultMealPlanObject();
      } else {
         this.route.data.pipe(map(response => response['mealPlans'])).subscribe(mealPlansData => {
          mealPlansData.subscribe((mealPlans: MealPlan[]) => {
            this.mealPlans = mealPlans;
            console.log(mealPlans)
            this.updateSwiperAndMealInfo(); 
            this.setDefaultMealPlanObject();
          });
        });
      }
    });
  }

  setDefaultMealPlanObject() {
    this.defaultMealPlanObject = this.mealPlans[0];
  }

  kjsToCalories(kjs: any) {
    
      return Math.trunc(kjs/4.18);
    
  }


  toggleInfo(index:number) {
    this.currentInfoIndex = this.currentInfoIndex === index? null : index;
    this.infoShowing = !this.infoShowing;
  }

  updateSwiperAndMealInfo() {
    // Find the selected meal plan object
    this.selectedMealPlanObject = this.mealPlans.find(plan => plan.title === this.selectedMealPlan);
    if (this.selectedMealPlanObject) {
      // Update the Swiper slides and meal info based on the selected meal plan
      // This is a placeholder for your logic to update the Swiper and meal info
      console.log('Selected Meal Plan:', this.selectedMealPlanObject);
    } else {
      console.log('no meals defined yet')
    }
  }

  toggleCheckbox(index: number): void {
    this.selectedOptionIndex[this.currentSlideIndex] = index;
  }

  isChecked(slideIndex: number, optionIndex: number): boolean {
    return this.selectedOptionIndex[slideIndex] === optionIndex;
  }

  slideClick(event: any): void {
    const swiper = this.swiperRef?.nativeElement.swiper;
    if (swiper.clickedIndex!== undefined) {
      this.previousSlideIndex = this.currentSlideIndex;
      this.currentSlideIndex = swiper.clickedIndex;
    }
  }
}
