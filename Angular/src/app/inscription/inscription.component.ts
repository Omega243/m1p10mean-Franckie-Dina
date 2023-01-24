import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

  // Formulaire d'inscription
  form: any = {
    nom: '' ,
    prenom: '' ,
    mail: '' ,
    mdp: '' ,
    contact: ''
  } ;

  // Gestion des erreurs
  inscriptionError: string = '' ;

  constructor(private userService: UserService, private router: Router) { }

  // Inscription
  inscription() {
    this.userService.inscription(this.form).subscribe((result) => {
      if (result.error) this.inscriptionError = result.error ;
      else {
        localStorage.setItem('login', JSON.stringify(result)) ;
        this.router.navigate(['client']) ;
      }
    }) ;
  }

}