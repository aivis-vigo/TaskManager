import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate: TranslateService) {
    this.initializeTranslation();
  }

  initializeTranslation(): void {
    this.translate.addLangs(['en', 'lv']);
    this.translate.setDefaultLang('lv');
    this.translate.use('lv');
  }

  changeLanguage(language: EventTarget | null): void {
    if (language) {
      const currentLanguage = (language as HTMLInputElement).value;
      if (this.translate.getLangs().includes(currentLanguage)) {
        this.translate.use(currentLanguage);
      }
    }
  }
}
