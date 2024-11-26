import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter} from '@angular/router';
import {routes} from "./app/app.routes";
import {HttpClient, provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {accessInterceptor} from "./app/shared/interceptors/access.interceptor";
import {provideTranslateService, TranslateLoader} from "@ngx-translate/core";
import {BackendTranslationLoader} from "./app/shared/loaders/be-translation-loader";
import {environment} from "./environments/enviornment";
import {provideStore} from "@ngrx/store";
import {loginReducer} from "./app/features/login/login.reducers";
import {provideEffects} from "@ngrx/effects";
import {LoginEffects} from "./app/features/login/login.effects";
import {taskReducer} from "./app/shared/reducers/list.reducers";
import {TaskListEffects} from "./app/shared/effects/list.effects";
import {userReducer} from "./app/shared/reducers/user.reducers";
import {UserEffects} from "./app/shared/effects/user.effects";
import {RoleEffects} from "./app/shared/effects/role.effects";
import {roleReducer} from "./app/shared/reducers/role.reducers";

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
    }),
    provideStore({
      login: loginReducer,
      tasks: taskReducer,
      users: userReducer,
      roles: roleReducer,
    }),
    provideEffects(
      LoginEffects,
      TaskListEffects,
      UserEffects,
      RoleEffects,
    ),
  ]
}).catch(err => console.error(err));
