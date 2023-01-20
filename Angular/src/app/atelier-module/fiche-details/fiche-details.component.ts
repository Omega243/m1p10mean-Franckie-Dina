import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FicheService } from 'src/app/services/fiche.service';

@Component({
  selector: 'app-fiche-details',
  templateUrl: './fiche-details.component.html',
  styleUrls: ['./fiche-details.component.css']
})
export class FicheDetailsComponent {

  idFiche!: string ;
  datefiche!: string;
  voiture: any ;
  user: any ;
  reparations: any ;
  etats: any ;

  constructor (private ficheService: FicheService, private activated: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDetails() ;
  }

  /************
  * FUNCTIONS *
  ************/
  // Récupérer les détails
  getDetails() {
    this.idFiche = this.activated.snapshot.params['id'] ;
    this.showElement() ;
  }

  // Supprimer une réparation
  deleteReparation(idReparation: string) {
    this.ficheService.deleteReparation(this.idFiche, idReparation).subscribe((result) => {
      this.showElement() ;
    }) ;
  }

  /********
  * UTILS *
  ********/
  // Show Element
  showElement(): void {
    this.ficheService.getDetails(this.idFiche).subscribe((result) => {
      this.datefiche = this.getDateHTML(result.datefiche) ;
      this.voiture = result.voiture ;
      this.user = result.user ;
      this.reparations = result.reparations ;
      this.etats = result.etat ;

      console.log(result) ;
    }) ;
  }

  // Format the Date
  getDateHTML(value: any): string {
    let variable: string = value ;
    variable = variable.replace('T', ' ') ;
    if (variable.split('\.').length == 2) return variable.split('\.')[0] ;
    return variable ;
  }

}
