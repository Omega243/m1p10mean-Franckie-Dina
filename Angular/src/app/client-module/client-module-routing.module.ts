import { VehiculeDepotComponent } from './vehicule-depot/vehicule-depot.component';
import { VehiculeSaveComponent } from './vehicule-save/vehicule-save.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientModuleComponent } from './client-module.component';

const routes: Routes = [
  { path: '', component: ClientModuleComponent },
  { path: 'vehicule-save', component: VehiculeSaveComponent },
  { path: 'vehicule-depot', component: VehiculeDepotComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientModuleRoutingModule { }
