import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MFAService {
  private baseUrl = 'http://localhost:8080/api/mfa';

  constructor(private http: HttpClient) {}

  generateQR(username: string): Observable<string> {
    return this.http.get(`${this.baseUrl}/generateQR?username=${username}`, { responseType: 'text' });
  }

  verifyCode(username: string, code: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/verify?username=${username}&&code=${code}`, { responseType: 'text'});
  }
}
