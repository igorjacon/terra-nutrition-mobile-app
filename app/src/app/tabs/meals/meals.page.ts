import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicSlides } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { ChangeDetectorRef } from '@angular/core';
import { addCircle, menu, chevronForwardCircleOutline, chevronDownCircleOutline, calendarOutline, chevronForward } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { StorageService } from "../../services/storage.service";
import { AuthConstants } from "../../config/auth-constants";
import { ActivatedRoute } from '@angular/router';
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
  selectedMealPlan: MealPlan | null = null; // Default value
  infoShowing= false;
  activeNoteIndex: number | null = null; // Initialize to null
  currentInfoIndex: number | null = null; // Initialize to null

  constructor(
    private route: ActivatedRoute,
    private mealPlanService: MealPlanService,
    private storageService: StorageService,
    private cdRef: ChangeDetectorRef) {
    addIcons({
      chevronDownCircleOutline,
      chevronForwardCircleOutline,
      chevronForward,
      addCircle,
      calendarOutline,
      menu
    });
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
      ).subscribe((mealPlans : any) => {
        // this.storageService.store(AuthConstants.MEAL_PLAN_DATA, res);
        this.mealPlans = mealPlans;
        if (mealPlans.length) {
          this.selectedMealPlan = mealPlans[0];
        }
      });
    });
  }

  // handleSelectChange(event: any) {
  //   this.selectedMealPlan = event.detail.value;
  //   console.log(event.detail.value)
  //   this.updateSwiperAndMealInfo();
  // }
  handleSelectChange(event: any) {
    const selectedMealPlanId = parseInt(event.detail.value);
    this.updateSwiperAndMealInfo(selectedMealPlanId);
  }


  kjsToCalories(kjs: any) {
      return Math.trunc(kjs/4.18);
  }


  toggleInfo(index: number): void {
    this.activeNoteIndex = this.activeNoteIndex === index ? null : index;
    this.currentInfoIndex = this.currentInfoIndex === index? null : index;
    this.infoShowing = !this.infoShowing;
  }

  updateSwiperAndMealInfo(selectedMealPlanId : number) {
    // Find the selected meal plan object
    const mealPlan = this.mealPlans.find(mealPlan => mealPlan.id === selectedMealPlanId);

    if (mealPlan) {
      this.selectedMealPlan = mealPlan;
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

  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }
}
