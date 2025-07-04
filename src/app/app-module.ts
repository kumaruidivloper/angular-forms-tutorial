import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
 import { ReactiveFormsModule } from '@angular/forms';
import { DynamicCheckboxFrom } from './dynamic-checkbox-from/dynamic-checkbox-from';

@NgModule({
  declarations: [
    App,
    DynamicCheckboxFrom
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App]
})
export class AppModule { }
