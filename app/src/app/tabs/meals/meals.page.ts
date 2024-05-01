import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {register} from 'swiper/element/bundle';
import { personOutline, addCircle, eyeOutline, eyeOffOutline, warningOutline, chevronForwardCircleOutline, chevronDownCircleOutline } from 'ionicons/icons';
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

  constructor() { 
    addIcons({
      chevronDownCircleOutline,
      chevronForwardCircleOutline,
      addCircle
    })
  }

  ngOnInit() {
  }

  swiperSlideChanged(e: any) {
    console.log('Changed: ', e)
  }
}
