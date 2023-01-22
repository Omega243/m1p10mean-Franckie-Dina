import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('login') ;
    this.router.navigate(['/']) ;
  }

}
