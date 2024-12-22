import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-form-submit-button',
  standalone: true,
  imports: [
    NgClass,
    TranslatePipe
  ],
  templateUrl: './form-submit-button.component.html',
  styleUrl: './form-submit-button.component.scss'
})
export class FormSubmitButtonComponent {
  @Input() formIsValid: boolean = false;
  @Input() text: string = ''
}
