import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoplightDetailsComponent } from './stoplight-details.component';

describe('StoplightDetailsComponent', () => {
  let component: StoplightDetailsComponent;
  let fixture: ComponentFixture<StoplightDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoplightDetailsComponent]
    });
    fixture = TestBed.createComponent(StoplightDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
