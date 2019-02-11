import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
	{ path: 'fastpasses', loadChildren: './fastpasses/fastpass.module#FastpassModule' },
	{ path: '', component: DashboardComponent },
	{ path: '**', redirectTo: '' }
];

@NgModule({
	exports: [ RouterModule ],
	imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }