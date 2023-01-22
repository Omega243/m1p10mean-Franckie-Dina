import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancierModuleRoutingModule } from './financier-module-routing.module';
import { FinancierModuleComponent } from './financier-module.component';
import { FinancierMenuComponent } from './financier-menu/financier-menu.component';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { DepenseSaveComponent } from './depense-save/depense-save.component';
import { FormsModule } from '@angular/forms';
import { FicheNonpayeComponent } from './fiche-nonpaye/fiche-nonpaye.component';
import { FicheDetailsComponent } from './fiche-details/fiche-details.component';
import { DepenseHistoriqueComponent } from './depense-historique/depense-historique.component';
import { ChiffreJournalierComponent } from './chiffre-journalier/chiffre-journalier.component';


@NgModule({
  declarations: [
    FinancierModuleComponent,
    FinancierMenuComponent,
    DepenseSaveComponent,
    FicheNonpayeComponent,
    FicheDetailsComponent,
    DepenseHistoriqueComponent,
    ChiffreJournalierComponent
  ],
  imports: [
    CommonModule,
    FinancierModuleRoutingModule,
    FormsModule,
    HeaderModule,
    FooterModule
  ]
})
export class FinancierModuleModule { }
