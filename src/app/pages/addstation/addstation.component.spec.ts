import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstationComponent } from './addstation.component';

describe('AddstationComponent', () => {
  let component: AddstationComponent;
  let fixture: ComponentFixture<AddstationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddstationComponent]
    });
    fixture = TestBed.createComponent(AddstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
