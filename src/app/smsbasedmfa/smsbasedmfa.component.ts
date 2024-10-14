import { Component } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { StationService } from '../services/services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-smsbasedmfa',
  templateUrl: './smsbasedmfa.component.html',
  styleUrls: ['./smsbasedmfa.component.css']
})
export class SmsbasedmfaComponent {
  value = "enter your mobile number"
  otp:string=''
  mobileNumber:string=''
  constructor(private services: StationService, private router: Router) {

  }

  verifyOtp() {
    // this.services.VerifyOtp(this.otp,this.mobileNumber).subscribe(
    //   {
    //     next: (response: any) => {
    //       if (response) {
    //         this.router.navigateByUrl("/dashboard")
    //       }
    //     },
    //     error: (error: any)=>{
    //       console.log("got error");
    //     }
    //   }
    // )
  }
}
