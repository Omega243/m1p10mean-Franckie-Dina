import { Routes } from '@angular/router';

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

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'car-depot',      component: CarDepotComponent},
    { path: 'car-list',       component: CarListComponent},
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'send-mail',      component: SendMailComponent},
    { path: 'user',           component:  UserComponent},
    { path: 'car-repair',     component:  CarRepairComponent},
    { path: 'repair-list',    component:  RepairListComponent},
    { path: 'c-facture',      component:  CFactureComponent},
    { path: 'c-file',         component:  CFileComponent},
    { path: 'c-historique',   component:  CHistoriqueComponent}
];
