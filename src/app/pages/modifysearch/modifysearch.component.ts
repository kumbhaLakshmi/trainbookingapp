import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog'
import { StationService } from 'src/app/services/services';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription, BehaviorSubject } from 'rxjs';
// import { AuthService } from 'src/app/AuthService';
import { SearchComponent } from '../search/search.component';
import { EventEmitter, Output } from '@angular/core';
import { Observable, map, startWith, of, switchMap } from 'rxjs';
@Component({
  selector: 'app-modifysearch',
  templateUrl: './modifysearch.component.html',
  styleUrls: ['./modifysearch.component.css'],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ]
})

export class ModifysearchComponent implements OnInit {
  modifyFilteredOptions: Observable<string[]> = of([])
  modifyFilterdOptionsTo: Observable<string[]> = of([])
  stationList: any[] = []
  formStationControl = new FormControl('', Validators.required);
  toStationControl = new FormControl('', Validators.required)
  modifyFields = this.formBuilder.group({
    // fromStation: ['', [Validators.required]],
    // toStation: ['', [Validators.required]],
    // dateOfTravel: ['', [Validators.required]]
    fromStation: this.formStationControl,
    toStation: this.toStationControl,
    dateOfTravel: ['', [Validators.required]]
  })
  //  MAT_DIALOG_DATA: Injection<any>;
  @Output() sendDataEvent = new EventEmitter<any[]>();
  isSmallScreenObj = new BehaviorSubject<boolean>(false);
  isSmallScreen = this.isSmallScreenObj.asObservable();
  private subscription: Subscription = new Subscription();

  selectFormControl = new FormControl('', Validators.required);
  departureStations: any[] = []
  boardingStations: any[] = []
  constructor(public formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public modifyData: string, public dialogRef: MatDialogRef<ModifysearchComponent>,
    public stationServ: StationService, private dialog: MatDialog
    , private breakPointObserver: BreakpointObserver, private stationSrv: StationService) {
    this.breakPointObserver.observe(['(min-width:600px)']).subscribe((state: BreakpointState) => {
      this.isSmallScreenObj.next(state.matches);
      // if (this.isSmallScreenObj.value) {
      //   this.dialog.closeAll();
      // }
    });
  }
  extractDays(stationList: any[]) {
    // Create sets for departure and boarding stations to ensure uniqueness
    this.departureStations = [...new Set(this.stationList.map(result => result.departureStation))];
    this.boardingStations = [...new Set(this.stationList.map(result => result.boardingStation))];
  }

  ngOnInit(): void {
    this.stationServ.getAllStations().subscribe(result => {
      this.stationList = result;
      this.extractDays(this.stationList)
    })

    this.modifyFilteredOptions = this.formStationControl.valueChanges.pipe(startWith(''),
      switchMap((value: any) => this._modifyFilter(value))
    )
    this.modifyFilterdOptionsTo = this.toStationControl.valueChanges.pipe(startWith(''),
      switchMap((value: any) =>
        this.modifyFilterToStation(value)
      )
    )
  }



  _modifyFilter(value: string): Observable<string[]> {
    const filterValue = value?.toLowerCase();
    if (value) {
      return this.stationServ.getSearchResults(filterValue).pipe(
        switchMap(formResult => {
          return of(formResult)
        })
      )
    }
    else {
      return of([])
    }
  }

  modifyFilterToStation(value: string): Observable<string[]> {
    const filterValue = value?.toLowerCase();
    if (value) {
      return this.stationServ.getSearchResultsToStation(filterValue).pipe(
        switchMap(toResult => {
          return of(toResult)
        })
      )
    }
    else {
      return of([])
    }

  }


  onSubmit() {
    console.log("modifysearchformdata", this.modifyFields.value);
    //  this.modifyData.toStation.toStation=this.modifyFields.get('toStation')?.value
    //  this.modifyData.formStation=this.modifyFields.get('fromStation')?.value
    //  this.modifyData.dateOfTravel=this.modifyFields.get('dateOfTravel')?.value
    if (this.isSmallScreenObj.value && !this.modifyFields.value) {
      this.dialogRef.close();
      // return;
    }

    else if (this.isSmallScreenObj.value && this.modifyFields.value) {
      var modifyData = {
        fromStation: this.modifyFields.get('fromStation')?.value,
        toStation: this.modifyFields.get('toStation')?.value,
        dateOfTravel: this.modifyFields.get('dateOfTravel')?.value
      }
      console.log("1111111111111111111");
      this.stationSrv.filterStations(modifyData).subscribe(result => {
        // console.log("********************88", result);
        // if (result) {
        console.log("********************88", result);
        this.sendDataEvent.emit(result);
        // this.dialogRef.close()
        // }

        // this.modifyFields.get('toStation')?.patchValue('');
        // this.modifyFields.get('fromStation')?.patchValue('')
        // this.modifyFields.get('dateOfTravel')?.patchValue('')
        // this.modifyFields.reset()

      })
    }
    else {
      this.modifyData = "massil"
      this.dialogRef.close(this.modifyFields.value)
    }

  }
}
