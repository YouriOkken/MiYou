import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PricingAndTemplatesComponent } from './components/pricing and templates/pricing-and-templates.component';
import { CookiesComponent } from './components/cookies/cookies.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'pricing', component: PricingAndTemplatesComponent},
    {path: 'cookies', component: CookiesComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: '**', component: NotFoundComponent} // MOET ALS LAATSTE
];
