import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isAuthenticated().pipe(
    take(1),
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      }

      router.navigate(['/login']);
      return false;
    })
  );
}; 