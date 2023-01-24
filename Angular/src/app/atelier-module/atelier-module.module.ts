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
import { ReceptionComponent } from './reception/reception.component';
import { AttenteRecuperationComponent } from './attente-recuperation/attente-recuperation.component';
import { DemandeSortieComponent } from './demande-sortie/demande-sortie.component';
import { ValideSortieComponent } from './valide-sortie/valide-sortie.component';
import { RechercheComponent } from './recherche/recherche.component';

@NgModule({
  declarations: [
    AtelierMenuComponent ,
    AtelierModuleComponent ,
    NonReceptionComponent ,
    FicheDetailsComponent,
    ReceptionComponent,
    AttenteRecuperationComponent,
    DemandeSortieComponent,
    ValideSortieComponent,
    RechercheComponent
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
