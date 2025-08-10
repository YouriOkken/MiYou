import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PricingAndTemplatesComponent } from './components/pricing and templates/pricing-and-templates.component';
import { CookiesComponent } from './components/cookies/cookies.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { LoginComponent } from './components/admin/login/login.component';
import { AuthGuard } from './utilities/guards/auth.guard';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { AdminDashboardComponent } from './components/admin/dashboard/admin-dashboard.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'pricing', component: PricingAndTemplatesComponent},
    {path: 'cookies', component: CookiesComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'admin/login', component: LoginComponent},
    {path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]},
    {path: 'terms-of-service', component: TermsOfServiceComponent},
    {path: '**', component: NotFoundComponent} // MOET ALS LAATSTE
];
