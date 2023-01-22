import { Component } from '@angular/core';

@Component({
  selector: 'app-chiffre-journalier',
  templateUrl: './chiffre-journalier.component.html',
  styleUrls: ['./chiffre-journalier.component.css']
})
export class ChiffreJournalierComponent {

  // Liste des mois
  months: any = [] ;
  years: any = [] ;

  // Mois et année de recherche
  mois: number = 1 ;
  annee: number = 1 ;

  constructor() {}

  ngOnInit(): void {
    // Init fields
    const today = new Date() ;
    this.mois = today.getMonth() + 1 ;
    this.annee = today.getFullYear() ;

    this.months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'] ;
    for (let year=this.annee; year>=this.annee - 5; year--) this.years.push(year) ;
  }

}
