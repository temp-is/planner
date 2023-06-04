import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWorkCenterComponent } from './select-work-center.component';

describe('SelectWorkCenterComponent', () => {
  let component: SelectWorkCenterComponent;
  let fixture: ComponentFixture<SelectWorkCenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectWorkCenterComponent]
    });
    fixture = TestBed.createComponent(SelectWorkCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
