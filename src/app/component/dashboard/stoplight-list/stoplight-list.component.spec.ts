import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoplightListComponent } from './stoplight-list.component';

describe('StoplightListComponent', () => {
  let component: StoplightListComponent;
  let fixture: ComponentFixture<StoplightListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoplightListComponent]
    });
    fixture = TestBed.createComponent(StoplightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
