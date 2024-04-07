import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  passwordMatchValidator
  emailValidator
  passwordStrengthValidator

  //uses regex to ensure password has at least: 1 upper case, 1 lower case, 8 length
 passwordRegexStrong =  /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z]{8,}$/;
 //checks for valid email, not perfect, but proviodes some feedback to the user to ensure their email is correct
 emailRegex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor() { 
    this.passwordMatchValidator = (control: AbstractControl): ValidationErrors | null => {
      let password = control.get('password');
      let confirmPassword = control.get('confirmPassword');
      if(password?.value != confirmPassword?.value) return {passwordmatcherror: true};
      return null;
    }

    this.emailValidator= (control: AbstractControl): ValidationErrors | null => {
      let email = control.get('email');
      if(!this.emailRegex.test(email?.value)) return {invalidemailerror: true};
      return null;
  }

  this.passwordStrengthValidator = (control: AbstractControl): ValidationErrors | null => {
    let password = control.get('password');
    if(!this.passwordRegexStrong.test(password?.value)) return {passwordstrengtherror: true}
    return null;
}

  }
}
