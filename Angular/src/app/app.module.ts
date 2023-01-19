import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ClientMenuComponent } from './client-menu/client-menu.component';
import { AtelierMenuComponent } from './atelier-menu/atelier-menu.component';
import { FinancierMenuComponent } from './financier-menu/financier-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientMenuComponent,
    AtelierMenuComponent,
    FinancierMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
