import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DemosComponent } from './components/demos/demos.component';
import { Demo1Component } from './components/demos/demo1/demo1.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'demos', component: DemosComponent},
    {path: 'demos/demo1', component: Demo1Component}
];
