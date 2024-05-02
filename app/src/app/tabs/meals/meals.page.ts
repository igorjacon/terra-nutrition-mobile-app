import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiperModule = [IonicSlides];

  mealData = [
    {
      name: "Breakfast",
      optionGroups: [
        { 
          name: "Oatmeal Power Breakfast", // Example group name
          options: [ 
            { id: 0, name: "Oat Meal", calories: "350", proteinGrams: "20", fatGrams: "10", carbsGrams: "80", img: "assets/imgs/oatmeal.jpg"}, 
            {id: 2, name: "Protein Shake", calories: "150", proteinGrams: "50", fatGrams: "15", carbsGrams: "80", img: "assets/imgs/protein-shake.jpg"}
          ] 
        },
        {
          name: "Avocado Protein Booster",
          options: [ 
            {id: 1, name: "Avocado Toast", calories: "250", proteinGrams: "10", fatGrams: "15", carbsGrams: "60", img: "assets/imgs/oatmeal.jpg"}, 
            {id: 2, name: "Protein Shake", calories: "150", proteinGrams: "50", fatGrams: "15", carbsGrams: "80", img: "assets/imgs/protein-shake.jpg"}
          ]
        }
      ]
    },
    {
      name: "Lunch",
      optionGroups: [
        { 
          name: "Oatmeal Power Breakfast Lunchh", // Example group name
          options: [ 
            { id: 0, name: "Oat Meal", calories: "350", proteinGrams: "20", fatGrams: "10", carbsGrams: "80", img: "assets/imgs/oatmeal.jpg"}, 
            {id: 2, name: "Protein Shake", calories: "150", proteinGrams: "50", fatGrams: "15", carbsGrams: "80", img: "assets/imgs/protein-shake.jpg"},
            {id: 2, name: "Protein Shake", calories: "150", proteinGrams: "50", fatGrams: "15", carbsGrams: "80", img: "assets/imgs/protein-shake.jpg"}
          ] 
        },
        { 
          name: "Oatmeal Power Breakfast 2323223", // Example group name
          options: [ 
            {id: 2, name: "Protein Shake", calories: "150", proteinGrams: "50", fatGrams: "15", carbsGrams: "80", img: "assets/imgs/protein-shake.jpg"},
            {id: 2, name: "Protein Shake", calories: "150", proteinGrams: "50", fatGrams: "15", carbsGrams: "80", img: "assets/imgs/protein-shake.jpg"}
          ] 
        },
      ]
    },
    {
      name: "Snacks",
      optionGroups: [
        { 
          name: "Snackss ooptuin", // Example group name
          options: [ 
            { id: 0, name: "Oat Meal", calories: "350", proteinGrams: "20", fatGrams: "10", carbsGrams: "80", img: "assets/imgs/oatmeal.jpg"}, 
            {id: 2, name: "Protein Shake", calories: "150", proteinGrams: "50", fatGrams: "15", carbsGrams: "80", img: "assets/imgs/protein-shake.jpg"},
            {id: 2, name: "Protein Shake", calories: "150", proteinGrams: "50", fatGrams: "15", carbsGrams: "80", img: "assets/imgs/protein-shake.jpg"}
          ] 
        },
        { 
          name: "Scnaks snacks snacks!", // Example group name
          options: [ 
            {id: 2, name: "Protein Shake", calories: "150", proteinGrams: "50", fatGrams: "15", carbsGrams: "80", img: "assets/imgs/protein-shake.jpg"}
          ] 
        },
      ]
    },
    {
      name: "Dinner",
      optionGroups: [
        { 
          name: "DINDINDIN ooptuin", // Example group name
          options: [ 
            { id: 0, name: "Oat Meal", calories: "350", proteinGrams: "20", fatGrams: "10", carbsGrams: "80", img: "assets/imgs/oatmeal.jpg"}, 
            {id: 2, name: "Protein Shake", calories: "150", proteinGrams: "50", fatGrams: "15", carbsGrams: "80", img: "assets/imgs/protein-shake.jpg"},
          ] 
        },
        { 
          name: "Dinner 222", // Example group name
          options: [ 
            {id: 2, name: "Protein Shake", calories: "150", proteinGrams: "50", fatGrams: "15", carbsGrams: "80", img: "assets/imgs/protein-shake.jpg"},
            {id: 0, name: "Oat Meal", calories: "350", proteinGrams: "20", fatGrams: "10", carbsGrams: "80", img: "assets/imgs/oatmeal.jpg"}, 
            {id: 2, name: "Protein Shake", calories: "150", proteinGrams: "50", fatGrams: "15", carbsGrams: "80", img: "assets/imgs/protein-shake.jpg"}
         ] 
       },
       { 
        name: "DINDINDIN ooptuin", // Example group name
        options: [ 
          { id: 0, name: "Oat Meal", calories: "350", proteinGrams: "20", fatGrams: "10", carbsGrams: "80", img: "assets/imgs/oatmeal.jpg"}, 
          {id: 2, name: "Protein Shake", calories: "150", proteinGrams: "50", fatGrams: "15", carbsGrams: "80", img: "assets/imgs/protein-shake.jpg"},
        ] 
      },
      { 
        name: "DINDINDIN ooptuin", // Example group name
        options: [ 
          { id: 0, name: "Oat Meal", calories: "350", proteinGrams: "20", fatGrams: "10", carbsGrams: "80", img: "assets/imgs/oatmeal.jpg"}, 
          {id: 2, name: "Protein Shake", calories: "150", proteinGrams: "50", fatGrams: "15", carbsGrams: "80", img: "assets/imgs/protein-shake.jpg"},
        ] 
      }

      ]
    }

    // ... other meals
  ];
  

  // mealData = [
  //   {
  //     name: "Breakfast",
  //     options: [
  //        [ {
  //         id: 0,
  //         name: "Oat Meal",
  //         calories: "350",
  //         proteinGrams: "20",
  //         fatGrams: "10",
  //         carbsGrams: "80",
  //         img: "assets/imgs/oatmeal.jpg"
  //       }, 
  //       {
  //         id: 1,
  //         name: "Avocado Toast",
  //         calories: "250",
  //         proteinGrams: "10",
  //         fatGrams: "15",
  //         carbsGrams: "60",
  //         img: "assets/imgs/oatmeal.jpg"
  //       }],

  //       [ {
  //         id: 0,
  //         name: "Avocado Toast",
  //         calories: "250",
  //         proteinGrams: "10",
  //         fatGrams: "15",
  //         carbsGrams: "60",
  //         img: "assets/imgs/oatmeal.jpg"
  //       },
  //       {
  //         id: 1,
  //         name: "Protein Shake",
  //         calories: "150",
  //         proteinGrams: "50",
  //         fatGrams: "15",
  //         carbsGrams: "80",
  //         img: "assets/imgs/protein-shake.jpg"
  //       }]
  //     ]
  //   }
  // ]
    // },
    // {
    //   name: "Lunch",
    //   options: [
    //     {
    //       id: 0,
    //       name: "Oat Meal",
    //       calories: "350",
    //       proteinGrams: "20",
    //       fatGrams: "10",
    //       carbsGrams: "80",
    //       img: "assets/imgs/oatmeal.jpg"
    //     }, 
    //     {
    //       id: 1,
    //       name: "Oat Meal",
    //       calories: "350",
    //       proteinGrams: "20",
    //       fatGrams: "10",
    //       carbsGrams: "80",
    //       img: "assets/imgs/oatmeal.jpg"
    //     }
    //   ]
    // },  {
    //   name: "Snacks",
    //   options: [
    //     {
    //       id: 0,
    //       name: "Oat Meal",
    //       calories: "350",
    //       proteinGrams: "20",
    //       fatGrams: "10",
    //       carbsGrams: "80",
    //       img: "assets/imgs/oatmeal.jpg"
    //     }, 
    //     {
    //       id: 1,
    //       name: "Oat Meal",
    //       calories: "350",
    //       proteinGrams: "20",
    //       fatGrams: "10",
    //       carbsGrams: "80",
    //       img: "assets/imgs/oatmeal.jpg"
    //     }
    //   ]
    // },  {
    //   name: "Dinner",
    //   options: [
    //     {
    //       id: 0,
    //       name: "Oat Meal",
    //       calories: "350",
    //       proteinGrams: "20",
    //       fatGrams: "10",
    //       carbsGrams: "80",
    //       img: "assets/imgs/oatmeal.jpg"
    //     }, 
    //     {
    //       id: 1,
    //       name: "Oat Meal",
    //       calories: "350",
    //       proteinGrams: "20",
    //       fatGrams: "10",
    //       carbsGrams: "80",
    //       img: "assets/imgs/oatmeal.jpg"
    //     }
    //   ]
    // }]

  constructor() { 
    addIcons({
      chevronDownCircleOutline,
      chevronForwardCircleOutline,
      addCircle
    })
  }

  ngOnInit() {
  }

  slideClick(event: any) {
    // console.log(event)
    const currentIndex = event.detail[0].clickedIndex;
    const currentSlideName = this.mealData[currentIndex].name

    console.log(currentSlideName)

  }
}
