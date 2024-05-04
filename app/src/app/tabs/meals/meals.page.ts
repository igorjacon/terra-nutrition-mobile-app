import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, PercentPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicSlides } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {register} from 'swiper/element/bundle';
import { addCircle, chevronForwardCircleOutline, chevronDownCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

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


  //temporary static data
  mealData = [
    {
      name: "Breakfast",
      optionGroups: [
        { 
          name: "Oatmeal Power Breakfast", 
          options: [ 
            { id: 0, name: "Oat Meal", calories: 350, proteinGrams: 20, fatGrams: 10, carbsGrams: 80, img: "assets/imgs/oatmeal.jpg"}, 
            { id: 1, name: "Protein Shake", calories: 350, proteinGrams: 50, fatGrams: 15, carbsGrams: 80, img: "assets/imgs/protein-shake.jpg"}
          ] 
        },
        {
          name: "Avocado Protein Booster",
          options: [ 
            { id: 2, name: "Avocado Toast", calories: 250, proteinGrams: 10, fatGrams: 15, carbsGrams: 70, img: "assets/imgs/avocado-toast.jpg"}, 
            { id: 3, name: "Protein Shake", calories: 250, proteinGrams: 50, fatGrams: 15, carbsGrams: 80, img: "assets/imgs/protein-shake.jpg"}
          ]
        }
      ]
    },
    {
      name: "Lunch",
      optionGroups: [
        { 
          name: "High protein salmon lunch", 
          options: [ 
            { id: 4, name: "Salmon", calories: 200, proteinGrams: 40, fatGrams: 10, carbsGrams: 80, img: "assets/imgs/salmon.jpg"}, 
            { id: 5, name: "Scrambled eggs", calories: 150, proteinGrams: 50, fatGrams: 15, carbsGrams: 80, img: "assets/imgs/scrambled-eggs.jpg"},
            { id: 6, name: "Berry Salad", calories: 150, proteinGrams: 20, fatGrams: 5, carbsGrams: 30, img: "assets/imgs/berry-salad.jpg"}
          ] 
        },
        { 
          name: "Low-fat cheese burger and fries", 
          options: [ 
            { id: 7, name: "Cheese burger", calories: 150, proteinGrams: 50, fatGrams: 10, carbsGrams: 80, img: "assets/imgs/cheeseburger.jpg"},
            { id: 8, name: "Fries", calories: 150, proteinGrams: 50, fatGrams: 5, carbsGrams: 80, img: "assets/imgs/fries.jpg"}
          ] 
        },
      ]
    },
    {
      name: "Snacks",
      optionGroups: [
        { 
          name: "Snackss ooptuin", 
          options: [ 
            { id: 9, name: "Oat Meal", calories: 350, proteinGrams: 20, fatGrams: 10, carbsGrams: 80, img: "assets/imgs/oatmeal.jpg"}, 
            { id: 10, name: "Protein Shake", calories: 150, proteinGrams: 50, fatGrams: 15, carbsGrams: 80, img: "assets/imgs/protein-shake.jpg"},
            { id: 11, name: "Protein Shake", calories: 150, proteinGrams: 50, fatGrams: 15, carbsGrams: 80, img: "assets/imgs/protein-shake.jpg"}
          ] 
        },
        { 
          name: "Scnaks snacks snacks!", 
          options: [ 
            { id: 12, name: "Protein Shake", calories: 150, proteinGrams: 50, fatGrams: 15, carbsGrams: 80, img: "assets/imgs/protein-shake.jpg"},
          ] 
        },
      ]
    },
    {
      name: "Dinner",
      optionGroups: [
        { 
          name: "DINDINDIN ooptuin", 
          options: [ 
            { id: 13, name: "Oat Meal", calories: 350, proteinGrams: 20, fatGrams: 10, carbsGrams: 80, img: "assets/imgs/oatmeal.jpg"}, 
            { id: 14, name: "Protein Shake", calories: 150, proteinGrams: 50, fatGrams: 15, carbsGrams: 80, img: "assets/imgs/protein-shake.jpg"},
          ] 
        },
        { 
          name: "Dinner 222", 
          options: [ 
            { id: 15, name: "Protein Shake", calories: 150, proteinGrams: 50, fatGrams: 15, carbsGrams: 80, img: "assets/imgs/protein-shake.jpg"},
            { id: 16, name: "Oat Meal", calories: 350, proteinGrams: 20, fatGrams: 10, carbsGrams: 80, img: "assets/imgs/oatmeal.jpg"}, 
            { id: 17, name: "Protein Shake", calories: 150, proteinGrams: 50, fatGrams: 15, carbsGrams: 80, img: "assets/imgs/protein-shake.jpg"},
         ] 
       },
       { 
        name: "DINDINDIN ooptuin", 
        options: [ 
          { id: 18, name: "Oat Meal", calories: 350, proteinGrams: 20, fatGrams: 10, carbsGrams: 80, img: "assets/imgs/oatmeal.jpg"}, 
          { id: 19, name: "Protein Shake", calories: 150, proteinGrams: 50, fatGrams: 15, carbsGrams: 80, img: "assets/imgs/protein-shake.jpg"},
        ] 
      },
      { 
        name: "DINDINDIN ooptuin",
        options: [ 
          { id: 20, name: "Oat Meal", calories: 350, proteinGrams: 20, fatGrams: 10, carbsGrams: 80, img: "assets/imgs/oatmeal.jpg"}, 
          { id: 21, name: "Protein Shake", calories: 150, proteinGrams: 50, fatGrams: 15, carbsGrams: 80, img: "assets/imgs/protein-shake.jpg"},
        ] 
      }

      ]
    }

    // ... other meals
];


  constructor() { 
    addIcons({
      chevronDownCircleOutline,
      chevronForwardCircleOutline,
      addCircle
    })

  }

  // toggleSlide(slideIndex) {

  // }

  ngOnInit() {
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
