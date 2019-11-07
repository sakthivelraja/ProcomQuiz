import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';


function validateUserName() : ValidatorFn {
  return (c: AbstractControl) => {
    if(!isNullOrUndefined(c.value)) {
        if(c.value.search("@") != -1) {
            //If email contains @ symbol
            return null;
        }
        else {
            //If email does not contain @ symbol
            return {
                userNameValidator: {
                    valid: false
                }
            };
        }
    }
  }
}


@Directive({
  selector: '[userNameValidator][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: UserNameValidator, multi: true }
  ]
})
export class UserNameValidator implements Validator {
  validator: ValidatorFn;
  
  constructor() {
    this.validator = validateUserName();
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }
  
}