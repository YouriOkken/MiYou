import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PricingAndTemplatesComponent } from './components/pricing and templates/pricing-and-templates.component';
import { AiDebuggerComponent } from './components/ai/ai-debugger.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'pricing', component: PricingAndTemplatesComponent},
    {path: 'ai', component: AiDebuggerComponent}
];
