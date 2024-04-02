import { Component, Input, OnInit } from '@angular/core';
import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {personOutline, personCircleOutline, eyeOutline, eyeOffOutline, personAddOutline} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonContent, RouterLink, IonButton, IonInput, IonRow, IonCol, IonLabel, IonHeader, IonToolbar, IonTitle, IonIcon, IonText, IonItem]
})
export class SignUpPage implements OnInit {
  passIsVisible: boolean = false;
  currentIconName: string = "eye-off-outline";
  password: string = "";

  
  constructor() {
    addIcons({
      personOutline,
      personCircleOutline,
      eyeOutline,
      eyeOffOutline, 
      personAddOutline
    });

  }

  ngOnInit() {
    addIcons({
      personOutline,
      personCircleOutline,
      eyeOutline,
      eyeOffOutline
    });
  }

  changeEyeIcon() {
    console.log(this.currentIconName)
    this.passIsVisible = !this.passIsVisible;
    this.currentIconName = this.passIsVisible ? 'eye-outline' : 'eye-off-outline';
    console.log(this.currentIconName)
  }

  validatePassword() {

  }

  }


