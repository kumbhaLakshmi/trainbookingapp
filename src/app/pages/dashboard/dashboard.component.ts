import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { StationService } from 'src/app/services/services';
import { IsStation } from 'src/app/models/station';
import { Observable, map, startWith, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  filteredOptions: Observable<string[]> = of([]);
  filteredOptionsTo: Observable<string[]> = of([]);
  fromStationControl = new FormControl('', Validators.required);
  toStationControl = new FormControl('', Validators.required);
  departureStations: string[] = [];
  boardingStations: string[] = [];
  searchForm: FormGroup;

  stations: IsStation[] = [];
  stationList: any[] = [];

  constructor(private fb: FormBuilder, private router: Router, private stationsrv: StationService) {
    this.searchForm = this.fb.group({
      fromStation: this.fromStationControl,
      toStation: this.toStationControl,
      dateOfTravel: ['']
    });
  }

  ngOnInit(): void {
    // this.stationsrv.getAllStations().subscribe(stationList1 => {
    //   this.stationList = stationList1;
    //   this.extractDays(this.stationList);
    // });

    // this.filteredOptions = this.fromStationControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value ?? '', this.boardingStations))
    // );
    this.filteredOptions = this.fromStationControl.valueChanges.pipe(
      startWith(''),
      switchMap((value: any) => this._filter(value))
    );
    this.filteredOptionsTo = this.toStationControl.valueChanges.pipe(
      startWith(''),
      switchMap((value: any) => this._filterToSation(value))
    );
    // this.filteredOptionsTo = this.toStationControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value ?? '', this.departureStations))
    // );
  }

  // private _filter(value: string, options: string[]): string[] {
  //   const filterValue = value.toLowerCase();
  //   return options.filter(option => option.toLowerCase().startsWith(filterValue));
  // }
  private _filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();
    if (value) {
      console.log("22222222222222222222222222222222", filterValue);
      return this.stationsrv.getSearchResults(filterValue).pipe(
        switchMap(fromResult => {
          // Optionally, you can further filter fromResult if needed
          // const filteredOptions = fromResult.filter(option => option.toLowerCase().includes(filterValue));
          return of(fromResult);
        })
      );
    }
    else {
      console.log("3333333333333333333333", filterValue);
      return of([])

    }
  }

  private _filterToSation(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();
    if (value) {
      console.log("22222222222222222222222222222222", filterValue);
      return this.stationsrv.getSearchResultsToStation(filterValue)
      // .pipe(
      //   switchMap(fromResult => {
      //     // Optionally, you can further filter fromResult if needed
      //     // const filteredOptions = fromResult.filter(option => option.toLowerCase().includes(filterValue));
      //     return of(fromResult);
      //   })
      // );
    }
    else {
      console.log("3333333333333333333333", filterValue);
      return of([])

    }
  }


  onSearch() {
    if (this.searchForm.valid) {
      console.log("***********dashboardformdata", this.searchForm.value);
      this.router.navigate(['/search'], { state: { data: this.searchForm.value } });
    }
  }

  extractDays(stationList: any[]) {
    this.departureStations = [...new Set(this.stationList.map(result => result.departureStation))];
    this.boardingStations = [...new Set(this.stationList.map(result => result.boardingStation))];
  }
}
