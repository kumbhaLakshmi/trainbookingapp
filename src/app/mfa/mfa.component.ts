import { Component } from '@angular/core';
import { MFAService } from '../mfa.service';
import * as QRCode from 'qrcode';  // Import QR code library
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-mfa',
  templateUrl: './mfa.component.html'
})
export class MFAComponent {
  username: string = '';
  qrCodeUrl: string = '';
  qrCodeImage: string = ''; // To store the generated QR code image as a base64 string
  code: number | null = null;
  message: string = '';
  // invalid: boolean = false
  mafValid: boolean = false;
  invalid = new BehaviorSubject<Boolean>(false)
  invalidObj = this.invalid.asObservable()
  constructor(private mfaService: MFAService, private router: Router) {
  }

  generateQR(): void {
    this.mfaService.generateQR(this.username).subscribe(
      (qrUrl) => {
        this.qrCodeUrl = qrUrl;
        this.message = '';
        // Generate the QR code image using the 'qrcode' library
        QRCode.toDataURL(qrUrl, (err, url) => {
          if (!err) {
            this.qrCodeImage = url;
          } else {
            this.message = 'Error generating QR code';
          }
        });
      },
      (error) => {
        this.message = 'Error generating QR code';
        console.log("Error creating image from URL", error);
      }
    );
  }

  verifyCode(): void {
    if (this.code !== null) {
      this.mfaService.verifyCode(this.username, this.code).subscribe(
        (isValid) => {
          this.message = isValid ? 'Verification successful!' : 'Invalid code, try again.'
          console.log("code", this.code);
          console.log("invalid",isValid);
          localStorage.setItem("mfavalid",JSON.stringify(isValid));
          if(isValid){
            console.log("Testing", isValid);
            this.invalid.next(true)
            this.router.navigateByUrl("/dashboard")
          }
        },
        (error) => {
          this.message = 'Error verifying code to verify'
          // this.invalid = true
        }
      );
    }
  }
}
