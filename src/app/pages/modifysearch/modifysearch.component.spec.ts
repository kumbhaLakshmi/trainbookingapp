import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifysearchComponent } from './modifysearch.component';

describe('ModifysearchComponent', () => {
  let component: ModifysearchComponent;
  let fixture: ComponentFixture<ModifysearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifysearchComponent]
    });
    fixture = TestBed.createComponent(ModifysearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
