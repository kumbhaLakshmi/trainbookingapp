import { Component } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StationService } from './services/services';
import { AuthService } from './AuthService';
import { LoginComponent } from './pages/login/login.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trainbooking';

  constructor(public stationServ: StationService, public authService: AuthService, public loginPage: LoginComponent) {

  }



}
