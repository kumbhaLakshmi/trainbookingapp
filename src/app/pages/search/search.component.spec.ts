import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent]
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
// journeyClass: any[] = [
//   {
//     className: "Sleeper (SL)",
//     vailability: 'NOT AVAILABLE',
//     ticketCost: 300
//   },
//   {
//     className: "AC 3 Economy (3E)",
//     vailability: 'AVAILABLE',
//     ticketCost: 300
//   },
//   {
//     className: "AC First Class (1A)",
//     vailability: 'NOT AVAILABLE',
//     ticketCost: 300
//   },
//   {
//     className: "AC 2 Tier (2A)",
//     vailability: 'AVAILABLE',
//     ticketCost: 300
//   },
//   {
//     className: "AC 3 Tier (3A)",
//     vailability: 'NOT AVAILABLE',
//     ticketCost: 300
//   },
//   {
//     className: "AC 3 Economy (3E)",
//     vailability: 'AVAILABLE',
//     ticketCost: 300
//   },
//   {
//     className: "AC First Class (1A)",
//     vailability: 'NOT AVAILABLE',
//     ticketCost: 300
//   },
//   {
//     className: "AC 2 Tier (2A)",
//     vailability: 'AVAILABLE',
//     ticketCost: 300
//   },
//   {
//     className: "AC 3 Tier (3A)",
//     vailability: 'NOT AVAILABLE',
//     ticketCost: 300
//   },
//   {
//     className: "AC 3 Economy (3E)",
//     vailability: 'AVAILABLE',
//     ticketCost: 300
//   },
//   {
//     className: "AC First Class (1A)",
//     vailability: 'NOT AVAILABLE',
//     ticketCost: 300
//   },
//   {
//     className: "AC 2 Tier (2A)",
//     vailability: 'AVAILABLE',
//     ticketCost: 300
//   },
//   {
//     className: "AC 3 Tier (3A)",
//     vailability: 'NOT AVAILABLE',
//     ticketCost: 300
//   }
// ];
