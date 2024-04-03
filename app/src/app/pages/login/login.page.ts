import { Component, Input, OnInit } from '@angular/core';
import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonRow, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/angular/standalone';
import {personOutline, eyeOutline, eyeOffOutline} from 'ionicons/icons';
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
  passIsVisible: boolean = false; //determines if password in the input is being shown on screen or not
  currentIconName: string = "eye-off-outline"; //name of the icon that will be displayed in the password input
  showErrorToast = false; //whether or not the popup toast is showing or not
  errorToastText = ""; //text which will display in the toast


  //representation of form controls that make up a form
  applyForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  
  //adds the icons that will be used in the page
  constructor() {
    addIcons({
      personOutline,
      eyeOutline,
      eyeOffOutline
    });

  }

  ngOnInit() {

  }

  /* The changeEyeIcon method
  This method is called when a user presses on the eye icon in the password input so they can toggle the visibility of their password
  -changes the boolean 'passIsVisibile' between false or true: this uses property binding to update the ion-input [type] between 'text' or 'password' (which shows or hides it)
  - also changes the type of icon based on whether 'passIsVisibile' is true or not, if true, show eye-outline (icon of an eye which is open)...
  ... if false, show eye-off-outline (icon of an eye which is closed)
  
  */
  changeEyeIcon() {
    this.passIsVisible = !this.passIsVisible;
    this.currentIconName = this.passIsVisible ? 'eye-outline' : 'eye-off-outline';
    console.log(this.currentIconName);
   }


  submitLogin(event: Event) {
    event.preventDefault();
    if(!this.applyForm.value.email || !this.applyForm.value.password) {
      this.errorToastText = "You must provide an email and password to log in."
      this.showErrorToast = true;
    }

  }

  }


