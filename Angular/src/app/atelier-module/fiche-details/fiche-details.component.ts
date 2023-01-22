import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FicheService } from 'src/app/services/fiche.service';

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

  // Form pour de nouveau réparation
  nouvelleReparationForm: any = {
    intitule: null ,
    datedebut: null ,
    datefin: null ,
    description: null ,
    avancement: 0 ,
    prix: 0
  } ;

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

  // Gestion des erreurs
  error_saveReparation: string = '' ;
  error_deleteEtat: string = '' ;

  // Form de la réparation
  forms: any[] = [] ;

  constructor (private ficheService: FicheService, private activated: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDetails() ;
  }

  /************
  * FUNCTIONS *
  ************/
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

  // Récupérer les détails
  async getDetails() {
    this.idFiche = this.activated.snapshot.params['id'] ;
    this.showElement() ;
    this.showRecapitulation() ;
  }

  // Ajouter une réparation
  saveReparation() {
    this.ficheService.saveReparation(this.idFiche, this.nouvelleReparationForm).subscribe((result) => {
      if (result.error) this.error_saveReparation = result.error ;
      else {
        this.resetNouvelleReparationForm() ;
        this.error_saveReparation = '' ;
        this.showElement() ;
        this.showRecapitulation() ;
      }
    }) ;
  }

  // Modifier une réparation
  updateReparation(index: number) {
    this.ficheService.updateReparation(this.idFiche, this.forms[index]).subscribe((result) => {
      this.showElement() ;
      this.showRecapitulation() ;
    }) ;
  }

  // Supprimer une réparation
  deleteReparation(idReparation: string) {
    this.ficheService.deleteReparation(this.idFiche, idReparation).subscribe((result) => {
      this.showElement() ;
      this.showRecapitulation() ;
    }) ;
  }

  // Supprimer un état
  deleteEtat(idEtat: string) {
    this.ficheService.deleteEtat(this.idFiche, idEtat).subscribe((result) => {
      if (result.error) this.error_deleteEtat = result.error ;
      else {
        this.error_deleteEtat = '' ;
        this.showElement() ;
        this.showRecapitulation() ;
      }
    }) ;
  }

  /********
  * UTILS *
  ********/
  // Reset Nouvelle réparation Formulaire
  resetNouvelleReparationForm() {
    this.nouvelleReparationForm.intitule = '' ;
    this.nouvelleReparationForm.datedebut = '' ;
    this.nouvelleReparationForm.datefin = '' ;
    this.nouvelleReparationForm.description = '' ;
    this.nouvelleReparationForm.prix = 0 ;
    this.nouvelleReparationForm.avancement = 0 ;
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
