import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoffsComponent } from './payoffs.component';

describe('PayoffsComponent', () => {
  let component: PayoffsComponent;
  let fixture: ComponentFixture<PayoffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoffsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
