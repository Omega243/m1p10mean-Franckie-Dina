import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtelierModuleRoutingModule } from './atelier-module-routing.module';
import { AtelierModuleComponent } from './atelier-module.component';
import { AtelierMenuComponent } from './atelier-menu/atelier-menu.component';
import { NonReceptionComponent } from './non-reception/non-reception.component';

@NgModule({
  declarations: [
    AtelierMenuComponent ,
    AtelierModuleComponent,
    NonReceptionComponent
  ],
  imports: [
    CommonModule,
    AtelierModuleRoutingModule
  ]
})
export class AtelierModuleModule { }
