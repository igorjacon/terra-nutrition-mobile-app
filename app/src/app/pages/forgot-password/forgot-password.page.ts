import { Component, OnInit } from '@angular/core';
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/angular/standalone';
import {arrowBack, lockClosedOutline} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonContent, ReactiveFormsModule, IonToast, IonButtons, IonBackButton, RouterLink, IonButton, IonInput, IonRow, IonCol, IonLabel, IonHeader, IonToolbar, IonTitle, IonIcon, IonText, IonItem]
})
export class ForgotPasswordPage implements OnInit {
  showErrorToast = false; //boolean value on whether or not to show the errorToast
  errorToastText = ""; //the text that will be used in the errorToast
  showSuccessToast = false; //boolean value on whether or not to show the successToast
  successToastText = ""; //the text that will be used in the successToast

   //representation of form controls that make up a form
   //allows easy access to the values in the form
   applyForm = new FormGroup({
    email: new FormControl('', Validators.required)
  });

  //adds icons to the page for use
  constructor() {
    addIcons({lockClosedOutline, arrowBack})
   }

  ngOnInit() {
  }

    //uses a regular expression to check the email is valid
    //if the input the user matches the expression, then the email is valid otherwise returns null
    checkEmail(email: string) {
      return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    }
  

    /**
     * The sendEmail method
     * @param event 
     * 
     * This method is called when the send email button is pressed so a user can get an email to recover their password
     * 
     */
  sendEmail(event: Event) {
    event.preventDefault();
    if(!this.applyForm.value.email) {
      this.errorToastText = "You must provide an email address."
      this.showErrorToast = true;
    } else if(!this.checkEmail(this.applyForm.value.email)) {
      this.errorToastText = "The email you provided was not valid."
      this.showErrorToast = true;
    } else {
      this.successToastText = "Email sent."
      this.showSuccessToast = true;
    }
  }

}
