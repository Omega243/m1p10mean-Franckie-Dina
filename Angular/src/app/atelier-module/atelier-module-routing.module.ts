import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtelierModuleComponent } from './atelier-module.component';

// Components In Atelier
import { NonReceptionComponent } from './non-reception/non-reception.component';
import { FicheDetailsComponent } from './fiche-details/fiche-details.component';

const routes: Routes = [
  { path: '', component: AtelierModuleComponent } ,
  { path: 'reception', component: NonReceptionComponent } ,
  { path: 'fiche-details/:id', component: FicheDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtelierModuleRoutingModule { }
