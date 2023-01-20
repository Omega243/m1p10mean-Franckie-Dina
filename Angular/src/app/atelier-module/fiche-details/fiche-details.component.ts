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

  // Form de la réparation
  forms: any[] = [] ;

  constructor (private ficheService: FicheService, private activated: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDetails() ;
  }

  /************
  * FUNCTIONS *s
  ************/
  // Récupérer les détails
  getDetails() {
    this.idFiche = this.activated.snapshot.params['id'] ;
    this.showElement() ;
  }

  // Ajouter une réparation
  saveReparation() {
    this.ficheService.saveReparation(this.idFiche, this.nouvelleReparationForm).subscribe((result) => {
      this.resetNouvelleReparationForm() ;
      this.showElement() ;
    }) ;
  }

  // Modifier une réparation
  updateReparation(index: number) {
    this.ficheService.updateReparation(this.idFiche, this.forms[index]).subscribe((result) => {
      this.showElement() ;
    }) ;
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

      console.log(this.etats) ;

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
