import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Formulaire
  form: any = {
    mail: '' ,
    mdp: ''
  }

  // Gestion de connexion
  connected: boolean = false ;

  // Gestion des erreurs
  logError: string = '' ;

  constructor (private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.connected = (localStorage.getItem('login') != null) ;
  }

  // Login
  login() {
    this.userService.login(this.form).subscribe((result) => {
      if (result.error) this.logError = result.error ;
      else {
        // Mise en page
        this.resetLoginForm() ;
        this.logError = '' ;

        // Controle des rôles
        localStorage.setItem('login', JSON.stringify(result)) ;
        const role = result.role ;
        if (role.intitule == 'Responsable atelier') this.router.navigate(['atelier']) ;
        else {
          if (role.intitule == 'Responsable financier') this.router.navigate(['financier']) ;
          else this.router.navigate(['client']) ;
        }
      }
    }) ;
  }

  resetLoginForm() {
    this.form.mail = '' ;
    this.form.mdp = '' ;
  }

}
