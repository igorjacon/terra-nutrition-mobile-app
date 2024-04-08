import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from "../guards/auth.guard";
import { UserDataResolver } from "../resolvers/userData.resolver";

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
        {
            path: 'dashboard',
            resolve: { userData: UserDataResolver },
            loadComponent: () => import('./dashboard/dashboard.page').then((m) => m.DashboardPage)
        },
        {
            path: 'meals',
            loadComponent: () => import('./meals/meals.page').then((m) => m.MealsPage)
        },
        {
            path: 'account-details',
            loadComponent: () => import('./account-details/account-details.page').then((m) => m.AccountDetailsPage)
        },
        {
          path: 'settings',
          loadComponent: () => import('./settings/settings.page').then( m => m.SettingsPage)
        },
        {
            path: '',
            redirectTo: '/customer/dashboard',
            pathMatch: 'full',
        }
    ]
  }
];
