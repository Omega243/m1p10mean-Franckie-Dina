import { FicheService } from 'src/app/services/fiche.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent {

  // Résultats de recherche
  result: any ;
  search: boolean = false ;

  // Formulaire de recherche
  rechercheForm: any = {
    user: '' ,
    matricule: '' ,
    etatpaiement: -1 ,
    reparation: '' ,
    dateinf: '' ,
    datesup: ''
  } ;

  constructor (private ficheService: FicheService) {}

  ngOnInit(): void {
    const login = JSON.parse(localStorage.getItem('login')!) ;
    this.rechercheForm.use = login.iduser ;
    this.result = [] ;
    this.search = false ;
  }

  // Recherche
  recherche() {
    this.ficheService.rechercheAvance(this.rechercheForm).subscribe((result) => {
      this.result = result ;
      this.search = true ;
    }) ;
  }

}
