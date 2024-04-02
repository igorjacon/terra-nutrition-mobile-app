import { Component, Input, OnInit } from '@angular/core';
import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/angular/standalone';
import {personOutline, personCircleOutline, eyeOutline, eyeOffOutline} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonToast, RouterLink, IonButton, IonInput, IonRow, IonCol, IonLabel, IonHeader, IonToolbar, IonTitle, IonIcon, IonText, IonItem, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  passIsVisible: boolean = false;
  currentIconName = "eye-off-outline"
  showErrorToast = false;
  errorToastText = "";


  //representation of form controls that make up a form
  applyForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  
  constructor() {
    addIcons({
      personOutline,
      personCircleOutline,
      eyeOutline,
      eyeOffOutline
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

  submitLogin(event: Event) {
    event.preventDefault();
    if(!this.applyForm.value.email || !this.applyForm.value.password) {
      this.errorToastText = "You must provide an email and password to log in."
      this.showErrorToast = true;
    }

  }

  }


