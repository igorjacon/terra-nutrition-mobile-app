import { Routes } from '@angular/router';
import { TabsComponent } from './tabs.component';
import { AuthGuard } from '../guards/auth.guard';
import { UserDataResolver } from '../resolvers/userData.resolver';

export const routes: Routes = [
    {
      path: '',
      component: TabsComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: 'dashboard',
          resolve: { userData: UserDataResolver },
          loadComponent: () => import('../pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
        },
        // {
        //   path: 'tab2',
        // //   loadComponent: () => import('../tab2/tab2.page').then((m) => m.Tab2Page),
        // },
        // {
        //   path: 'tab3',
        // //   loadComponent: () => import('../tab3/tab3.page').then((m) => m.Tab3Page),
        // },
        // {
        //   path: 'create',
        // //   loadComponent: () => import('../create/create.page').then((m) => m.CreatePage),
        // },
        {
          path: 'settings',
          loadComponent: () => import('../pages/settings/settings.page').then( m => m.SettingsPage)
        },
      ],
    },
    {
      path: '',
      redirectTo: '/customer/dashboard',
      pathMatch: 'full',
    },
  ];