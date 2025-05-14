import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import("./auth/auth.component").then((m) => m.AuthComponent)
    }
  },
  {
    path: 'home',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () => {
      return import("./home/home.component").then((m) => m.HomeComponent)
    }
  },
  {
    path: 'vehicle',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () => {
      return import("./dashboard/dashboard.component").then((m) => m.DashboardComponent)
    }
  },
];
