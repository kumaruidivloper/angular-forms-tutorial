import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MaterialModule } from './shared/material.module';
import { Dialog } from './dialog/dialog';


@NgModule({
  declarations: [
    App,
    Dialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule

  ],
  bootstrap: [App]
})
export class AppModule { }
