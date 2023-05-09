import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoplightCreateComponent } from './stoplight-create.component';

describe('StoplightCreateComponent', () => {
  let component: StoplightCreateComponent;
  let fixture: ComponentFixture<StoplightCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoplightCreateComponent]
    });
    fixture = TestBed.createComponent(StoplightCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
