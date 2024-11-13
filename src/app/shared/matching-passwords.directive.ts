import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function matchingPasswordsValidator(otherFieldName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = (control.parent);

    if (!formGroup) {
      return null;
    }

    const otherField = formGroup.get(otherFieldName);

    if (!otherField) {
      return null;
    }

    const matching = control.value === otherField.value;
    return matching ? null : {passwordDoNotMatch: true};
  };
}
