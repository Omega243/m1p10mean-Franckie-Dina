import { environment } from 'src/environments/environment.dev';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(private http: HttpClient) { }

  // Dépôt de véhicule
  depotVehicule(form: any): Observable<any>{
    const url = environment.BASE_URL+environment.fiche_url+'/fiche' ;
    return this.http.post(url, form) ;
  }

  // Enregistrement d'un nouveau véhicule
  saveVehicule(form: any): Observable<any> {
    const url = environment.BASE_URL+environment.voiture_url+'/voiture' ;
    return this.http.post(url, form) ;
  }
}
