import { Component } from '@angular/core';
import { FinanceService } from 'src/app/services/finance.service';

@Component({
  selector: 'app-chiffre-mensuel',
  templateUrl: './chiffre-mensuel.component.html',
  styleUrls: ['./chiffre-mensuel.component.css']
})
export class ChiffreMensuelComponent {

  // Data
  result: any ;

  // Liste des mois
  months: any = [] ;
  years: any = [] ;

  // Mois et année de recherche
  mois: number = 1 ;
  annee: number = 1 ;

  constructor(private financeService: FinanceService) {}

  ngOnInit(): void {
    // Init fields
    const today = new Date() ;
    this.mois = today.getMonth() + 1 ;
    this.annee = today.getFullYear() ;

    this.months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'] ;
    for (let year=this.annee; year>=this.annee - 5; year--) this.years.push(year) ;

    this.chiffreMensuel() ;
  }

  // Récupère le chiffre d'affaire mensuel
  chiffreMensuel() {
    this.financeService.chiffreMensuel(this.mois, this.annee).subscribe((result) => {
      this.result = result ;
    }) ;
  }

}
