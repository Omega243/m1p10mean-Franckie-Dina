import { FinanceService } from './../../services/finance.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-depense-historique',
  templateUrl: './depense-historique.component.html',
  styleUrls: ['./depense-historique.component.css']
})
export class DepenseHistoriqueComponent {

  // Liste des mois
  months: any = [] ;
  years: any = [] ;

  // Mois et année de recherche
  mois: number = 1 ;
  annee: number = 1 ;

  // Liste des dépenses
  result: any ;

  constructor (private financeService: FinanceService) { }

  // Init the Month and Year with current Month and Year and List It
  ngOnInit(): void {
    // Init fields
    const today = new Date() ;
    this.mois = today.getMonth() + 1 ;
    this.annee = today.getFullYear() ;

    this.months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'] ;
    for (let year=this.annee; year>=this.annee - 5; year--) this.years.push(year) ;

    this.listeDepenses() ;
  }

  // Liste des dépenses
  listeDepenses() {
    this.financeService.depenses(this.mois, this.annee).subscribe((result) => {
      this.result = result ;
    }) ;
  }

  // Supprimer une dépense
  deleteDepense(idDepense: string) {
    this.financeService.deleteDepense(idDepense).subscribe((result) => {
      this.listeDepenses() ;
    }) ;
  }


}
