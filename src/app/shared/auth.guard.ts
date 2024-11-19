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

  if (!userService.isAuthorized('Admin')) {
    if (state.url !== '/task-list' && !state.url.startsWith('/task-list/')) {
      router.navigateByUrl('/task-list');
      return false;
    }
  }

  return true;
};
