import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedularToolbarComponent } from './schedular-toolbar.component';

describe('SchedularToolbarComponent', () => {
  let component: SchedularToolbarComponent;
  let fixture: ComponentFixture<SchedularToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchedularToolbarComponent]
    });
    fixture = TestBed.createComponent(SchedularToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
