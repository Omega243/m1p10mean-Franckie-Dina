import { FinanceService } from './../../services/finance.service';
import { TypedepenseService } from './../../services/typedepense-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-depense-save',
  templateUrl: './depense-save.component.html',
  styleUrls: ['./depense-save.component.css']
})
export class DepenseSaveComponent {

  typedepenses: any ;

  // Formulaire d'une nouvelle dépense
  nouveauForm: any = {
    datedepense: '' ,
    typedepense: '' ,
    montant: 0 ,
    description: ''
  } ;

  // Gestion des erreurs
  nouveauSuccess: string = '' ;
  nouveauError: string = '' ;

  constructor(private typedepenseService: TypedepenseService, private financeService: FinanceService) { }

  // Init la liste des types de dépenses
  ngOnInit(): void {
    this.typedepenseService.findAll().subscribe((result) => {
      this.typedepenses = result ;
    }) ;
  }

  // Enregistrement d'une nouvelle dépense
  saveDepense() {
    this.financeService.saveDepense(this.nouveauForm).subscribe((result) => {
      if (result.error) {
        this.nouveauSuccess = '' ;
        this.nouveauError = result.error ;
      } else {
        this.nouveauError = '' ;
        this.nouveauSuccess = result.success ;
        this.resetNouveauForm() ;
      }
    }) ;
  }

  resetNouveauForm() {
    this.nouveauForm.datedepense = '' ;
    this.nouveauForm.typedepense = '' ;
    this.nouveauForm.montant = 0 ;
    this.nouveauForm.description = '' ;
  }

}
