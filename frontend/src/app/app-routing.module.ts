import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'projects/:id', component: DashboardComponent },
  { path: '**',   redirectTo: 'projects/1', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
