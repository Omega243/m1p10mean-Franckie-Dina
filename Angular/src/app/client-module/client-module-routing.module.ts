import { ClientModuleComponent } from './client-module.component';
import { RechercheComponent } from './recherche/recherche.component';
import { FicheDetailsComponent } from './fiche-details/fiche-details.component';
import { FichesComponent } from './fiches/fiches.component';
import { RecuperableComponent } from './recuperable/recuperable.component';
import { VehiculeDepotComponent } from './vehicule-depot/vehicule-depot.component';
import { VehiculeSaveComponent } from './vehicule-save/vehicule-save.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ClientModuleComponent },
  { path: 'vehicule-save', component: VehiculeSaveComponent },
  { path: 'vehicule-depot', component: VehiculeDepotComponent },
  { path: 'fiches', component: FichesComponent },
  { path: 'recuperable', component: RecuperableComponent } ,
  { path: 'fiche-details/:id', component: FicheDetailsComponent } ,
  { path: 'recherche', component: RechercheComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientModuleRoutingModule { }
