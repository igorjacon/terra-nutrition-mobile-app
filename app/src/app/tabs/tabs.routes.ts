import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
        {
            path: 'dashboard',
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
            path: '',
            redirectTo: '/tabs/dashboard',
            pathMatch: 'full',
        }
    ]
  }
];
