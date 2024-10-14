import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { RegisterDetails } from 'src/app/models/station';
import { StationService } from 'src/app/services/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { showError: true },
  }]
})

export class RegisterformComponent implements OnInit {
  registerDetails: RegisterDetails = {
    email: '',
    password: '',
    name: '',
    mobileNumber: '',
    hometown: '',
    state: ''
    // mobile:0,
  }
  login:boolean=false;
  change: boolean = false
  value: string = '0';
  otp: string = ''
  firstFormGroup = this._formBuilder.group({
    // firstCtrl: ['', Validators.required],
    emailCtrl: ['',
      [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]
    ],
    passwordCtrl: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    nameCtrl: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$')]],
    mobileCtrl: ['',
      [Validators.required, Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')]
    ],
  });
  thirdFormGroup = this._formBuilder.group({

    homeTownCtrl: ['',
      [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$')]
    ],
    stateCtrl: ['',
      [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$')]
    ],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private stationserv: StationService, private _snackBar: MatSnackBar, public router: Router) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  formSubmit(): void {
    console.log("firstformdetails", this.firstFormGroup.value);
    console.log("secondformdetails", this.secondFormGroup.value);
    console.log("thirdformdetails", this.thirdFormGroup.value);
    this.registerDetails = {
      email: this.firstFormGroup.get('emailCtrl')?.value || "",
      password: this.firstFormGroup.get('passwordCtrl')?.value || "",
      name: this.secondFormGroup.get('nameCtrl')?.value || '',
      mobileNumber: this.secondFormGroup.get('mobileCtrl')?.value || "",
      hometown: this.thirdFormGroup.get('homeTownCtrl')?.value || "",
      state: this.thirdFormGroup.get('stateCtrl')?.value || "",
      // mobile:this.thirdFormGroup.get('mobileCtrl')?.value  || 0
    }
    console.log("registerdetails", this.registerDetails);
    //  var data=JSON.stringify(this.registerDetails)
    this.stationserv.postRegisterDetails(this.registerDetails).subscribe((data) => {
      console.log("backenddata", data);
      // this.openSnackBar("sucessfully posted", "ok")
      // this.openSnackBar(data.response);
    })
    // this.router.navigateByUrl('/login')
    this.change = true
  }
  ngOnInit(): void {
    console.log("formdetails", this.firstFormGroup.get('emailCtrl')?.value);
  }
  verifyOtp() {
    this.stationserv.VerifyOtp(this.registerDetails.email, this.otp,this.login).subscribe(
      {
        next: (response: any) => {
          console.log("verifyresult");  
          if (response) {
            this.router.navigateByUrl("/login")
          }
        },
        error: (error: any) => {
          console.log("got error");
        }
      }
    )
  }
}




