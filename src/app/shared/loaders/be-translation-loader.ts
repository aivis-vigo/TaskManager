import {TranslateLoader} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export class BackendTranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient, private apiEndpoint: string) {
  }

  getTranslation(lang: string): Observable<any> {
    return this.http.get<any>(`${this.apiEndpoint}/translations/${lang}`);
  }
}
