import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadedOrderDialogComponent } from './loaded-order-dialog.component';

describe('LoadedOrderDialogComponent', () => {
  let component: LoadedOrderDialogComponent;
  let fixture: ComponentFixture<LoadedOrderDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadedOrderDialogComponent]
    });
    fixture = TestBed.createComponent(LoadedOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
