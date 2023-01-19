import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtelierModuleComponent } from './atelier-module.component';

// Components In Atelier
import { NonReceptionComponent } from './non-reception/non-reception.component';

const routes: Routes = [
  { path: '', component: AtelierModuleComponent } ,
  { path: 'reception', component: NonReceptionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtelierModuleRoutingModule { }
