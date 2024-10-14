import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { AdminComponent } from './pages/admin/admin.component';
import { StationService } from './services/services';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HeaderComponent } from './header/header.component'; // Import HttpClientModule
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
// import { MatSidenav } from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './pages/dashboard/dashboard.component';  // Add this line
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { RegisterformComponent } from './pages/registerform/registerform.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoginComponent } from './pages/login/login.component';
import { ModifysearchComponent } from './pages/modifysearch/modifysearch.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LayoutModule } from '@angular/cdk/layout';
// import { AddstationComponent } from './addstation/addstation.component';
import { AddstationComponent } from './pages/addstation/addstation.component';
import { BookticketComponent } from './pages/bookticket/bookticket.component';
// import { StationService } from './services/services';
// import jwt_decode from 'jwt-decode';
// import { LoginComponent } from './pages/login/login.component';
// import {MatMdcDialogData}  from '@angular/material/matdcdi'
// import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
// import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
// import {MatAccordion} from '@angular/material/expansion'
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { MFAComponent } from './mfa/mfa.component';
import { SmsbasedmfaComponent } from './smsbasedmfa/smsbasedmfa.component';
import { JwtInterceptorService } from './jwt-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    AdminComponent,
    DashboardComponent,
    RegisterformComponent,
    LoginComponent,
    ModifysearchComponent,
    AddstationComponent,
    BookticketComponent,
    UserSettingComponent,
    MFAComponent,
    SmsbasedmfaComponent,
  ],
  imports: [
    // MatAccordion,
    MatExpansionModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatStepperModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    LayoutModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [StationService, MFAComponent, SmsbasedmfaComponent, {
    provide: MatDialogRef,
    useValue: {}
  }
    ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true  // Important: This ensures multiple interceptors can be registered
    },
    MatSnackBarConfig],
  bootstrap: [AppComponent]
})
export class AppModule {

}

