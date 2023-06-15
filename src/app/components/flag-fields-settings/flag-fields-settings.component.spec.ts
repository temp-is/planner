import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagFieldsSettingsComponent } from './flag-fields-settings.component';

describe('FlagFieldsSettingsComponent', () => {
  let component: FlagFieldsSettingsComponent;
  let fixture: ComponentFixture<FlagFieldsSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlagFieldsSettingsComponent]
    });
    fixture = TestBed.createComponent(FlagFieldsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
