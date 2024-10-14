import { Component, Inject, Injectable } from '@angular/core';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { StationService } from 'src/app/services/services';
import { AuthService } from 'src/app/AuthService';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Router } from '@angular/router';
import { SmsbasedmfaComponent } from 'src/app/smsbasedmfa/smsbasedmfa.component';
import { interval, Subscription } from 'rxjs';

// Extend JwtPayload to include role
interface CustomJwtPayload extends JwtPayload {
  role: string;
}

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  minutes: number = 1
  invalidOtp: boolean = false
  disableButton: boolean = false
  timer: number = 120;
  seconds: number = 60
  timerSubscription?: Subscription;
  otp: string = ""
  toggle: boolean = false
  role: string = ''
  login: boolean = true
  loginFormFields = this.formbuilder.group({
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
    password: ['', [Validators.required]]
  })
  loginData: { email: string, password: string } = {
    email: "",
    password: ""
  }
  constructor(public formbuilder: FormBuilder, public stationserv: StationService,
    public authService: AuthService, private router: Router, private smsbasedmfa: SmsbasedmfaComponent) {
  }
  resendOpt() {
    this.stationserv.login(this.loginData).subscribe(
      {
        next: (response) => {
          this.startTimer()
          this.toggle = true
        },
        error: (error) => {
          console.log("got error", error);
          this.startTimer()
          this.toggle = true
          this.disableButton = false
        }
      }
    )
  }
  startTimer(): void {
    // Starts an interval observable that emits values every second (1000ms)
    this.timerSubscription = interval(1000).subscribe(() => {
      this.timer--; // Increment the timer value by 1 every second
      console.log("***************this is timer checking");
      this.seconds--
      if (this.timer <= 0) { // Check if the timer has reached 120 seconds
        this.invalidOtp = false
        this.disableButton = true
        this.stopTimer(); // Stop the timer
        console.log('Timer has stopped at 120 seconds.')
        this.otp = ""
      }
      if (this.timer == 60) {
        this.minutes = 0
        this.seconds = 60

      }
      if (this.timer == 120) {
        this.minutes = 1
        this.seconds = 60
      }
    });
  }
  stopTimer(): void {
    // Unsubscribes from the interval observable to stop the timer
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.minutes = 1
      this.timer = 120
      this.seconds = 60
    }
  }

  onSubmit1() {
    console.log("****************", this.loginFormFields.value);
  }

  // loginSubmit() {
  //   console.log("logindata", this.loginFormFields.value);
  //   let loginData = {
  //     email: this.loginFormFields.get('email')?.value,
  //     password: this.loginFormFields.get('password')?.value
  //   }
  //   this.stationserv.login(loginData).subscribe((data) => {
  //     console.log("backenddata login component", data);
  //     sessionStorage.setItem('Authtoken', data)
  //     console.log("*******************************************authtoken", sessionStorage.getItem('Authtoken'));
  //   })
  // }
  loginSubmit() {
    // console.log("logindata", this.loginFormFields.value);
    this.loginData = {
      email: this.loginFormFields.get('email')?.value || '',
      password: this.loginFormFields.get('password')?.value || ''
    };
    this.stationserv.login(this.loginData).subscribe({
      next: (data: any) => {
        console.log("backenddata login component", data);
        // Check if the response contains the token in the expected format
        // if (data.token) {
        //   sessionStorage.setItem('AuthToken', data.token);
        //   console.log("AuthToken stored in session storage", sessionStorage.getItem('AuthToken'));
        //   const decoded = jwtDecode(data.token);
        //   const decodedHeader = jwtDecode(data.token, { header: true });
        //   // this.router.navigateByUrl("/usersettings")
        //   // this.router.navigateByUrl("/smsbasedmfa")
        //   // let decodedValue=this.authService.decodeToken()
        //   console.log("decode2222222222222222", decoded);
        //   console.log("11111111111111111111111decodeedheadervalue", decodedHeader);
        // } else {
        //   console.error("Token not found in the response:", data);
        // }
        this.toggle = true
        // this.startTimer();
      },
      error: (error: any) => {
        //   // Handling the specific case where the token is in error.text
        //   if (error.status === 200 && error.error && error.error.text) {
        //     sessionStorage.setItem('AuthToken', error.error.text);
        //     console.log("AuthToken stored in session storage from error response", sessionStorage.getItem('AuthToken'));
        //     // const decoded = jwtDecode(error.error.text);
        //     const decoded = jwtDecode<CustomJwtPayload>(error.error.text);
        //     const decodedHeader = jwtDecode(error.error.text, { header: true });
        //     // const payload = jwtDecode<JwtPayload>(error.error.text); // Returns with the JwtPayload type
        //     // let decodedValue=this.authService.decodeToken()
        //     this.role = decoded?.role;
        //     console.log("decode2222222222222222", decoded);
        //     console.log("11111111111111111111111role", this.role);
        //     // this.router.navigateByUrl('/dashboard');
        //     // this.router.navigateByUrl("/mfasettings")
        //     this.toggle=true
        //     // this.router.navigateByUrl("/smsbasedmfa")
        //     // if (this.role == 'admin') {
        //     //   this.router.navigateByUrl('/addstation');
        //     // }
        //     // else {
        //     //   this.router.navigateByUrl('/dashboard');
        //     // }
        //     // console.log("########################payload decoded",payload);
        //   } else {
        //     console.error("Error during login:", error);
        //   }
        this.toggle = true
        console.log("this is errror from the login");
        this.startTimer()
      }
    });
  }

  verifyOtp(): void {
    this.stationserv.VerifyOtp(this.loginData.email, this.otp, this.login).subscribe(
      {
        next: data => {
          if (data.AuthToken) {
            this.stopTimer()
            console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGG token check");
            sessionStorage.setItem('authToken', data.AuthToken);
            this.router.navigateByUrl("/dashboard")
            console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
          }
        },
        error: error => {
          console.log("during verify got error", error);
          this.invalidOtp = true
          // this.disableButton = true
        }
      }
    )
  }

}
