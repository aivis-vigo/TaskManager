import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  defaultLanguage: string = 'en';
  languageKey = 'language';

  constructor(private translate: TranslateService) {
    this.initializeTranslation();
  }

  initializeTranslation(): void {
    const lang = localStorage.getItem(this.languageKey);
    const initialLanguage = lang ?? this.defaultLanguage;

    this.translate.addLangs(['en', 'lv']);
    this.translate.setDefaultLang(this.defaultLanguage);
    this.translate.use(initialLanguage);
  }

  changeLanguage(language: EventTarget | null): void {
    if (language) {
      const currentLanguage = (language as HTMLInputElement).value;
      if (this.translate.getLangs().includes(currentLanguage)) {
        this.translate.use(currentLanguage);
        localStorage.setItem(this.languageKey, currentLanguage);
      }
    }
  }
}
