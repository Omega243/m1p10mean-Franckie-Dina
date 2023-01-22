import { LogoutComponent } from './logout/logout.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  } ,
  {
    path: 'inscription',
    component: InscriptionComponent
  } ,
  {
    path: 'logout',
    component: LogoutComponent
  } ,
  {
    path: 'atelier',
    loadChildren: () => import('./atelier-module/atelier-module.module').then(m => m.AtelierModuleModule)
  } ,
  {
    path: 'client',
    loadChildren: () => import('./client-module/client-module.module').then(m => m.ClientModuleModule)
  },
  {
    path: 'financier',
    loadChildren: () => import('./financier-module/financier-module.module').then(m => m.FinancierModuleModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
