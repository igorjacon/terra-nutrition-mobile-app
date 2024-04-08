import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { SignUpPage } from './pages/sign-up/sign-up.page';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password.page';
import { LoginGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/customer/dashboard', pathMatch: 'full' },
  { path: 'login', canActivate: [LoginGuard], component: LoginPage },
  { path: 'customer', loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes)},
  { path: 'forgot-password', component: ForgotPasswordPage },
  { path: 'sign-up', component: SignUpPage },
];
