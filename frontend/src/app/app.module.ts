import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProjectService} from "./service/project.service";
import {TaskService} from "./service/task.service";
import {AuthService} from "./service/auth.service"
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './token.interceptor';
import {UserService} from "./service/user.service";
import {TimesPipe} from "./pipes/times";
import {TaskcontrolComponent} from "./taskcontrol/taskcontrol.component";
import {NavbarComponent } from './navbar/navbar.component';
import {PriorityPipe} from "./pipes/priority_pipe";
import {StatusPipe} from "./pipes/status_pipe";
import { UserpageComponent } from './userpage/userpage.component';
import {RolePipe} from "./pipes/role_pipe";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    TaskcontrolComponent,
    UserpageComponent,
    TimesPipe,
    PriorityPipe,
    StatusPipe,
    RolePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    ProjectService,
    TaskService,
    UserService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
