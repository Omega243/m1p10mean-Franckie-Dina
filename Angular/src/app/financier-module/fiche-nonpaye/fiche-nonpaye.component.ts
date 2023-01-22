import { FinanceService } from './../../services/finance.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fiche-nonpaye',
  templateUrl: './fiche-nonpaye.component.html',
  styleUrls: ['./fiche-nonpaye.component.css']
})
export class FicheNonpayeComponent {

  fiches: any ;

  constructor(private financeService: FinanceService) { }

  ngOnInit(): void {
    this.ficheNonPaye() ;
  }

  // Validation d'un paiement
  validePaiement(idFiche: string) {

  }

  // Liste des fiches non-payées
  ficheNonPaye() {
    this.financeService.fichesNonPaye().subscribe((result) => {
      this.fiches = result ;
    })
  }

}
