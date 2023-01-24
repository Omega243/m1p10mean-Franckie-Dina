import { Component } from '@angular/core';
import { FicheService } from 'src/app/services/fiche.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent {

  // Résultats de recherche
  result: any ;

  // Formulaire de recherche
  rechercheForm: any = {
    intituleuser: '' ,
    matricule: '' ,
    nbreinf: 0 ,
    nbresup: 0 ,
    reparation: '' ,
    dateinf: '' ,
    datesup: ''
  } ;

  constructor (private ficheService: FicheService) {}

  ngOnInit(): void {
    this.result = [] ;
  }

  // Recherche
  recherche() {
    this.ficheService.rechercheAvance(this.rechercheForm).subscribe((result) => {
      this.result = result ;
      console.log(result) ;
    }) ;
  }

}
