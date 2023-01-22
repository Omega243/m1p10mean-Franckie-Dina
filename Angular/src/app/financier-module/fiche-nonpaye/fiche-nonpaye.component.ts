import { FinanceService } from './../../services/finance.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fiche-nonpaye',
  templateUrl: './fiche-nonpaye.component.html',
  styleUrls: ['./fiche-nonpaye.component.css']
})
export class FicheNonpayeComponent {

  fiches: any ;

  // Gestion des remises
  remises: any[] = [] ;

  // Date de validation
  datenow: string = '' ;

  // Gestion des erreurs
  paiementError: string = '' ;
  paiementSuccess: string = '' ;

  constructor(private financeService: FinanceService) { }

  ngOnInit(): void {
    this.ficheNonPaye() ;
  }

  // Validation d'un paiement
  validePaiement(idFiche: string, indexFiche: number) {
    const remise = this.remises[indexFiche].remise ;
    const datepaiement = this.getDateHTML(this.remises[indexFiche].datepaiement) ;
    this.financeService.validePaiement(idFiche, remise, datepaiement).subscribe((result) => {
      if (result.error) {
        this.paiementError = result.error+' à la ligne '+(indexFiche + 1) ;
        this.paiementSuccess = '' ;
      } else {
        this.paiementError = '' ;
        this.paiementSuccess = result.success ;
        this.ficheNonPaye() ;
      }
    }) ;
  }

  // Liste des fiches non-payées
  ficheNonPaye() {
    this.financeService.fichesNonPaye().subscribe((result) => {
      this.fiches = result ;
      this.initRemises(result) ;
    })
  }

  // Gestion des remises
  initRemises(fiches: any) {
    this.initDateValidation() ;
    for (const fiche of fiches) {
      this.remises.push({
        montanttotal: fiche.montanttotal ,
        remise: 0 ,
        montantremise: 0 ,
        montantapayer: fiche.montanttotal ,
        datepaiement: this.datenow
      }) ;
    }
  }

  changeRemise(index: number) {
    this.remises[index].montantremise = Math.round(this.remises[index].montanttotal * this.remises[index].remise / 100) ;
    this.remises[index].montantapayer = this.remises[index].montanttotal - this.remises[index].montantremise ;
  }

  // Init la date courante
  initDateValidation() {
    const today = new Date() ;
    const month = (today.getMonth() + 1 < 10 ? '0'+(today.getMonth()+1) : (today.getMonth()+1)) ;
    const date = (today.getDate() < 10 ? '0'+(today.getDate()) : today.getDate()) ;
    const datetimeHTML = today.getFullYear()+'-'+month+'-'+date+'T'+today.getHours()+':'+today.getMinutes() ;
    this.datenow = datetimeHTML ;
  }

  // Format the Date
  getDateHTML(value: any): string {
    if (value) {
      let variable: string = value ;
      variable = variable.replace('T', ' ') ;
      if (variable.split('\.').length == 2) return variable.split('\.')[0] ;
      return variable ;
    }
    return '' ;
  }

}
