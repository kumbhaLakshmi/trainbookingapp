import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsbasedmfaComponent } from './smsbasedmfa.component';

describe('SmsbasedmfaComponent', () => {
  let component: SmsbasedmfaComponent;
  let fixture: ComponentFixture<SmsbasedmfaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmsbasedmfaComponent]
    });
    fixture = TestBed.createComponent(SmsbasedmfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
