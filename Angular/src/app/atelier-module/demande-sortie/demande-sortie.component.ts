import { Component } from '@angular/core';
import { FicheService } from 'src/app/services/fiche.service';

@Component({
  selector: 'app-demande-sortie',
  templateUrl: './demande-sortie.component.html',
  styleUrls: ['./demande-sortie.component.css']
})
export class DemandeSortieComponent {

  fiches: any;

  // Gestion des erreurs
  valideError: string = '' ;
  valideSuccess: string = '' ;

  constructor (private ficheService: FicheService) { }

  ngOnInit(): void {
    this.demandeSortie() ;
  }

  // Récéptionner
  valideSortie(idFiche: string){
    this.ficheService.next(idFiche).subscribe((result) => {
      if (result.error) {
        this.valideError = result.error ;
        this.valideSuccess = '' ;
      } else {
        this.valideError = '' ;
        this.valideSuccess = result.success ;
        this.demandeSortie() ;
      }
    }) ;
  }

  // Liste des fiches demandant un billet de sortie
  demandeSortie() {
    this.ficheService.demandeSortie().subscribe((result) => {
      this.fiches = result ;
    }) ;
  }

}
