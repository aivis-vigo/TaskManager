import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";

export const accessInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const token = userService.getAuthToken();

  const request = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    }
  })

  return next(request);
};
