import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient) { }

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
