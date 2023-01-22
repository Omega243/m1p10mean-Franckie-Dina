import { FicheService } from './../../services/fiche.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent {

  fiches: any ;
  nextSteps: any[] = [] ;

  // Gestion des erreurs
  nextStepError: string = '' ;
  nextStepSuccess: string = '' ;

  constructor(private ficheService: FicheService) { }

  ngOnInit(): void {
    this.ficheReception() ;
  }

  // Ajouter la prochaine étape
  nextStep(idFiche: string) {
    this.ficheService.next(idFiche).subscribe((result) => {
      if (result.error) {
        this.nextStepError = result.error ;
        this.nextStepSuccess = '' ;
      } else {
        this.nextStepSuccess = result.success ;
        this.nextStepError = '' ;
        this.ficheReception() ;
      }
    })
  }

  // Liste des fiches récéptionnées
  ficheReception() {
    this.ficheService.ficheReception().subscribe((result) => {
      this.fiches = result ;
      this.initNextStep(result) ;
    }) ;
  }

  // Init la prochaine étape pour chaque fiche
  initNextStep(fiches: any) {
    this.nextSteps = [] ;
    for (const fiche of fiches) {
      this.ficheService.getNextStep(fiche._id).subscribe((result) => {
        this.nextSteps.push(result) ;
      })
    }
  }

}
