import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { FinanceService } from 'src/app/services/finance.service';

@Component({
  selector: 'app-bilan-mensuel',
  templateUrl: './bilan-mensuel.component.html',
  styleUrls: ['./bilan-mensuel.component.css']
})
export class BilanMensuelComponent {

  // Data
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

    this.bilanMensuel() ;
  }

  // Récupère le chiffre d'affaire mensuel
  bilanMensuel() {
    this.financeService.bilanMensuel(this.mois, this.annee).subscribe((result) => {
      this.result = result ;
      if (this.chart) this.chart.destroy() ;
      this.createChart(result) ;
    }) ;
  }

  // Chart Creation
  createChart(result: any){
    let value = [] ;
    value.push(result.affaires.total) ;
    value.push(result.depenses.total) ;
    value.push(result.benefice) ;
    value.push(result.perte) ;

    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: ['Recette', 'Dépense', 'Bénéfice', 'Perte'],
        datasets: [
          {
            label: '' ,
            data: value,
            backgroundColor: [
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 52, 0.5)',
              'rgba(255, 99, 132, 0.5)',
            ]
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true ,
            text: 'Représentation graphique du Bilan Financier'
          }
        } ,
        aspectRatio:2.5
      }

    });
  }

}
