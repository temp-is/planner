import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginContainerComponent } from './components/login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginContainerComponent],

  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [LoginContainerComponent],
})
export class AuthModule {}
