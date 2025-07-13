import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PricingAndTemplatesComponent } from './components/pricing and templates/pricing-and-templates.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'pricing', component: PricingAndTemplatesComponent}
];
