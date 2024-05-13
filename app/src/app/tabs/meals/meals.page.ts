import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, PercentPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicSlides } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {register} from 'swiper/element/bundle';
import { addCircle, chevronForwardCircleOutline, chevronDownCircleOutline, calendarOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular';
import {AuthService} from "../../services/auth.service";
import {StorageService} from "../../services/storage.service";
import {AuthConstants} from "../../config/auth-constants";
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MealPlan } from 'src/app/model/meal-plan';
import { MealPlanService } from 'src/app/services/meal-plan.service';

register();

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class MealsPage implements OnInit {
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  swiperModule = [IonicSlides];
  // mealsShowing = false;
  isActive = true;
  currentSlideIndex: number = 0; 
  previousSlideIndex: number = 0;
  itemIsActive = false;
  calendarShowing = true;
  selectedDate = "";
  currentDate = "";
  customerMealPlanDate = "2024-04-20T00:00:00"; //this will be the date the customer first recieves their mealplan - make it a minimum value in the date calander
  user: any;
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
      addCircle,
      calendarOutline
    })
  }

  ngOnInit() {
    this.currentDate = new Date().toISOString();
    this.loadData();
  }

  async loadData()
  {
    await this.mealPlanService.mealPlanData$.subscribe(async (res:any) => {
      if (res) {
        this.mealPlans = res;
      } else {
        await this.route.data.pipe(map(response => response['mealPlans'])).subscribe(mealPlansData => {
          mealPlansData.subscribe((mealPlans : MealPlan[]) => {
            this.mealPlans = mealPlans;
            // this.storageService.store(AuthConstants.MEAL_PLAN_DATA, mealPlans);
          });
        });
      }  
    });
  }

  toggleCalendar() {
    this.calendarShowing = !this.calendarShowing;
    console.log('clicked')
    console.log(this.calendarShowing)
  }

  //colour now changes through template binding using currentIndex
  //whenever a slide is clicked, change the colour, show and hide meals
  slideClick(event: any) {
    const swiper = this.swiperRef?.nativeElement.swiper; //access to swiper

    //doesnt perform function if clicked outside of swiper boundary
    if(swiper.clickedIndex !== undefined) {

      //update the previous slide index
      this.previousSlideIndex = this.currentSlideIndex;
      //get the current slide index
      this.currentSlideIndex = swiper.clickedIndex;
      const currentSlide = swiper.slides[this.currentSlideIndex];
      const previousSlide = swiper.slides[this.previousSlideIndex];
      // console.log(swiper.clickedIndex)
      // console.log(this.currentSlideIndex, 'Current slide index')
      // console.log(this.previousSlideIndex, 'Previous slide index')
      // if(this.currentSlideIndex !== this.previousSlideIndex) {
      //   previousSlide.classList.remove('active');
      //   currentSlide.classList.add('active');
      // } 
    } 

    // const swiper = this.swiperRef?.nativeElement.swiper;
    // this.previousSlideIndex = this.currentSlideIndex; 
    // console.log(event)
    // console.log(s.swiper.clickedIndex)
    // this.currentSlideIndex = event.detail[0].clickedIndex;

    //access to slides to altering class
    // const currentSlide = swiper.slides[this.currentSlideIndex];
    // const previousSlide = swiper.slides[this.previousSlideIndex];
    
    // if(this.previousSlideIndex !== this.currentSlideIndex) {
    //   previousSlide.classList.remove('active');
    //   currentSlide.classList.add('active');
    //   this.mealsShowing = true;
    //   this.isActive = true;
    // } else {
    //   this.mealsShowing = !this.mealsShowing;
    //   if(this.isActive) {
    //     currentSlide.classList.remove('active')
    //   } else {
    //     currentSlide.classList.add('active')
    //   }
    //   this.isActive = !this.isActive;
    // }
  }
}
