import { Component, Input, OnInit } from '@angular/core';
import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/angular/standalone';
import {personOutline, personCircleOutline, eyeOutline, eyeOffOutline, personAddOutline} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { FormValidationService } from 'src/app/services/form-validation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonContent, IonToast, RouterLink, ReactiveFormsModule, IonButton, IonInput, IonRow, IonCol, IonLabel, IonHeader, IonToolbar, IonTitle, IonIcon, IonText, IonItem]
})
export class SignUpPage implements OnInit {
  passIsVisible: boolean = false; //determines if password in the input is being shown on screen or not
  currentIconName: string = "eye-off-outline"; //name of the icon that will be displayed in the password input
  showErrorToast = false; //boolean value on whether or not to show the errorToast
  errorToastText = ""; //the text that will be used in the errorToast
  showSuccessToast = false; //boolean value on whether or not to show the successToast
  successToastText = ""; //the text that will be used in the successToast
  showPasswordToast = false;
  passwordToastText = ""

  //Form related
  signupForm: FormGroup;

  //if already a user, display toast saying you already have an account? --> connect to back end 
  //if email not valid, say email is not valid in toast --> regex
  //if passwords do not match, say passwords are not the same in toast --js ==
  //if password is too weak (8 letters, one capital letter, one number, one symbol) display toast that says need better password --> regex

  constructor(private formBuilder: FormBuilder, private formValidator: FormValidationService ) {
    addIcons({
      personOutline,
      personCircleOutline,
      eyeOutline,
      eyeOffOutline, 
      personAddOutline
    });
    
    //sets up the form consisting of three input fields which take data from the user so they can create an account/sign up (email, password, confirm passwrd)
    this.signupForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.pattern(this.formValidator.emailRegex)]),
      password: new FormControl(null, [Validators.required, Validators.pattern(this.formValidator.passwordRegexStrong)]),
      confirmPassword: new FormControl(null, [Validators.required])
    },
    {validators: [this.formValidator.emailValidator, this.formValidator.passwordMatchValidator, this.formValidator.passwordStrengthValidator]}
    );

  }

  ngOnInit() {
  }

  changeEyeIcon() {
    console.log(this.currentIconName)
    this.passIsVisible = !this.passIsVisible;
    this.currentIconName = this.passIsVisible ? 'eye-outline' : 'eye-off-outline';
    console.log(this.currentIconName)
  }


  signUp() {
    if (!this.signupForm.valid) {
      const errors = this.signupForm.errors;
      if(!this.signupForm.value.email || !this.signupForm.value.password || !this.signupForm.value.confirmPassword ) {
        this.errorToastText = "You must fill out all fields before signing up.";
        this.showErrorToast = true;
      } else if (errors?.['passwordmatcherror']) {
        this.errorToastText = "Your passwords do not match.";
        this.showErrorToast = true;
      } else if (errors?.['invalidemailerror']) {
        this.errorToastText = "Invalid email format.";
        this.showErrorToast = true;
      } else if (errors?.['passwordstrengtherror']) {
        this.passwordToastText = "Your password requires a minimum length of 8 characters and needs an uppercase and lowercase character.";
        this.showPasswordToast = true;
      } 
    } else {
      this.successToastText = "Sign up email sent."
      this.showSuccessToast = true;
    }
  }
}


