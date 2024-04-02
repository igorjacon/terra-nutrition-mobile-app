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
  passIsVisible: boolean = false; //determines if password in the input is being shown on screen or not
  currentIconName: string = "eye-off-outline"; //name of the icon that will be displayed in the password input
  password: string = ""; 

  //if already a user, display toast saying you already have an account? --> connect to back end 
  //if email not valid, say email is not valid in toast --> regex
  //if passwords do not match, say passwords are not the same in toast --js ==
  //if password is too weak (8 letters, one capital letter, one number, one symbol) display toast that says need better password --> regex


     //uses a regular expression to check the email is valid
    //if the input the user matches the expression, then the email is valid otherwise returns null
    checkEmail(email: string) {
      return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    }

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


