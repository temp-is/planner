import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkLoadedOrdersComponent } from './mark-loaded-orders.component';

describe('MarkLoadedOrdersComponent', () => {
  let component: MarkLoadedOrdersComponent;
  let fixture: ComponentFixture<MarkLoadedOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkLoadedOrdersComponent]
    });
    fixture = TestBed.createComponent(MarkLoadedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
