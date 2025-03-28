import { FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';



export class ValidatorProvider {



  static getValidatorErrorMessage( validatorName: string, validatorValue?: any ) {
    let config = {
      'required': 'Required',
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidEmailAddress': 'Invalid email address',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      'minlength': `Minimum length ${ validatorValue.requiredLength }`,
      'phoneValid': 'Check your phone number',
      'checkPinNumber': 'Check your pin number'
    };
    return config[ validatorName ];
  }
  static creditCardValidator( control ) {
 
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if ( control.value.match( /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/ ) ) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
    /// Pin code Validators /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/
  }
  static phoneNumberValidator( control ) {
    let checkPat = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    let checkedValue = control.value;
    if ( checkPat.test( checkedValue ) ) {
      return null;
    } else {
      return { 'phoneValid': true };
    }
  }
  static passwordValidator( control ) {
    let checkPat = /^[a-zA-Z0-6]/;
    let checkedValue = control.value;
    if ( checkPat.test( checkedValue ) ) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }
  static checkEmpty( control ) {
    let checkPat = /\S/;
    let checkedValue = control.value;
    if ( checkPat.test( checkedValue ) ) {
      return null;
    } else {
      return { 'required': true };
    }
  }
  static checkPincode( control ) {
    let checkPat = /^[0-9]{1,6}$/;
    let checkedValue = control.value;
    if ( checkPat.test( checkedValue ) ) {
      return null;
    } else {
      return { 'checkPinNumber': true };
    }
  }
  static emailValidator( control ) {
    if ( control.value.match( /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ ) ) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }
}