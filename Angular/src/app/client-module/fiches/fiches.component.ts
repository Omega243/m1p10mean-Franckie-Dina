import { FicheService } from 'src/app/services/fiche.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fiches',
  templateUrl: './fiches.component.html',
  styleUrls: ['./fiches.component.css']
})
export class FichesComponent {

  fiches: any ;

  constructor(private ficheService: FicheService) { }

  ngOnInit(): void {
    this.ficheUser() ;
  }

  // Liste des fiches d'un utilisateur
  ficheUser() {
    const login = JSON.parse(localStorage.getItem('login')!) ;
    const iduser = login.iduser ;
    this.ficheService.ficheClient(iduser).subscribe((result) => {
      this.fiches = result ;
    }) ;
  }

  // Récupérer le width à afficher
  getWidth(avancement: number): string {
    const result = 'style="width: '+avancement+'%"' ;
    return result ;
  }

}
