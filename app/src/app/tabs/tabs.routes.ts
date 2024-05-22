import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from "../guards/auth.guard";
import { CustomerResolver } from "../resolvers/customer.resolver";
import { MealPlanResolver } from '../resolvers/meal-plan.resolver';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
        {
            path: 'dashboard',
            resolve: { customerData: CustomerResolver },
            loadComponent: () => import('./dashboard/dashboard.page').then((m) => m.DashboardPage)
        },
        {
            path: 'meals',
            resolve: { mealPlans: MealPlanResolver },
            loadComponent: () => import('./meals/meals.page').then((m) => m.MealsPage)
        },
        {
            path: 'account-details',
            loadComponent: () => import('./account-details/account-details.page').then((m) => m.AccountDetailsPage)
        },
        {
          path: 'settings',
          loadComponent: () => import('./settings/settings.page').then( m => m.SettingsPage),
          // children: [{
          //     path: 'professional',
          //     loadComponent: () => import('./settings/professional/professional.page').then((m) => m.ProfessionalPage)
          // }]
        },
        {
          path: 'professional',
          resolve: { customerData: CustomerResolver },
          loadComponent: () => import('./settings/professional/professional.page').then((m) => m.ProfessionalPage)
        },
        {
          path: 'profile',
          resolve: { customerData: CustomerResolver },
          loadComponent: () => import('./settings/profile/profile.page').then((m) => m.ProfilePage)
        },
        {
            path: '',
            redirectTo: '/customer/dashboard',
            pathMatch: 'full',
        }
    ]
  }
];
