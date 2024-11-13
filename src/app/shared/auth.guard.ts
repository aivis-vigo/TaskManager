import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const token = userService.getAuthToken();

  if (!token) {
    /* if user is not logged in and tries to go somewhere where authorization is needed he is not allowed */
    if (state.url !== '/login') {
      router.navigateByUrl('/login');
      return false;
    }
    /* only thing allowed is to go login page */
    return true;
  }

  /* authorized user is not allowed to authorize again */
  if (state.url === '/login') {
    router.navigateByUrl('/task-list');
    return false;
  }

  return true;
};
