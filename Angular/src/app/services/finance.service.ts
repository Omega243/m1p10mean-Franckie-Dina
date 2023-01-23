import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient) { }

  // Bilan mensuel
  bilanMensuel(mois: number, annee: number): Observable<any> {
    const url = environment.BASE_URL+environment.finance_url+'/bilan/'+mois+'/'+annee ;
    return this.http.get(url) ;
  }

  // Chiffre d'affaire mensuel
  chiffreMensuel(mois: number, annee: number): Observable<any> {
    const url = environment.BASE_URL+environment.finance_url+'/affaires/'+mois+'/'+annee ;
    return this.http.get(url) ;
  }

  // Validation de paiement
  validePaiement(idFiche: string, remise: number, datepaiement: string): Observable<any> {
    const url = environment.BASE_URL+environment.finance_url+'/'+idFiche+'/paiement' ;
    const form = {
      remise: remise,
      datepaiement: datepaiement
    } ;
    return this.http.put(url, form) ;
  }

  // Chiffre d'affaire journallier
  chiffrejournalier(mois: number, annee: number): Observable<any> {
    const url = environment.BASE_URL+environment.finance_url+'/affaires/journaliers/'+mois+'/'+annee ;
    return this.http.get(url) ;
  }

  // Supprimer une dépense
  deleteDepense(id: string): Observable<any> {
    const url = environment.BASE_URL+environment.finance_url+'/depenses/'+id+'/delete' ;
    return this.http.delete(url) ;
  }

  // Liste des dépenses mensuels
  depenses(mois: number, annee: number): Observable<any> {
    const url = environment.BASE_URL+environment.finance_url+'/depenses/'+mois+'/'+annee ;
    return this.http.get(url) ;
  }

  // Liste des fiches Non-payeés
  fichesNonPaye(): Observable<any> {
    const url = environment.BASE_URL+environment.finance_url+'/fiches/non-paye' ;
    return this.http.get(url) ;
  }

  // Enregistrement d'une dépense
  saveDepense(form: any): Observable<any> {
    const url = environment.BASE_URL+environment.finance_url+'/depense' ;
    return this.http.post(url, form) ;
  }

}
