import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { SignUpPage } from './pages/sign-up/sign-up.page';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password.page';
import { LoginGuard } from './guards/login.guard';
import { RegistrationCompleteComponent } from './pages/registration-complete/registration-complete.component';

export const routes: Routes = [
  { path: '', redirectTo: '/customer/dashboard', pathMatch: 'full' },
  { path: 'login', canActivate: [LoginGuard], component: LoginPage },
  { path: 'forgot-password', component: ForgotPasswordPage },
  { path: 'sign-up', component: SignUpPage },
  { path: 'registration-complete', component: RegistrationCompleteComponent},
  { path: 'customer', loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes)}
];
