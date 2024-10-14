import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token from localStorage or sessionStorage (wherever you're storing it)
    const token = sessionStorage.getItem('authToken');  // or sessionStorage.getItem('authToken')
    console.log("BBBBBBBBBBBBBBBBBBBjwtinterceptor", token);

    // If the token exists, clone the request and attach the token in the Authorization header
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Pass the request to the next handler
    return next.handle(request);
  }
}
