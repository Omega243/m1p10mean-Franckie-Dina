import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
//import { CarListComponent } from './pages/car-list/car-list.component';
// import { UserComponent } from './pages/user/user.component';
// import { SendMailComponent } from './pages/send-mail/send-mail.component';
// import { CarDepotComponent } from './pages/car-depot/car-depot.component';
// import { TableModule } from 'primeng/table';
import { StateFileComponent } from './pages/state-file/state-file.component';
import { CFactureContentComponent } from './pages/c-facture-content/c-facture-content.component';
// import { CarRepairComponent } from './pages/car-repair/car-repair.component';
// import { RepairListComponent } from './pages/repair-list/repair-list.component';
// import { CFactureComponent } from './pages/c-facture/c-facture.component';
// import { CFileComponent } from './pages/c-file/c-file.component';
// import { CHistoriqueComponent } from './pages/c-historique/c-historique.component';
// import { CMenuComponent } from './pages/c-menu/c-menu.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule
    // TableModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    StateFileComponent,
    CFactureContentComponent,
    //CarListComponent,
    // UserComponent
    // SendMailComponent,
    // CarDepotComponent,
    // CarRepairComponent,
    // RepairListComponent,
    // CFactureComponent,
    // CFileComponent,
    // CHistoriqueComponent,
    // CMenuComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
