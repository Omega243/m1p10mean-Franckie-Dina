import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'atelier',
    loadChildren: () => import('./atelier-module/atelier-module.module').then(m => m.AtelierModuleModule)
  } ,
  {
    path: 'client',
    loadChildren: () => import('./client-module/client-module.module').then(m => m.ClientModuleModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
