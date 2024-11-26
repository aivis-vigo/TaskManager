import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserStore} from "../user.store";

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userStore = inject(UserStore);

  if (!userStore.isAuthorized('Admin')) {
    if (state.url === '/user-list' || state.url === '/user-details') {
      router.navigateByUrl('/task-list');
    }
    return false;
  }

  return true;
};
