import { Component, Input, OnInit } from '@angular/core';
import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonProgressBar, IonRow, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/angular/standalone';
import { personOutline, eyeOutline, eyeOffOutline, warningOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonToast, RouterLink, IonButton, IonInput,
    IonRow, IonCol, IonLabel, IonHeader, IonToolbar, IonTitle, IonProgressBar,
    IonIcon, IonText, IonItem, ReactiveFormsModule, CommonModule
  ]
})


export class LoginPage implements OnInit {
  passIsVisible: boolean = false; //determines if password in the input is being shown on screen or not
  currentIconName: string = "eye-off-outline"; //name of the icon that will be displayed in the password input
  errorMsg: string = "";
  isInvalid: boolean = false;
  showErrorToast = false; //boolean value on whether or not to show the errorToast
  errorToastText = ""; //the text that will be used in the errorToast
  // showSuccessToast = false; //boolean value on whether or not to show the successToast
  // successToastText = ""; //the text that will be used in the successToast
  //representation of form controls that make up a form
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  //adds the icons that will be used in the page
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private loadingCtrl: LoadingController
    ) {
      addIcons({
        personOutline,
        eyeOutline,
        eyeOffOutline,
        warningOutline
      });
    }

  ngOnInit() {}

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });

    await loading.present();
    return loading;
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
  }


  async loginAction(event: Event) {
    event.preventDefault();
    if(!this.loginForm.value.email || !this.loginForm.value.password) {
      this.isInvalid = true;
      this.errorToastText = "Provide an email and password to log in"
      this.showErrorToast = true;
    } else {
      const payload = {
        'username': this.loginForm.value.email,
        'password': this.loginForm.value.password
      }

      this.authService.authenticate(payload).subscribe(
        async (response) => {
          // Handle successful authentication
          this.isInvalid = false;
          this.errorMsg = "";
          this.loginForm.reset();

          // Store token in storage
          let token = response.token;
          let refreshToken = response.refreshToken;
          await this.storageService.store(AuthConstants.ACCESS_TOKEN, token);
          await this.storageService.store(AuthConstants.REFRESH_TOKEN, refreshToken);

          // Get user data
          this.authService.fetchCustomerInfo(response.userId, token).subscribe((res) => {
            if (res) {
              this.storageService.store(AuthConstants.CUSTOMER_DATA, res);
              // Redirect user to dashboard
              this.router.navigate(['/customer/dashboard']);
              // loading.dismiss();
            } else {
              // loading.dismiss();
            }
          });
        },
        (error) => {
          // loading.dismiss();
          // Handle authentication error
          this.isInvalid = true;
          this.errorMsg = error.error.message;
          this.errorToastText = "Incorrect email or password"
          this.showErrorToast = true;
        }
      );
    }
  }
}


