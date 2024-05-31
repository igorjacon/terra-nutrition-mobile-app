import { Component, Input, OnInit } from '@angular/core';
import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonText,
  IonTitle, IonToast, IonToolbar, IonDatetime, IonDatetimeButton, IonModal, IonTextarea } from '@ionic/angular/standalone';
import {personOutline, personCircleOutline, eyeOutline, eyeOffOutline, personAddOutline} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { HttpService } from 'src/app/services/http.service';
import { MaskitoOptions, MaskitoElementPredicate, maskitoTransform } from '@maskito/core';
import { MaskitoModule } from '@maskito/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonContent, IonToast, RouterLink, ReactiveFormsModule, IonButton, IonInput, MaskitoModule, IonModal, IonTextarea,
    IonDatetimeButton, IonRow, IonCol, IonLabel, IonHeader, IonToolbar, IonTitle, IonIcon, IonText, IonItem, IonDatetime]
})
export class SignUpPage implements OnInit {
  passIsVisible: boolean = false; //determines if password in the input is being shown on screen or not
  currentIconName: string = "eye-off-outline"; //name of the icon that will be displayed in the password input
  showErrorToast = false; //boolean value on whether or not to show the errorToast
  errorToastText = ""; //the text that will be used in the errorToast
  showSuccessToast = false; //boolean value on whether or not to show the successToast
  successToastText = ""; //the text that will be used in the successToast
  showPasswordToast = false;
  passwordToastText = "";
  dob = "";
  readonly phoneMask: MaskitoOptions = {
    mask: ['+', '61', ' ', '(', /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };
  readonly maskPredicate: MaskitoElementPredicate = (el) => (el as HTMLIonInputElement).getInputElement();
  myPhoneNumber = maskitoTransform('4 2222-3344', this.phoneMask);

  constructor(
    private formBuilder: FormBuilder,
    private formValidator: FormValidationService,
    private httpService: HttpService,
    private router: Router
  ) {
    addIcons({
      personOutline,
      personCircleOutline,
      eyeOutline,
      eyeOffOutline,
      personAddOutline
    });
  }

  ngOnInit() {
  }

  onDateChange(event: any) {
    this.dob = event.detail.value;
  }
  //Form related
  signupForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    email: new FormControl(null, [Validators.required, Validators.pattern(this.formValidator.emailRegex)]),
    addressLineOne: new FormControl('', Validators.required),
    addressLineTwo: new FormControl(''),
    addressCity: new FormControl('', Validators.required),
    addressZipCode: new FormControl('', Validators.required),
    addressState: new FormControl('', Validators.required),
    addressCountry: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    goalWeight: new FormControl('', Validators.required),
    dob: new FormControl(''),
    occupation: new FormControl('', Validators.required),
    dietaryPreference: new FormControl('', Validators.required),
    goals: new FormControl('', Validators.required),
    reasonSeekProfessional: new FormControl('', Validators.required),
    currExerciseRoutine: new FormControl(''),
    medicalInfo: new FormControl(''),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, Validators.required),
  },
  {
    validators: [
      this.formValidator.emailValidator,
      this.formValidator.passwordMatchValidator,
    ]
  });

  changeEyeIcon() {
    this.passIsVisible = !this.passIsVisible;
    this.currentIconName = this.passIsVisible ? 'eye-outline' : 'eye-off-outline';
  }

  signUp(event: Event) {
    event.preventDefault();
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
      }
      console.log(errors);
      // else if (errors?.['passwordstrengtherror']) {
      //   this.passwordToastText = "Your password requires a minimum length of 8 characters and needs an uppercase and lowercase character.";
      //   this.showPasswordToast = true;
      // }
    } else {
      const payload = {
        'user': {
          'firstName': this.signupForm.value.firstName,
          'lastName': this.signupForm.value.lastName,
          'password': this.signupForm.value.password,
          'phones': [
            {
              'prefix': "+61",
              'number': this.signupForm.value.phoneNumber
            }
          ],
          'email': this.signupForm.value.email,
          'address': {
            'lineOne': this.signupForm.value.addressLineOne,
            'lineTwo': this.signupForm.value.addressLineTwo,
            'city': this.signupForm.value.addressCity,
            'zipCode': this.signupForm.value.addressZipCode,
            'state': this.signupForm.value.addressState,
            'country': this.signupForm.value.addressCountry,
          },
        },
        'height': this.signupForm.value.height + " m",
        'weight': this.signupForm.value.weight + " kg",
        'goalWeight': this.signupForm.value.goalWeight + " kg",
        'dob': this.dob,
        'occupation': this.signupForm.value.occupation,
        'dietaryPreference': this.signupForm.value.dietaryPreference,
        'goals': this.signupForm.value.goals,
        'reasonSeekProfessional': this.signupForm.value.reasonSeekProfessional,
        'currExerciseRoutine': this.signupForm.value.currExerciseRoutine,
        'medicalInfo': this.signupForm.value.medicalInfo
      }

      console.log(payload);
      this.httpService.post("/api/customers", payload).subscribe(
        (response) => {
          console.log(response);
          // Redirect user to registration complete page
          this.router.navigate(['/registration-complete']);
        },
        (error) => {
          // Handle authentication error
          this.errorToastText = "An error occurred. Please try again later."
          this.showErrorToast = true;
        }
      );

      this.successToastText = "Registration Complete."
      this.showSuccessToast = true;
    }
  }
}


