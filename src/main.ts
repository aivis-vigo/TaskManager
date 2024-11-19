import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter} from '@angular/router';
import {routes} from "./app/app.routes";
import {HttpClient, provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {accessInterceptor} from "./app/shared/access.interceptor";
import {provideTranslateService, TranslateLoader} from "@ngx-translate/core";
import {BackendTranslationLoader} from "./app/be-translation-loader";
import {environment} from "./environments/enviornment";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([accessInterceptor])
    ),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new BackendTranslationLoader(http, environment.apiEndpoint),
        deps: [HttpClient],
      },
    })
  ]
}).catch(err => console.error(err));
