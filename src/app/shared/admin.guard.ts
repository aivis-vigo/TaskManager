import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  if (!userService.isAuthorized('Admin')) {
    if (state.url === '/user-list' || state.url === '/user-details') {
      router.navigateByUrl('/task-list');
    }
    return false;
  }

  return true;
};
