import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient) { }

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
