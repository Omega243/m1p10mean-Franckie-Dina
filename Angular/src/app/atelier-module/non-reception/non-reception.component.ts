import { Router } from '@angular/router';
import { FicheService } from './../../services/fiche.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-non-reception',
  templateUrl: './non-reception.component.html',
  styleUrls: ['./non-reception.component.css']
})
export class NonReceptionComponent {

  depotNonReceptions: any;

  constructor (private ficheService: FicheService) { }

  ngOnInit(): void {
    this.getNonReception() ;
  }

  // Récéptionner
  recept(idFiche: string){
    this.ficheService.next(idFiche).subscribe((result) => {
      this.getNonReception() ;
    }) ;
  }

  // Liste des fiches déposées non-récéptionnées
  getNonReception() {
    this.ficheService.getFicheDeposeNonReceptionne().subscribe((result) => {
      this.depotNonReceptions = result ;
    }) ;
  }

}
