import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterformComponent } from './pages/registerform/registerform.component';
import { LoginComponent } from './pages/login/login.component';
import { AddstationComponent } from './pages/addstation/addstation.component';
import { CanActivate } from '@angular/router';
import { RouteGuard } from './services/authrouteguard';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { MFAComponent } from './mfa/mfa.component';
import { SmsbasedmfaComponent } from './smsbasedmfa/smsbasedmfa.component';
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [RouteGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'register', component: RegisterformComponent },
  { path: 'login', component: LoginComponent },
  { path: 'addstation', component: AddstationComponent, canActivate: [RouteGuard] },
  { path: 'usersettings', component: UserSettingComponent },
  { path: 'mfasettings', component: MFAComponent },
  {path: 'smsbasedmfa',component:SmsbasedmfaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
