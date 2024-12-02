import {Component, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {UserService} from "./services/user.service";
import {TranslateDirective, TranslatePipe} from "@ngx-translate/core";
import {LanguageService} from "./services/language.service";
import {FormsModule} from "@angular/forms";
import {UserStore} from "./shared/user.store";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    TranslateDirective,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  readonly userStore = inject(UserStore);

  constructor(protected userService: UserService, protected languageService: LanguageService) {
  }

}
