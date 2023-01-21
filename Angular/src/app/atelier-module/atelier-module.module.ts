import { FooterModule } from './../footer/footer.module';
import { HeaderModule } from './../header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtelierModuleRoutingModule } from './atelier-module-routing.module';
import { AtelierModuleComponent } from './atelier-module.component';
import { AtelierMenuComponent } from './atelier-menu/atelier-menu.component';
import { NonReceptionComponent } from './non-reception/non-reception.component';
import { FicheDetailsComponent } from './fiche-details/fiche-details.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AtelierMenuComponent ,
    AtelierModuleComponent ,
    NonReceptionComponent ,
    FicheDetailsComponent
],
  imports: [
    CommonModule,
    AtelierModuleRoutingModule,
    FormsModule,
    HeaderModule,
    FooterModule
  ]
})
export class AtelierModuleModule { }
