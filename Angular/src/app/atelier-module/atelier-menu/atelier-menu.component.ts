import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atelier-menu',
  templateUrl: './atelier-menu.component.html',
  styleUrls: ['./atelier-menu.component.css']
})
export class AtelierMenuComponent {

  constructor(private router: Router) {} ;

  navigate(url: string): void {
    this.router.navigate([url]) ;
  }

}
