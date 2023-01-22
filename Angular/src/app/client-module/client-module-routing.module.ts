import { FicheDetailsComponent } from './fiche-details/fiche-details.component';
import { FichesComponent } from './fiches/fiches.component';
import { VehiculeDepotComponent } from './vehicule-depot/vehicule-depot.component';
import { VehiculeSaveComponent } from './vehicule-save/vehicule-save.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: FichesComponent },
  { path: 'vehicule-save', component: VehiculeSaveComponent },
  { path: 'vehicule-depot', component: VehiculeDepotComponent },
  { path: 'fiches', component: FichesComponent },
  { path: 'fiche-details/:id', component: FicheDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientModuleRoutingModule { }
