import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserStore} from "../user.store";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userStore = inject(UserStore);
  const token = userStore.token();

  console.log(token);

  if (!token) {
    if (state.url === '/login' || state.url === '/register') {
      return true;
    }

    router.navigateByUrl('/login');
    return false;
  }

  if (!userStore.isAuthorized('Admin')) {
    if (state.url !== '/task-list' && !state.url.startsWith('/task-list/')) {
      router.navigateByUrl('/task-list');
      return false;
    }
  }

  return true;
};
