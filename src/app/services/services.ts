import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { CONSTANT } from '../constant/constant';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IsStation, RegisterDetails, StationList } from '../models/station';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  apis: string;
  constructor(private http: HttpClient) {
    this.apis = environment.Apis;
  }
  getAllStations(): Observable<any[]> {
    const url = `${this.apis}${CONSTANT.EndPoinds.GetAllStations}`;
    return this.http.get<any[]>(url)
      .pipe(
        catchError((error) => {
          console.error('Error fetching stations', error);
          throw error;
        })
      );  
  }
  // postRegisterDetails(registerDetails:RegisterDetails):Observable<any>{
  //   console.log(registerDetails);
  //   return     this.http.post(this.apis+CONSTANT.EndPoinds.PostRegisterDetails,{
  //         body:JSON.stringify(registerDetails),
  //         headers: new HttpHeaders({
  //           'Content-Type': 'application/json'
  //       })
  //        })
  // }
  postRegisterDetails(registerDetails: RegisterDetails): Observable<any> {
    console.log(registerDetails);
    return this.http.post(this.apis + CONSTANT.EndPoinds.PostRegisterDetails, registerDetails, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  login(logindata: any): Observable<any> {
    console.log("service logindata", logindata);
    return this.http.post(this.apis + CONSTANT.EndPoinds.Login, logindata, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  filterStations(filterdata: {}): Observable<any> {
    console.log("FIlterdata", filterdata);
    return this.http.post(this.apis + CONSTANT.EndPoinds.FilterStations, filterdata, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }


  passengerBookTickets(passengerBookingDetails: any): Observable<any> {
    console.log("CCCCCCCCCCCCCCCCCCCCCCC", passengerBookingDetails);
    return this.http.post(this.apis + CONSTANT.EndPoinds.PassengerBookTickets, passengerBookingDetails, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  getSessionToken(): boolean {
    let token = sessionStorage.getItem('authToken');
    if (token)
      return true;
    else return false;
  }
  deleteSessionToken(): void {
    let token = sessionStorage.removeItem('AuthToken')
  }
  // getStationResults():Observable<any>{
  //   return this.http.get(this.apis+CONSTANT.EndPoinds.GetStationResults)
  // }
  // getStationSearchResults():Observable<any>{
  //   return this.http.get(this.apis+CONSTANT.EndPoinds.GetStationSearchResults)
  // }

  // createJourneyStations(journeyDetails: {}): Observable<any> {
  //   return this.http.post(this.apis + CONSTANT.EndPoinds.CreateJourneyStations,journeyDetails, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   })
  // }
  createJourneyStations(addstationdata: any): Observable<any> {
    console.log("service addstationdata", addstationdata);
    return this.http.post(this.apis + CONSTANT.EndPoinds.CreateJourneyStations, addstationdata, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  // getSearchResults(fromStation: string): Observable<any> {
  //   return this.http.get(this.apis + CONSTANT.EndPoinds.SearchIncludes(fromStation), {
  //     headers: new HttpHeaders({
  //       'content-Type': 'application/json'
  //     })
  //   })
  // }

  // In your service
  getSearchResults(value: string): Observable<string[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(this.apis + CONSTANT.EndPoinds.SearchIncludes(value), { headers }).pipe(
      map((data: any[]) => {
        // Extract unique boardingStation names after converting to lowercase
        // const uniqueStationsSet = new Set<string>();
        // data.forEach((obj: any) => {
        //   uniqueStationsSet.add(obj.boardingStation.toLowerCase());
        // });
        // const uniqueStationsArray = Array.from(uniqueStationsSet);
        // return uniqueStationsArray;
        return data
      }),
      catchError(this.handleError)
    );
  }

  getSearchResultsToStation(value: string): Observable<string[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<any[]>(this.apis + CONSTANT.EndPoinds.SearchIncludesToStation(value), { headers }).pipe(
      map((data: any[]) => {
        // Extract unique boardingStation names after converting to lowercase
        // const uniqueStationsSet = new Set<string>();
        // data.forEach((obj: any) => {
        //   uniqueStationsSet.add(obj.boardingStation.toLowerCase());
        // });
        // const uniqueStationsArray = Array.from(uniqueStationsSet);
        // return uniqueStationsArray;
        return data
      }),
      catchError(this.handleError)
    );
  }

  addAllPassengers(passengers: any[]): Observable<any> {
    console.log("passengers", passengers);

    return this.http.post(this.apis + CONSTANT.EndPoinds.AddAllPassengers, passengers, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })

  }





  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      // Server-side error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  getTiers(): Observable<any> {
    return this.http.get(this.apis + CONSTANT.EndPoinds.GetTiers, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }


  VerifyOtp(email: string, otp: string,login:boolean): Observable<any> {
    // Construct the URL with query parameters
    const url = `${this.apis}${CONSTANT.EndPoinds.VerifyOpt}?email=${email}&otp=${otp}&login=${login}`;
    // Make a POST request to the URL
    return this.http.get(url); // Assuming no body is needed for the POST request
  }



}
