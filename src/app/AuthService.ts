// auth.service.ts
import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Router } from '@angular/router';
import { MFAService } from './mfa.service';
import { MFAComponent } from './mfa/mfa.component';
// interface DecodedToken {
//   sub: string;
//   role: string;
//   exp: number;
//   // Add other fields as per your token structure
// }
interface CustomJwtPayload extends JwtPayload {
  role: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private userRole: string | null = null;
  private statusMfa: string = "MFA_REQUIRED"
  private baseUrl = "http://10.175.1.63:8080/api/mfa"
  constructor(private router: Router, private mfaService: MFAService, private mfaComponent: MFAComponent) { }

  setToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
    this.decodeToken();
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  isLogged(): boolean {
    const token = this.getToken();
    if (token) {

      if (this.statusMfa === 'MFA_REQUIRED') {
        // Navigate to MFA verification screen
        // this.router.navigateByUrl('/usersettings')
      } else {
        // Handle successful login
      }
      return true
    }
    return false
  }

  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      // Explicit type assertion or require syntax may be needed here
      //   const decoded = jwt_decode(token) as DecodedToken;
      const decoded = jwtDecode(token);
      const decodedHeader = jwtDecode(token, { header: true });
      console.log("DDDDDDDDDDDDDDDDDDDDDDDD", decodedHeader);
      return decodedHeader
      //   this.userRole = decoded.role;
    }
  }

  role: string = ''
  isAdminORNot(): boolean {
    const token = this.getToken();
    if (token) {
      // const decoded = jwtDecode(token);
      const decoded = jwtDecode<CustomJwtPayload>(token);
      this.role = decoded?.role;
      if (this.role === 'admin') {
        return true;
      }
      return false
    }
    return false
  }

  getRole(): string | null {
    if (!this.userRole) {
      this.decodeToken();
    }
    return this.userRole;
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isUser(): boolean {
    return this.getRole() === 'user';
  }

  deleteSessionToken(): void {
    console.log("deleting the session storage");
    sessionStorage.removeItem(this.tokenKey);
    this.userRole = null;
    localStorage.removeItem('mfavalid')
    this.router.navigate(['/login']);
  }

  // Add other methods as needed
  mfaValid(): boolean {
    let value = false
    this.mfaComponent.invalidObj.subscribe(value => {
      if (value) {
        value = true
        console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL", value)
      }
    })
    return value
  }

}
