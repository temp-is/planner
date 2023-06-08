import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IsComponentsModule } from '@jude2go/is-components';
import { HeaderComponent } from './components/header/header.component';
import { SelectWorkCenterComponent } from './components/select-work-center/select-work-center.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';

// Add the import statement for FactoryDetails

@NgModule({
  declarations: [AppComponent, HeaderComponent, SelectWorkCenterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IsComponentsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
