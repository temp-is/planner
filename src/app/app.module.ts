import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IsComponentsModule } from '@jude2go/is-components';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material/material.module';
import { SelectWorkCenterComponent } from './components/select-work-center/select-work-center.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SelectWorkCenterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IsComponentsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
