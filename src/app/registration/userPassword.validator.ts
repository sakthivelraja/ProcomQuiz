import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';


function validatePassword() : ValidatorFn {
  return (c: AbstractControl) => {
    if(!isNullOrUndefined(c.value)) {
        //Minimum eight characters, at least one uppercase letter, one number and one special character
        var regExPassword = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
        if(regExPassword.test(c.value)) {
            //If password is valid
            return null;
        }
        else {
            //If password is invalid
            return {
                userPasswordValidator: {
                    valid: false
                }
            };
        }
    }
  }
}


@Directive({
  selector: '[userPasswordValidator][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: UserPasswordValidator, multi: true }
  ]
})
export class UserPasswordValidator implements Validator {
  validator: ValidatorFn;
  
  constructor() {
    this.validator = validatePassword();
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }
  
}