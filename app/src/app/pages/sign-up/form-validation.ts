import { AbstractControl, ValidationErrors } from "@angular/forms";

//uses regex to ensure password has at least: 1 upper case, 1 lower case, 8 length
export const passwordRegexStrong =  /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z]{8,}$/;
//checks for valid email, not perfect, but proviodes some feedback to the user to ensure their email is correct
export const emailRegex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const passwordMatchValidator = (control: AbstractControl): ValidationErrors | null => {
    let password = control.get('password');
    let confirmPassword = control.get('confirmPassword');
    if(password?.value != confirmPassword?.value) return {passwordmatcherror: true};
    return null;
}

export const emailValidator = (control: AbstractControl): ValidationErrors | null => {
    let email = control.get('email');
    if(!emailRegex.test(email?.value)) return {invalidemailerror: true};
    return null;
}

export const passwordStrengthValidator = (control: AbstractControl): ValidationErrors | null => {
    let password = control.get('password');
    if(!passwordRegexStrong.test(password?.value)) return {passwordstrengtherror: true}
    return null;
}