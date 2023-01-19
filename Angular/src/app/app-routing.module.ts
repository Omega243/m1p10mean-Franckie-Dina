import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientMenuComponent } from './client-menu/client-menu.component';
import { FinancierMenuComponent } from './financier-menu/financier-menu.component';

const routes: Routes = [
  {
    path: 'atelier',
    loadChildren: () => import('./atelier-module/atelier-module.module').then(m => m.AtelierModuleModule)
  } ,
  {
    path: 'client',
    component: ClientMenuComponent
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
