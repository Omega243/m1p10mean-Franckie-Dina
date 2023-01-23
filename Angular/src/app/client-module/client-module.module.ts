import { FooterModule } from './../footer/footer.module';
import { HeaderModule } from './../header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientModuleRoutingModule } from './client-module-routing.module';
import { ClientModuleComponent } from './client-module.component';
import { VehiculeSaveComponent } from './vehicule-save/vehicule-save.component';
import { ClientMenuComponent } from './client-menu/client-menu.component';

import { FormsModule } from '@angular/forms';
import { VehiculeDepotComponent } from './vehicule-depot/vehicule-depot.component';
import { FichesComponent } from './fiches/fiches.component';
import { FicheDetailsComponent } from './fiche-details/fiche-details.component';
import { RecuperableComponent } from './recuperable/recuperable.component';

@NgModule({
  declarations: [
    ClientModuleComponent,
    VehiculeSaveComponent,
    ClientMenuComponent,
    VehiculeDepotComponent,
    FichesComponent,
    FicheDetailsComponent,
    RecuperableComponent
  ],
  imports: [
    CommonModule,
    ClientModuleRoutingModule,
    FormsModule,
    HeaderModule,
    FooterModule
  ]
})
export class ClientModuleModule { }
