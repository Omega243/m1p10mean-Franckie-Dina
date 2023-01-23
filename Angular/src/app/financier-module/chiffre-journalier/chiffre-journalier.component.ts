import { FinanceService } from './../../services/finance.service';
import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-chiffre-journalier',
  templateUrl: './chiffre-journalier.component.html',
  styleUrls: ['./chiffre-journalier.component.css']
})
export class ChiffreJournalierComponent {

  // Data & Graphe
  result: any ;
  chart: any ;

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

    // Create chart
    this.chiffreJournalier(false) ;
  }

  // Récupère le chiffre d'affaire journalier
  chiffreJournalier(toDestroy: boolean) {
    this.financeService.chiffrejournalier(this.mois, this.annee).subscribe((result) => {
      this.result = result ;
      if (toDestroy) this.chart.destroy() ;
      this.createChart(result) ;
    })
  }

  // Chart Creation
  createChart(result: any){
    let xAxe = [] ;
    let yAxe = [] ;
    for (let index=0; index<result.calendar.length; index++) {
      xAxe.push(index+1) ;
      yAxe.push(result.calendar[index].total) ;
    }

    this.chart = new Chart("MyChart", {
      type: 'line',

      data: {
        labels: xAxe,
	       datasets: [
          {
            label: "Montant (Ar)",
            data: yAxe,
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true ,
            text: 'Représentation grahique du Chiffre d\'affaire'
          }
        } ,
        aspectRatio:2.5
      }

    });
  }

}
