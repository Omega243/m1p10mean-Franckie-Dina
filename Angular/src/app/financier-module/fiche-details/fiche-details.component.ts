import { FicheService } from 'src/app/services/fiche.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fiche-details',
  templateUrl: './fiche-details.component.html',
  styleUrls: ['./fiche-details.component.css']
})
export class FicheDetailsComponent {

  // Input value
  idFiche!: string ;
  datefiche!: string;
  datepayement!: string ;
  voiture: any ;
  user: any ;
  etats: any ;

  // Récapitulation
  avancementGlobal: number = 0 ;
  etatEncours: any ;
  payement: any = {
    etat: '',
    montanttotal: 0
  } ;
  reparationGlobal: any = {
    nbre: 0 ,
    tempsMoyenne: ''
  } ;

  constructor (private ficheService: FicheService, private activated: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDetails() ;
  }

  // Form de la réparation
  forms: any[] = [] ;

  // Récupérer les détails
  async getDetails() {
    this.idFiche = await this.activated.snapshot.params['id'] ;
    this.showElement() ;
    this.showRecapitulation() ;
  }

  // Show Element
  showElement(): void {
    this.ficheService.getDetails(this.idFiche).subscribe((result) => {
      this.datefiche = this.getDateHTML(result.datefiche) ;
      this.datepayement = this.getDateHTML(result.datepayement) ;
      this.voiture = result.voiture ;
      this.user = result.user ;
      this.etats = result.etat ;

      // Mise en forme des réparations
      this.forms = [] ;
      for (const reparation of result.reparations) {
        this.forms.push({
          id: reparation._id ,
          intitule: reparation.intitule ,
          datedebut: this.getDateHTML(reparation.datedebut) ,
          datefin: this.getDateHTML(reparation.datefin) ,
          description: reparation.description ,
          avancement: reparation.avancement ,
          prix: reparation.prix
        }) ;
      }
    }) ;
  }

  // Show Recapitulation
  showRecapitulation(): void {
    this.ficheService.ficheRecapitulation(this.idFiche).subscribe((result) => {
      this.avancementGlobal = result.avancement ;
      this.etatEncours = result.etat ;
      this.payement = {
        etat: result.etatpayement == 1 ? 'Payé' : 'Non-payé',
        montanttotal: result.montanttotal
      } ;
      this.reparationGlobal = {
        nbre: result.nbrereparation,
        tempsMoyenne: result.tempsmoyenne
      }
    }) ;
  }

  // Supprimer une réparation
  deleteReparation(idReparation: string) {
    this.ficheService.deleteReparation(this.idFiche, idReparation).subscribe((result) => {
      this.showElement() ;
    }) ;
  }

  // Format the Date
  getDateHTML(value: any): string {
    if (value) {
      let variable: string = value ;
      variable = variable.replace('T', ' ') ;
      if (variable.split('\.').length == 2) return variable.split('\.')[0] ;
      return variable ;
    }
    return '' ;
  }

}
