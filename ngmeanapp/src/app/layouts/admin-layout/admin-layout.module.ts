import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { CarDepotComponent } from '../../pages/car-depot/car-depot.component';
import { CarListComponent } from '../../pages/car-list/car-list.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { SendMailComponent } from '../../pages/send-mail/send-mail.component';
import { CarRepairComponent } from '../../pages/car-repair/car-repair.component';
import { RepairListComponent } from '../../pages/repair-list/repair-list.component';
import { CFactureComponent } from '../../pages/c-facture/c-facture.component';
import { CFileComponent } from '../../pages/c-file/c-file.component';
import { CHistoriqueComponent } from '../../pages/c-historique/c-historique.component';
import { CMenuComponent } from '../../pages/c-menu/c-menu.component';
import { UserComponent } from '../../pages/user/user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { TableModule } from 'primeng/table';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
    // TableModule
  ],
  declarations: [
    DashboardComponent,
    CarDepotComponent,
    CarListComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    SendMailComponent,
    CarRepairComponent,
    RepairListComponent,
    CFactureComponent,
    CFileComponent,
    CHistoriqueComponent,
    CMenuComponent,
    UserComponent
  ]
})

export class AdminLayoutModule {}
