import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authguardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router: Router = inject(Router);
  if (localStorage.getItem('token')) {
      return true
    } 
    else {
      return router.createUrlTree(['/auth']);
    }
};

export const loginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router: Router = inject(Router);
  if (localStorage.getItem('token')) {
      return router.createUrlTree(['/todo/list'])
    } 
    else {
      return true;
    }
};
