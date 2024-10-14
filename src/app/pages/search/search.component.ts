import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Subscription, BehaviorSubject, Observable, of } from 'rxjs';
import { StationService } from 'src/app/services/services';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { ModifysearchComponent } from '../modifysearch/modifysearch.component';
import { BookticketComponent } from '../bookticket/bookticket.component';
// import { MatDialog } from '@angular/material/dialog';
// import {MatSnackBar} from '@angular/material/';
import { MatSnackBar, MatSnackBarRef, MatSnackBarModule } from '@angular/material/snack-bar';
import { TooltipPosition, MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [DatePipe, {
    provide: MatDialogRef,
    useValue: {}
  },]
})
export class SearchComponent implements OnInit, OnDestroy {
  tiers: any[] = []
  parentData: any[] = [];
  passengerBookingDetails: {} = {}
  fromStation: string = '';
  toStation: string = '';
  dateOfTravel: string = '';
  _stationSearchResults: any[] = []
  change: boolean = false;
  isSmallScreenObj = new BehaviorSubject<boolean>(false);
  isSmallScreen = this.isSmallScreenObj.asObservable();
  private subscription: Subscription = new Subscription();
  departureDays: string[] = [];
  boardingDays: string[] = [];
  @Input() receivedData: any[] = []
  toggleButton: boolean = true
  trainId: number = -1
  receiveData(data: any[]) {
    console.log("******************receivedata", data);
    this.receivedData = data;
    // this.stationSearchResults = data;
    console.log("^^^^^^^^^^^^^^^^^^", data[0].boardingStation?.toUpperCase());
    this.fromStation = data[0].boardingStation?.toUpperCase();
    this.toStation = data[0].departureStation?.toUpperCase();
  }
  private buttonStatesSubject = new BehaviorSubject<{ [key: number]: boolean }>({});
  buttonStates$ = this.buttonStatesSubject.asObservable();
  // buttonStates: boolean[] = []; // Store button states using index
  selectedJourneyClass: any = {};
  toolTip: boolean = true;
  // noTooltip:boolean=false
  changeColour: number = -1
  noToolTip: boolean = false
  index1: number = -1;
  changeButton = true;
  trainButton = false
  id: number = 0
  initializeButtonStates() {
    if (this._stationSearchResults) {
      console.log("+++++++++++++++++++++++++++++++++++");
      const initialState: { [key: number]: boolean } = {}; // Define the type
      this._stationSearchResults.forEach(train => {
        initialState[train.trainId] = true; // Set all buttons to enabled initially
      });
      this.buttonStatesSubject.next(initialState);
    }
    this.buttonStates$.subscribe(states => {
      console.log("Current button states:", states);
    });
  }
  selectJourneyClass(parentId: number, parentContainerId: number, j: number, trainId: number, journeyClass: any, result: any, journeyClassId: number) {
    this.selectedJourneyClass = JSON.parse(JSON.stringify(result));
    this.changeColour = journeyClassId
    this.toolTip = false
    this.noToolTip = true
    this.trainId = parentId
    this.id = trainId
    console.log("HHHHHHHHHHHHHHHHHHH", result);
    // this.changeDetectorRef.detectChanges()
    this.index1 = parentId
    // this.changeButton = false
    const currentState = this.buttonStatesSubject.getValue();
    console.log(")))))))))))))))))))currentState", currentState);
    if (journeyClass) {
      console.log("111111111111111111111", journeyClass);
      if (journeyClass.noOfSeats <= 0) {
        console.log("No of seats", journeyClass.noOfSeats);
        // this.toggleButton = true;
        // this.buttonStates[parentId] = journeyClass.noOfSeats <= 0;
        // this.buttonStates[parentId] = journeyClass.noOfSeats <= 0;
        // this.buttonStates[trainId] = true; // Disable button
        // this.buttonStates = { ...this.buttonStates, [trainId]: true };
        currentState[trainId] = true;
        console.log("BBBBBBBBBBBBBBBBBB", currentState);
        this.changeButton = false
        this.buttonStatesSubject.next(currentState);
        this.trainButton = false
        // this.changeDetectorRef.markForCheck(); // Ensure Angular detects changes
        // console.log("LLLLLLLLLLLLLLLLLLLLL,trainID:", trainId, this.buttonStates[trainId]);
        // this.changeDetectorRef.detectChanges(); // Ensure the UI updates
      } else {
        // this.toggleButton = false;
        // this.buttonStates[parentId] = false;
        // Ensure the button is enabled if there's an error
        // this.buttonStates[trainId] = false; // Enable button
        // this.buttonStates = { ...this.buttonStates, [trainId]: false };
        currentState[trainId] = false;
        this.changeButton = false
        this.trainButton = true
        // console.log("NNNNNNNNNNNNNNNNNNNNNNN,trainID", trainId, this.buttonStates[trainId]);
        // this.changeDetectorRef.detectChanges(); // Ensure the UI updates

        // this.changeDetectorRef.markForCheck(); // Ensure Angular detects changes
      }
      // this.changeDetectorRef.detectChanges(); // Ensure the UI updates


    } else {
      console.error("Invalid journeyClass or noOfSeats value");
    }

    const selectedTrain = JSON.parse(JSON.stringify(result));
    const selectedTrain1 = result;
    const foundJourneyClass = this.selectedJourneyClass.journeyClasses.find((jc: any) => jc.id === journeyClassId);
    this.selectedJourneyClass.journeyClasses = [foundJourneyClass]
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private stationsrv: StationService,
    private dialog: MatDialog,
    private breakPointObserver: BreakpointObserver,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.breakPointObserver.observe(['(min-width:770px)']).subscribe((state: BreakpointState) => {
      this.isSmallScreenObj.next(state.matches);
      if (this.isSmallScreenObj.value) {
        this.dialog.closeAll();
      }
    });

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { data: any };
    if (state) {
      this.fromStation = state.data.fromStation;
      this.toStation = state.data.toStation;
      this.dateOfTravel = state.data.dateOfTravel;
    }
  }

  get stationSearchResults(): any[] {
    return this._stationSearchResults;
  }

  set stationSearchResults(results: any[]) {
    this._stationSearchResults = this.formatStationSearchResultsDates(results);
  }


  formatStationSearchResultsDates(stationSearchResults: any[]): any[] {
    return stationSearchResults.map(result => {
      let formattedBoardingDay = result.boardingDay;
      let formattedDepartureDay = result.departureDay;
      if (result.boardingDay) {
        try {
          const date = new Date(result.boardingDay);
          formattedBoardingDay = this.formatDate(date);
        } catch (error) {
          console.error(`Invalid date string for boardingDay: ${result.boardingDay}`);
        }
      }
      if (result.departureDay) {
        try {
          const date = new Date(result.departureDay);
          formattedDepartureDay = this.formatDate(date);
        } catch (error) {
          console.error(`Invalid date string for departureDay: ${result.departureDay}`);
        }
      }
      return {
        ...result,
        boardingDay: formattedBoardingDay,
        departureDay: formattedDepartureDay
      };
    });
  }
  formatDate(date: Date): string | null {
    const day = this.datePipe.transform(date, 'dd');
    const weekday = this.datePipe.transform(date, 'EEE');
    const month = this.datePipe.transform(date, 'MMM');
    return day && weekday && month ? `${day} ${weekday} ${month}` : null;
  }
  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { data: any };
    if (state) {
      this.fromStation = state.data.fromStation || '';
      this.toStation = state.data.toStation || '';
      this.dateOfTravel = state.data.dateOfTravel || '';
    }
    this.isSmallScreen?.subscribe(value => {
      this.change = !this.isSmallScreenObj.value;
    });
    this.method1()
  }

  method1() {
    const senddata = { fromStation: this.fromStation, toStation: this.toStation };
    this.stationsrv.filterStations(senddata).subscribe(stationsList => {
      // this.stationSearchResults = stationsList;
      this._stationSearchResults = stationsList
      this.initializeButtonStates(); // Ensure this runs after results are set
      console.log("OOOOOOOOOOOOOOOOOO", this.stationSearchResults);
      // this.changeDetectorRef.detectChanges(); // Detect changes after setting data
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog() {
    if (!this.isSmallScreenObj.value) {
      const dialogRef = this.dialog.open(ModifysearchComponent, {
        height: '400px',
        width: '600px',
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        // console.log("Dialog result search component:", result);
        console.log("Dialog result search component:", result);
        const modifysenddata = {
          fromStation: result?.fromStation,
          toStation: result?.toStation
        };
        this.fromStation = result?.fromStation,
          this.toStation = result?.toStation
        this.stationsrv.filterStations(modifysenddata).subscribe(stationList => {
          this.stationSearchResults = stationList;
        });
      });
    }
  }

  openDialogBookTicket(result: any, journeyClass: any) {
    const dialogRef = this.dialog.open(BookticketComponent, {
      minHeight: '400px',
      width: '500px',
      data: {
        // result: result,
        // journeyClass: journeyClass
        selectedTrain: this.selectedJourneyClass
      }
    });
    // console.log("mmmmmmmmmmmmmmmmmmmmmmmm", result);
    // this.passengerBookingDetails = {
    //   // passengerName: dialogResult.passengerName,
    //   // passengerAge: dialogResult.passengerAge,
    //   // trainId: result.trainId,
    //   // trainName: result.trainName,
    //   // boardingStation: result.boardingStation,
    //   // boardingDay: result.boardingDay,
    //   // boardingTime: result.boardingTime,
    //   // departureStation: result.departureStation,
    //   // departureDay: result.departureDay,
    //   // departureTime: result.departureTime,
    //   // className: this.selectedJourneyClass.className,
    //   // availability: this.selectedJourneyClass.availability,
    //   // ticketCost: this.selectedJourneyClass.ticketCost
    //   // "journeyClassDTO": this.selectJourneyClass
    //   // "journeyClassDto":this.selectedJourneyClass
    //   "passengers": passengersForms,
    //   "stationDetailsDTO": this.selectedJourneyClass
    // }
    dialogRef.afterClosed().subscribe((dialogResult: any) => {
      console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMM", dialogResult);
      if (dialogResult) {
        console.log("selectedJourneyClass", this.selectedJourneyClass);
        const passengersForms = dialogResult.passengerForms;
        // Check if we have passenger forms
        if (passengersForms && passengersForms.length > 0) {
          // Transform the data if needed
          const transformedPassengers = passengersForms.map((passenger: any) => {
            return {
              passengerName: passenger.passengerName || '',
              passengerAge: passenger.passengerAge || '',
              passengerEmail: passenger.passengerEmail || '',
              passengerMobileNumber: passenger.passengerMobileNumber || '',
              boardingStation: this.selectedJourneyClass.boardingStation,
              boardingDay: this.selectedJourneyClass.boardingDay,
              boardingTime: this.selectedJourneyClass.boardingTime,
              departureStation: this.selectedJourneyClass.departureStation,
              departureDay: this.selectedJourneyClass.departureDay,
              departureTime: this.selectedJourneyClass.departureTime,
              // ticketCost: this.selectedJourneyClass.journeyClass
            };
          });
          const passengers1 = {
            journeyClassId:this.selectedJourneyClass.journeyClasses[0].id,
            passengers: transformedPassengers
          }
          console.log("PPPPPPPPPPPPPPPPPPPPPPPPPP", passengers1);
          // const transformedPassengersJsonFormat = JSON.stringify(passengers)
          this.stationsrv.passengerBookTickets(passengers1).subscribe(result => {
            console.log("CCCCCCCCCCCCCCCCCCcc", result)
            this.method1()
          })
          console.log("Transformed Passengers:", transformedPassengers);
        } else {
          console.log("No passenger forms found or empty controls.");
        }
      } else {
        console.log("No dialog result returned.");
      }
    });
  }
}
