import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-form-submit-button',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './form-submit-button.component.html',
  styleUrl: './form-submit-button.component.scss'
})
export class FormSubmitButtonComponent {
  @Input() formIsValid: boolean = false;
  @Input() text: string = ''
}
