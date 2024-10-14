import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';
// import { StationService } from 'src/app/s/ervices/station.service'; // Adjust the import path as necessary
import { AddStation } from 'src/app/models/station'; // Adjust the import path as necessary
import { StationService } from 'src/app/services/services';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';
// import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, MatSnackBarConfig } from '@angular/material/snack-bar';
@Component({
  selector: 'app-addstation',
  templateUrl: './addstation.component.html',
  styleUrls: ['./addstation.component.css'],
  providers: [DatePipe]
})
export class AddstationComponent implements OnInit {
  tiers: any[] = []
  formFields: FormGroup;
  formattedDate: string | null = null;
  seatsFormControl = new FormControl('', [Validators.required, Validators.nullValidator]);
  group: any = {};
  form: FormGroup;
  check: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public stationServ: StationService,
    private datePipe: DatePipe,
    private router: Router,
    private stationSrv: StationService,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private config: MatSnackBarConfig
  ) {
    this.form = this.fb.group({});
    this.formFields = this.formBuilder.group({
      trainname: ['vande bharat', Validators.required],
      trainnumber: [1046, Validators.required],
      boardingtime: ['8 pm', Validators.required],
      boardingstation: ['bengulur', Validators.required],
      boardingday: ['3 Aug 2024', Validators.required],
      departuretime: ['8 pm', Validators.required],
      departurestation: ['goa', Validators.required],
      departureday: ['4 Aug 2024', Validators.required],
      totaljourneytime: ['12', Validators.required],
    });
  }

  openSnackBar(message: string) {
    // this.matSnackBar.open("successfully added train",{duration:3000})
    // this.config.durastion = 5000000000
    this.config.horizontalPosition = "center"
    this.config.verticalPosition = "top"
    this.config.panelClass = 'success-snackbar'
    this.config.duration = 10000;
    this.matSnackBar.open(message, '', this.config)
  }
  show() {
    this.matSnackBar.open("ddddd", 'close', {
      // duration:60000000,
      panelClass: ['success-snackbar']
    })
  }
  ngOnInit() {
    // this.tiers.forEach((tier) => {
    //  this. group[tier.id] =      
    //     new FormControl(tier.value || '',[Validators.required]);
    // });
    this.stationSrv.getTiers().subscribe(tiersData => {
      this.tiers = tiersData;
      this.tiers.forEach(tier => {
        const control = new FormControl(tier.value || '', Validators.required);
        this.form.addControl(tier.id.toString(), control);
        control.valueChanges.subscribe(value => {
          console.log(`Value changed for tier ${tier.id}: ${value}`);
          const value1 = value
          tier.noOfSeats = value1;
          console.log(tier);
        });
      });
    });

    this.stationSrv.getTiers().subscribe(tiersData => {
      this.tiers = tiersData;
      console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTt", this.tiers);
    })
  }

  toggle() {
    this.check = !(this.check)
  }
  radioButtonChange(tier: any) {
    // console.log(data);
    console.log("IIIIIIIIIIIII", tier);
    this.tiers.map(data => {
      if (data.id == tier.id) {
        data.status = true
        console.log("YYYYYYYYYYYYYY", data.status);

      }
    })
  }
  radioButtonChange1(tier: any, i: number) {
    console.log("IIIIIIIIIIIII", tier, i);
    this.tiers.map(data => {
      if (data.id == tier.id) {

        data.status = !(tier.status)

        console.log("YYYYYYYYYYYYYY", data.status);

      }
    })
  }
  formatDate(date: Date): string | null {
    const day = this.datePipe.transform(date, 'dd');
    const weekday = this.datePipe.transform(date, 'EEE');
    const month = this.datePipe.transform(date, 'MMM'); // Use 'MMM' for abbreviated month
    if (day && weekday && month) {
      this.formattedDate = `${day} ${weekday} ${month}`;
      return this.formattedDate
    } else {
      this.formattedDate = null;
      return null
    }
  }
  //  this.form.get(this.tier.id).
  onSubmit() {
    this.tiers.map(tier => tier.trainId = this.formFields.get('trainNumber')?.value
    )
    if (this.formFields.valid) {
      console.log("Form Fields Value:", this.formFields.value);
      const updatedTiers = this.tiers.map(({ id, ...tier }) => ({
        ...tier,
        trainId: this.formFields.get('trainnumber')?.value,
        // "stationDetails":{
        //   trainId:this.formFields.get('trainnumber')?.value
        // },
        noOfSeats: parseInt(this.form.get(id.toString())?.value || '0', 10) // Convert value to integer
      }));
      console.log("addStationComponentFormData", this.formFields.value);
      // let stationDetails = {
      //   "trainId": this.formFields.get('trainnumber')?.value,
      //   "trainName": this.formFields.get('trainname')?.value,
      //   "boardingStation": this.formFields.get('boardingstation')?.value,
      //   "boardingDay": this.formFields.get('boardingday')?.value,
      //   "boardingTime": this.formFields.get('boardingtime')?.value,
      //   "departureStation": this.formFields.get('departurestation')?.value,
      //   "departureDay": this.formFields.get('departureday')?.value,
      //   "departureTime": this.formFields.get('departuretime')?.value,
      //   "totalJourneyTime": this.formFields.get('totaljourneytime')?.value,
      // }
      var addstationdata = {
        "trainId": this.formFields.get('trainnumber')?.value,
        "trainName": this.formFields.get('trainname')?.value,
        "boardingStation": this.formFields.get('boardingstation')?.value,
        "boardingDay": this.formatDate(this.formFields.get('boardingday')?.value),
        "boardingTime": this.formFields.get('boardingtime')?.value,
        "departureStation": this.formFields.get('departurestation')?.value,
        "departureDay": this.formatDate(this.formFields.get('departureday')?.value),
        "departureTime": this.formFields.get('departuretime')?.value,
        "totalJourneyTime": this.formFields.get('totaljourneytime')?.value,
        "journeyClasses": updatedTiers
      }
      this.formatDate(this.formFields.get('departureday')?.value);
      // console.log("************************************formatteddata", this.formattedDate);
      console.log("********************", addstationdata);
      this.stationServ.createJourneyStations(addstationdata)
        .subscribe((response: any) => {
          // Handle the response if necessary
          console.log('Journey details saved successfully', response);
          if (response.success) {
            this.openSnackBar(response.message)
          }
        }, (error: any) => {
          // Handle the error if necessary
          console.error('Error saving journey details', error);
        });
      this.router.navigateByUrl('/dashboard')
    } else {
      console.log('Form is invalid');
    }
  }

}
