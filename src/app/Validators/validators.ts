import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static arrayMinLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value || !Array.isArray(value) || value.length < min) {
        return { arrayMinLength: { requiredLength: min, actualLength: value?.length || 0 } };
      }
      return null;
    };
  }

  static atLeastOneSelected(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    // console.log('Validator called with value:', value);
    if (!value || value.length === 0) {
      return { atLeastOneRequired: true };
    }
    return null;
  }

  // Add more custom validators as needed
}