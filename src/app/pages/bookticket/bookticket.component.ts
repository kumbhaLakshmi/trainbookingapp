import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-bookticket',
  standalone: false,
  templateUrl: './bookticket.component.html',
  styleUrls: ['./bookticket.component.css']
})
export class BookticketComponent implements OnInit {
  passengerFormFields: FormGroup;
  payLoad = ''
  form!: FormGroup
  selectedTrain1: {} = {};
  onBookTicket1: boolean = true;
  confirmDetails: boolean = false;
  buttonChange: boolean = false
  // noOfPassenger = [];
  // noOfPassenger = Array(5).fill(0);  // Creates an array with 5 elements
  noOfPassengers = [1, 2, 3, 4]
  count = 1
  // selected = 1
  initialSelect !: number
  selectedObj = new BehaviorSubject<number>(1)
  selectedObserve$ = this.selectedObj.asObservable()
  _selected: number = 1
  formError: boolean = false
  // noOfPassenger: number[] = [this.count]
  passengersData !: FormGroup
  arrayOfPassengers!: FormArray
  mainPassengersFormGroup!: FormGroup
  onSelectionChange(newValue: number) {
    console.log("OOOOOOOOOOOOOOOOOOOOoooooooo", newValue);
    this.selectedObj.next(newValue)
    let x = this.initialSelect;
    this.passengerForms.clear()
    while (x > 0) {
      this.addPassenger()
      x--;
    }
  }
  // passengerFormscontrols = [
  //   {
  //     passengerName: 'jgkhjf',
  //     passengerAge: 56,
  //     passengerEmail: '',
  //     passengerMobileNumber: ''
  //   },
  //   {
  //     passengerName: 'khjdfs',
  //     passengerAge: 56,
  //     passengerEmail: '',
  //     passengerMobileNumber: ''
  //   }
  // ];
  passengerForms1!: FormGroup[]

  toFormGroup() {
    const group: any = {}
    // this.noOfPassenger.forEach(i => {
    //   group[i] = new FormControl()
    // })
    // return new FormGroup(group)
    return new FormGroup({
      passengerForms1: this.formBuilder.array([this.formBuilder.group({
        passengerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
        passengerAge: [null, [Validators.required, Validators.min(1), Validators.max(120)]],
        passengerEmail: ['', [Validators.required, Validators.email]],
        passengerMobileNumber: [null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
      })])
    })
  }
  addPassenger(): void {
    const passengerForm = this.formBuilder.group({
      passengerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      passengerAge: [null, [Validators.required, Validators.min(1), Validators.max(120)]],
      passengerEmail: ['', [Validators.required, Validators.email]],
      passengerMobileNumber: [null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
    this.passengerForms.push(passengerForm);
  }
  constructor(
    public formBuilder: FormBuilder,
    public matdialogRef: MatDialogRef<BookticketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedTrain: any }
  ) {
    this.passengerFormFields = this.formBuilder.group(
      {
        passengerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
        passengerAge: [null, [Validators.required, Validators.min(1), Validators.max(120)]],
        passengerEmail: ['', [Validators.required, Validators.email]],
        passengerMobileNumber: [null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
      });
      console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",data.selectedTrain);
      

    this.form = this.formBuilder.group({
      passengerForms: this.formBuilder.array([])
    })
    // this.selectedObserve$.subscribe(value => {
    //   this.initialSelect = value
    // })
    // this.arrayOfPassengers = this.formBuilder.array([this.addPassengerForm()], Validators.required)
    // this.arrayOfPassengers = this.formBuilder.array(
    //   [
    //     this.formBuilder.group(
    //       {
    //         passengerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
    //         passengerAge: [null, [Validators.required, Validators.min(1), Validators.max(120)]],
    //         passengerEmail: ['', [Validators.required, Validators.email]],
    //         passengerMobileNumber: [null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    //       })
    //   ]
    // )
    // this.passengersData = this.formBuilder.group({
    //   arrayOfPassengers: this.formBuilder.array(
    //     [
    //       this.formBuilder.group(
    //         {
    //           passengerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
    //           passengerAge: [null, [Validators.required, Validators.min(1), Validators.max(120)]],
    //           passengerEmail: ['', [Validators.required, Validators.email]],
    //           passengerMobileNumber: [null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    //         })
    //     ]
    //   )
    // })
    // this.mainPassengersFormGroup = this.formBuilder.group({
    //   passengersData: this.passengersData
    // })
    this.form = this.formBuilder.group({
      passengerForms: this.formBuilder.array([]) // Initialize the FormArray
    });
    console.log("this is done form creation");
    this.selected = 1
    // this.form = this.toFormGroup()
  }
  onBookTicket(): void {
    console.log("11111111111111111111111111111111111111");
    if (this.form.valid) {
      console.log("222222222222222222222222222");
      // Check if passengerForms exists and has entries
      if (this.passengerForms && this.passengerForms.length > 0) {
        // Iterate over the controls of the FormArray
        console.log("33333333333333333333333333333");
        for (let passenger of this.passengerForms.controls) {
          // Validate each form control's value
          if (
            !passenger.get('passengerName')?.value ||
            !passenger.get('passengerAge')?.value ||
            !passenger.get('passengerEmail')?.value ||
            !passenger.get('passengerMobileNumber')?.value
          ) {
            console.log("444444444444444444444444444444444444");
            this.formError = true;  // Set formError to true if any validation fails
            return;  // Exit the method early if an error is found
          }
          else {
            console.log("555555555555555555555555555");
            this.formError = false
          }
        }
      }
    } else {
      this.formError = true;  // Set formError to true if the form is invalid
    }
    if (!this.formError) {
      this.payLoad = JSON.stringify(this.form.value);
      console.log("Form Data:", this.payLoad);
      const passengerData = this.passengerForms.value; // Get the form data as an array of objects
      this.matdialogRef.close({ passengerForms: passengerData });      
      // this.form.reset()
    }
  }

  confirmBooking(): void {
    this.matdialogRef.close(this.form.value);
  }

  back() {
    this.confirmDetails = false;
    this.onBookTicket1 = true;
  }
  addPassengerForm(): FormGroup {
    // this.passengerFormFields = this.formBuilder.group(
    //   {
    //     passengerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
    //     passengerAge: [null, [Validators.required, Validators.min(1), Validators.max(120)]],
    //     passengerEmail: ['', [Validators.required, Validators.email]],
    //     passengerMobileNumber: [null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    //   });
    // return this.passengerFormFields
    return this.formBuilder.group({
      passengerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      passengerAge: [null, [Validators.required, Validators.min(1), Validators.max(120)]],
      passengerEmail: ['', [Validators.required, Validators.email]],
      passengerMobileNumber: [null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  ngOnInit(): void {
    console.log("DDDDDDDDDDDDDDDD");
    // Add one passenger form on initialization
    // this.form = this.formBuilder.group({
    //   passengerForms: this.formBuilder.array([]) // Initialize the FormArray
    // });
    this.selectedObserve$.subscribe(value => {
      this.initialSelect = value
    })
    this.addPassenger()
    // let x = this.selected
    // while (x > 0) {
    //   console.log("DDDDDDDDDDDDDDDD");
    //   this.addPassenger()
    //   x--;
    // }
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['selected']) {
  //   console.log("11111111111111111111111");
  //   let x = this.selected
  //   while (x > 0) {
  //     console.log("2222222222222");
  //     this.addPassenger()
  //     x--;
  //   }
  // }
  // }
  set selected(value: number) {
    this._selected = value;
    let x = this._selected
    // this.passengerForms.clear()
    console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSs", this.selected);
    // this.addPassenger()
    // while (x > 0) {
    //   console.log("XXXXXXXXXXXXXXXXXXXX", x);
    //   this.addPassenger()
    //   x--;
    // }
    console.log("this is second step setting value", this.form.value);
  }


  get passengerForms(): FormArray {
    return this.form.get('passengerForms') as FormArray;
  }

}
