import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientMenuComponent } from './client-menu/client-menu.component';
import { AtelierMenuComponent } from './atelier-menu/atelier-menu.component';
import { FinancierMenuComponent } from './financier-menu/financier-menu.component';

const routes: Routes = [
  {
    path: 'client',
    component: ClientMenuComponent
  } ,
  {
    path: 'atelier',
    component: AtelierMenuComponent
  } ,
  {
    path: 'financier',
    component: FinancierMenuComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
