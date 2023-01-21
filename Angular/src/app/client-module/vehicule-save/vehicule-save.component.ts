import { VoitureService } from './../../services/voiture.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-vehicule-save',
  templateUrl: './vehicule-save.component.html',
  styleUrls: ['./vehicule-save.component.css']
})
export class VehiculeSaveComponent {

  /********************
   * NOUVEAU VEHICULE *
   *******************/
  // Form pour un nouveau véhicule
  nouveauForm: any = {
    matricule: '' ,
    type: '' ,
    marque: ''
  } ;

  // Contrôle des erreurs
  nouveauError: string = '' ;
  nouveauSuccess: string = '' ;

  // Constructor
  constructor(private voitureService: VoitureService) { }

  // Enregistrement de nouveau véhicule
  saveVehicule() {
    this.voitureService.saveVehicule(this.nouveauForm).subscribe((result) => {
      if (result.error) {
        this.nouveauSuccess = '' ;
        this.nouveauError = result.error ;
      } else {
        this.nouveauError = '' ;
        this.nouveauSuccess = result.success ;
        this.initNouveauForm() ;
      }
    }) ;
  }

  initNouveauForm() {
    this.nouveauForm.matricule = '' ;
    this.nouveauForm.type = '' ;
    this.nouveauForm.marque = '' ;
  }

}
