import { Component } from '@angular/core';
import { FicheService } from 'src/app/services/fiche.service';

@Component({
  selector: 'app-recuperable',
  templateUrl: './recuperable.component.html',
  styleUrls: ['./recuperable.component.css']
})
export class RecuperableComponent {

  fiches: any ;
  nextSteps: any[] = [] ;

  // Gestion des erreurs
  nextStepError: string = '' ;
  nextStepSuccess: string = '' ;

  constructor(private ficheService: FicheService) { }

  ngOnInit(): void {
    this.ficheUser() ;
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
        this.ficheUser() ;
      }
    })
  }

  // Liste des fiches Récupérable
  ficheUser() {
    const login = JSON.parse(localStorage.getItem('login')!) ;
    const iduser = login.iduser ;
    this.ficheService.recuperableClient(iduser).subscribe((result) => {
      this.fiches = result ;
      this.initNextStep(result) ;
    }) ;
  }

  // Envoyer la demande de récupération
  demandeRecuperation(idFiche: string) {
    this.ficheService.next(idFiche).subscribe((result) => {
      this.ficheUser() ;
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
