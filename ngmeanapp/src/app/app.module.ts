import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { CarListComponent } from './pages/car-list/car-list.component';
// import { UserComponent } from './pages/user/user.component';
// import { SendMailComponent } from './pages/send-mail/send-mail.component';
// import { CarDepotComponent } from './pages/car-depot/car-depot.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    CarListComponent
    // UserComponent
    // SendMailComponent
    // CarDepotComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
