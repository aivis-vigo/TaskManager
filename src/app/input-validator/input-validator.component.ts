import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";

@Component({
  selector: 'app-input-validator',
  standalone: true,
  templateUrl: './input-validator.component.html',
  styleUrl: './input-validator.component.scss'
})
export class InputValidatorComponent {
  @Input() property: AbstractControl = new FormControl('');
  @Input() minLength: number = 0;
}
