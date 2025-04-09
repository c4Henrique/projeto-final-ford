import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    pathMatch: 'full',
    loadComponent: () => {
      return import("./auth/auth.component").then((m) => m.AuthComponent)
    }
  }
];
