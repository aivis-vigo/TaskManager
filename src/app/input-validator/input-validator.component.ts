import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";

@Component({
  selector: 'app-input-validator',
  standalone: true,
  templateUrl: './input-validator.component.html',
  styleUrl: './input-validator.component.scss'
})
export class InputValidatorComponent {
  @Input() property: AbstractControl | null = new FormControl('');
  @Input() minLength: number = 0;

  get isInvalid(): boolean {
    return (this.property?.invalid && this.property?.touched) ?? false;
  }

  get hasMinLengthError(): boolean {
    return (this.property?.hasError('minlength') && this.minLength > 0) ?? false;
  }
}
