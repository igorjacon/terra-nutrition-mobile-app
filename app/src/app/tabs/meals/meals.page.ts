import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicSlides } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { addCircle, menu, chevronForwardCircleOutline, chevronDownCircleOutline, calendarOutline, chevronForward } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import {AuthService} from "../../services/auth.service";
import {StorageService} from "../../services/storage.service";
import {AuthConstants} from "../../config/auth-constants";
import { ActivatedRoute } from '@angular/router';
import { Observable, delay, finalize, flatMap, forkJoin, map, of, tap } from 'rxjs';
import { MealPlan } from 'src/app/model/meal-plan';
import { MealPlanService } from 'src/app/services/meal-plan.service';
import { IonHeader, ModalController, IonToolbar, IonContent, IonDatetimeButton, IonModal, IonDatetime, IonList, IonItem, IonLabel, IonCheckbox, IonAvatar } from '@ionic/angular/standalone';
import { FoodItemEntry } from 'src/app/model/food-item-entry';
import { MealOption } from 'src/app/model/meal-option';
import { Meal } from 'src/app/model/meal';
register();

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
  standalone: true,
  imports: [IonHeader, CommonModule, FormsModule, IonToolbar, IonContent, IonDatetimeButton, IonModal, IonDatetime, IonList, IonItem, IonLabel, IonCheckbox, IonAvatar],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MealsPage implements OnInit {
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  swiperModule = [IonicSlides];
  currentSlideIndex: number = 0;
  previousSlideIndex: number = 0;
  currentDate = "";
  loaded = false;
  customerMealPlanDate = "2024-04-20T00:00:00"; //this will be the date the customer first recieves their mealplan - make it a minimum value in the date calander
  selectedOptionIndex: number[] = []; // Array to store the selected option index for each slide
  mealPlans : MealPlan[] = [];

  constructor(
    private route: ActivatedRoute,
    private modalController: ModalController,
    private authService: AuthService,
    private mealPlanService : MealPlanService,
    private storageService: StorageService) {
    addIcons({
      chevronDownCircleOutline,
      chevronForwardCircleOutline,
      chevronForward,
      addCircle,
      calendarOutline,
      menu
    });
    // Initialize selectedOptionIndex with the correct length
    this.selectedOptionIndex = Array(this.mealPlans.length).fill(null);
  }

  ngOnInit() {
    this.currentDate = new Date().toISOString();
    this.loadData();
    // this.mealPlanService.mealPlanData$.subscribe((res:any) => {
    //   this.mealPlans = res;
    // });
  }

  loadData(){
    this.storageService.get(AuthConstants.ACCESS_TOKEN).then((token) => {
      this.mealPlanService.getMealPlans(token).pipe(
        finalize(() => {
          this.loaded = true;
        })
      ).subscribe((res : any) => {
        console.log(res);
        // this.storageService.store(AuthConstants.MEAL_PLAN_DATA, res);
        this.mealPlans = res;
      });
    });
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

  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }
}
