import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicSlides } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { addCircle, chevronForwardCircleOutline, chevronDownCircleOutline, calendarOutline, chevronForward } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { IonHeader, ModalController, IonToolbar, IonContent, IonDatetimeButton, IonModal, IonDatetime, IonList, IonItem, IonLabel, IonCheckbox, IonAvatar } from '@ionic/angular/standalone';
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
  customerMealPlanDate = "2024-04-20T00:00:00";
  notes = "These are notes for this meal. Be sure to do this and that, so you can gain this benefit because of this hehe.";
  selectedOptionIndex: number[] = []; // Array to store the selected option index for each slide
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

constructor(private modalController: ModalController) {
  addIcons({
    chevronDownCircleOutline,
    chevronForwardCircleOutline,
    chevronForward,
    addCircle,
    calendarOutline
  });
  // Initialize selectedOptionIndex with the correct length
  this.selectedOptionIndex = Array(this.mealData.length).fill(null);
}


ngOnInit() {
  this.currentDate = new Date().toISOString();
}

toggleCheckbox(index: number) {
  this.selectedOptionIndex[this.currentSlideIndex] = index;
}

isChecked(slideIndex: number, optionIndex: number): boolean {
  return this.selectedOptionIndex[slideIndex] === optionIndex;
}

slideClick(event: any) {
  const swiper = this.swiperRef?.nativeElement.swiper;

  if (swiper.clickedIndex!== undefined) {
    this.previousSlideIndex = this.currentSlideIndex;
    this.currentSlideIndex = swiper.clickedIndex;
  }
}
}
