import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloadedOrdersComponent } from './unloaded-orders.component';

describe('UnloadedOrdersComponent', () => {
  let component: UnloadedOrdersComponent;
  let fixture: ComponentFixture<UnloadedOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnloadedOrdersComponent]
    });
    fixture = TestBed.createComponent(UnloadedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
