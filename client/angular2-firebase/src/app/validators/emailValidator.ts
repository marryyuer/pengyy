import { FormControl } from '@angular/forms';

export class EmailValidator {

  static isValid(control: FormControl) {
    const regx = /^\w+@[0-9a-zA-Z_.]+?\.[a-zA-Z]{2,3}$/.test(control.value);

    if (regx || !control.value) {
      return null;
    }

    return {
      'invalidEmail': true
    };

  }
}