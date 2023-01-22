import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // Header Content [Account]
  intitule: string = '' ;
  role: string = '' ;

  ngOnInit(): void {
    const login = JSON.parse(localStorage.getItem('login')!) ;
    this.intitule = login.intitule ;
    this.role = login.role.intitule ;
  }

}
