import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class FicheService {

  // URL Rattached with => FICHE <=
  private deposeNonReception_url: string = '/deposes/non-receptionnes' ;
  private detailsDeFiche: string = '/' ;
  // URL Rattached with => FICHE <=

  constructor(private http: HttpClient) {}

  // Liste des voitures déposées non-récéptionnées
  getFicheDeposeNonReceptionne(): Observable<any> {
    const url = environment.BASE_URL+environment.fiche_url+this.deposeNonReception_url ;
    return this.http.get(url) ;
  }

  // Détails de fiche
  getDetails(id: string): Observable<any> {
    const url = environment.BASE_URL+environment.fiche_url+this.detailsDeFiche+id ;
    return this.http.get(url) ;
  }

  // Supprimer un réparation
  deleteReparation(idFiche: string, idReparation: string) {
    const url = environment.BASE_URL+environment.fiche_url+'/'+idFiche+'/reparations/'+idReparation ;
    return this.http.delete(url) ;
  }

}
