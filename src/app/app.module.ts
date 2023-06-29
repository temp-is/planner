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
import { UnloadedOrdersComponent } from './components/unloaded-orders/unloaded-orders.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';
import { FieldSettingsComponent } from './components/field-settings/field-settings.component';
import { FlagFieldsSettingsComponent } from './components/flag-fields-settings/flag-fields-settings.component';
import { SchedularToolbarComponent } from './components/schedular-toolbar/schedular-toolbar.component';
import { BryntumSchedulerModule } from '@bryntum/scheduler-angular';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MarkLoadedOrdersComponent } from './components/mark-loaded-orders/mark-loaded-orders.component';

// Add the import statement for FactoryDetails

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SelectWorkCenterComponent,
    UnloadedOrdersComponent,
    SchedulerComponent,
    AdminSettingsComponent,
    FieldSettingsComponent,
    FlagFieldsSettingsComponent,
    SchedularToolbarComponent,
    UnloadedOrdersComponent,
    MarkLoadedOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IsComponentsModule,
    MaterialModule,
    HttpClientModule,
    BryntumSchedulerModule,
    AuthModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
