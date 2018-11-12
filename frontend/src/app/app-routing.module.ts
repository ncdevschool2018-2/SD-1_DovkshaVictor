import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TaskcontrolComponent} from "./taskcontrol/taskcontrol.component";

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard/:project_id/:page', component: DashboardComponent },
  { path:'task/:task_id', component: TaskcontrolComponent },
  { path: '**',   redirectTo: 'dashboard/1/1', pathMatch: 'full'},
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
