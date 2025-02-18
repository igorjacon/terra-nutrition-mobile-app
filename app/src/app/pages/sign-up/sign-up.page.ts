import { Component, Input, OnInit } from '@angular/core';
import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonText,
  IonTitle, IonToast, IonToolbar, IonDatetime, IonDatetimeButton, IonModal, IonTextarea, IonList, IonSelect, IonSelectOption, IonSpinner } from '@ionic/angular/standalone';
import {personOutline, personCircleOutline, eyeOutline, eyeOffOutline, personAddOutline, calendar} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { HttpService } from 'src/app/services/http.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonContent, IonToast, RouterLink, ReactiveFormsModule, IonButton, IonInput, IonModal, IonTextarea,
    IonDatetimeButton, IonRow, IonCol, IonLabel, IonHeader, IonToolbar, IonTitle, IonIcon, IonText, IonItem, IonDatetime,
    IonSelect, IonSelectOption, IonList, CommonModule, IonSpinner
  ]
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
  selectedDate: string | null = null;
  loading = false;
  
  // readonly phoneMask: MaskitoOptions = {
  //   mask: ['+', '61', ' ', '(', /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  // };
  // readonly maskPredicate: MaskitoElementPredicate = (el) => (el as HTMLIonInputElement).getInputElement();
  // myPhoneNumber = maskitoTransform('4 2222-3344', this.phoneMask);

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
      personAddOutline,
      calendar
    });
  }

  ngOnInit() {
  }

  openPicker() {
    this.selectedDate = new Date().toISOString(); // Temporarily set the date when opening
  }

  clearDate() {
    this.selectedDate = null; // Reset the value when canceled
  }

  navigateToLoginPage() {
    this.router.navigateByUrl('/login')
  }

  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
  }
  //Form related
  signupForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    // dob: new FormControl(''),
    phoneNumber: new FormControl(''),
    occupation: new FormControl(''),
    addressLineOne: new FormControl(null),
    addressLineTwo: new FormControl(null),
    addressCity: new FormControl(null),
    addressZipCode: new FormControl(null),
    addressState: new FormControl(null),
    addressCountry: new FormControl(null),
    height: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    goalWeight: new FormControl('', Validators.required),
    dietaryPreference: new FormControl('', Validators.required),
    goals: new FormControl('', Validators.required),
    reasonSeekProfessional: new FormControl('', Validators.required),
    currExerciseRoutine: new FormControl(''),
    medicalInfo: new FormControl(''),
    email: new FormControl(null, [Validators.required, Validators.pattern(this.formValidator.emailRegex)]),
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
    this.loading = true;
    event.preventDefault();
    const errors = this.signupForm.errors;
    if (!this.signupForm.valid || errors !== null) {
      this.errorToastText = "Please fill in the required fields.";
      if (errors?.['passwordmatcherror']) {
        this.errorToastText = "Your passwords do not match.";
      }
      this.showErrorToast = true;
      this.signupForm.markAllAsTouched();
      this.loading = false;
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
        'height': this.signupForm.value.height + " cm",
        'weight': this.signupForm.value.weight + " kg",
        'goalWeight': this.signupForm.value.goalWeight + " kg",
        'dob': this.selectedDate,
        'occupation': this.signupForm.value.occupation,
        'dietaryPreference': this.signupForm.value.dietaryPreference,
        'goals': this.signupForm.value.goals,
        'reasonSeekProfessional': this.signupForm.value.reasonSeekProfessional,
        'currExerciseRoutine': this.signupForm.value.currExerciseRoutine,
        'medicalInfo': this.signupForm.value.medicalInfo
      }

      this.httpService.post("/api/customers", payload).subscribe(
        (response) => {
          // Redirect user to registration complete page
          this.router.navigate(['/registration-complete']);
          this.loading = false;
          this.signupForm.reset();
        },
        (error) => {
          this.loading = false;
          // Handle authentication error
          this.errorToastText = "An error occurred. Please try again later."
          this.showErrorToast = true;
        }
      );
    }
  }
  
}


