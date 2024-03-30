import { Component, Input, OnInit } from '@angular/core';
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {personOutline, personCircleOutline, arrowBack, eyeOutline, eyeOffOutline, lockClosedOutline} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonContent, IonButtons, IonBackButton, RouterLink, IonButton, IonInput, IonRow, IonCol, IonLabel, IonHeader, IonToolbar, IonTitle, IonIcon, IonText, IonItem]
})
export class ForgotPasswordPage implements OnInit {

  constructor() {
    addIcons({lockClosedOutline, arrowBack})
   }

  ngOnInit() {
  }

}
