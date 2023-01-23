import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components In Atelier
import { NonReceptionComponent } from './non-reception/non-reception.component';
import { FicheDetailsComponent } from './fiche-details/fiche-details.component';
import { ReceptionComponent } from './reception/reception.component';
import { AttenteRecuperationComponent } from './attente-recuperation/attente-recuperation.component';
import { DemandeSortieComponent } from './demande-sortie/demande-sortie.component';

const routes: Routes = [
  { path: '', component: NonReceptionComponent } ,
  { path: 'reception', component: NonReceptionComponent } ,
  { path: 'receptionne', component: ReceptionComponent } ,
  { path: 'attente-recuperation', component: AttenteRecuperationComponent } ,
  { path: 'demande-sortie', component: DemandeSortieComponent } ,
  { path: 'fiche-details/:id', component: FicheDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtelierModuleRoutingModule { }
