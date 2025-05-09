import { isPlatformBrowser } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  
  const user = sessionStorage.getItem('user-name')

  if(!user) {
    router.navigate([""]);

    return false
  }

  return true;
};
