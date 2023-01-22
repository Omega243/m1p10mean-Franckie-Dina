import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepenseSaveComponent } from './depense-save/depense-save.component';
import { FicheNonpayeComponent } from './fiche-nonpaye/fiche-nonpaye.component';
import { FicheDetailsComponent } from './fiche-details/fiche-details.component';
import { DepenseHistoriqueComponent } from './depense-historique/depense-historique.component';
import { ChiffreJournalierComponent } from './chiffre-journalier/chiffre-journalier.component';

const routes: Routes = [
  { path: '', component: FicheNonpayeComponent } ,
  { path: 'fiche-details/:id', component: FicheDetailsComponent } ,
  { path: 'depense-save', component: DepenseSaveComponent } ,
  { path: 'depenses', component: DepenseHistoriqueComponent } ,
  { path: 'chiffre-journalier', component: ChiffreJournalierComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancierModuleRoutingModule { }
