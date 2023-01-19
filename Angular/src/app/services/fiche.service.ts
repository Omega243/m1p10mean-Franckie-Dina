import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class FicheService {

  // URL Rattached with => FICHE <=
  private deposeNonReception_url: string = '/deposes/non-receptionnes' ;
  // URL Rattached with => FICHE <=

  // FIELDS
  deposeNonReception: any ;
  // FIELDS

  constructor(private http: HttpClient) {
    this.deposeNonReception = this.getFicheDeposeNonReceptionne() ;
    console.log(this.deposeNonReception) ;
  }

  getFicheDeposeNonReceptionne(): any {
    const url = environment.BASE_URL+environment.fiche_url+this.deposeNonReception_url ;
    return this.http.get(url).subscribe() ;
  }

}
