import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './component/registration/registration.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './session/auth.guard';
import { StoplightDetailsComponent } from './component/dashboard/stoplight-details/stoplight-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'stoplight/:id', component: StoplightDetailsComponent }
  // Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
