import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginContainerComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginContainerComponent;
  let fixture: ComponentFixture<LoginContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginContainerComponent],
    });
    fixture = TestBed.createComponent(LoginContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
