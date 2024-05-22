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
            // resolve: { mealPlans: MealPlanResolver },
            loadComponent: () => import('./meals/meals.page').then((m) => m.MealsPage)
        },
        {
            path: 'recipes',
            loadComponent: () => import('./recipes/recipes.page').then((m) => m.RecipesPage)
        },
        {
            path: 'settings',
            loadComponent: () => import('./settings/settings.page').then( m => m.SettingsPage),
        },
        {
            path: 'settings/professional',
            resolve: { customerData: CustomerResolver },
            loadComponent: () => import('./settings/professional/professional.page').then((m) => m.ProfessionalPage)
        },
        {
            path: 'settings/profile',
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
