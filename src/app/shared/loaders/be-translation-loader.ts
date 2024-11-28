import {TranslateLoader} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {TranslationModel} from "../models/translation.model";

export class BackendTranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient, private apiEndpoint: string) {
  }

  getTranslation(lang: string): Observable<any> {
    return this.http.get<TranslationModel>(`${this.apiEndpoint}/translations/${lang}`);
  }
}
