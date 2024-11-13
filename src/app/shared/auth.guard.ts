import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const token = userService.getAuthToken();

  if (!token) {
    if (state.url === '/login' || state.url === '/register') {
      return true;
    }

    router.navigateByUrl('/login');
    return false;
  }

  if (state.url === '/login' || state.url === '/register') {
    router.navigateByUrl('/task-list');
    return false;
  }

  return true;
};
