import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoplightCreateComponent } from './component/dashboard/stoplight-create/stoplight-create.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthInterceptor } from './session/auth.interceptor';
import { StoplightListComponent } from './component/dashboard/stoplight-list/stoplight-list.component';
import { StoplightDetailsComponent } from './component/dashboard/stoplight-details/stoplight-details.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    StoplightCreateComponent,
    DashboardComponent,
    StoplightListComponent,
    StoplightDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
