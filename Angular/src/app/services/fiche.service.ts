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
  // URL Rattached with => FICHE <=

  constructor(private http: HttpClient) {}

  // Recherche avancée
  rechercheAvance(form: any): Observable<any> {
    const url = environment.BASE_URL+environment.fiche_url+'/recherche/historique' ;
    return this.http.post(url, form) ;
  }

  // Liste des fiches VALIDE pour SORTIE
  valideSortie(): Observable<any> {
    const url = environment.BASE_URL+environment.fiche_url+'/fiches/valide-sortie' ;
    return this.http.get(url) ;
  }

  // Liste des fiches demandant un billet de sortie
  demandeSortie(): Observable<any> {
    const url = environment.BASE_URL+environment.fiche_url+'/fiches/demandesortie' ;
    return this.http.get(url) ;
  }

  // Liste des fiches récupérable d'un client
  recuperableClient(idClient: string): Observable<any> {
    const url = environment.BASE_URL+environment.fiche_url+'/users/'+idClient+'/recuperations' ;
    return this.http.get(url) ;
  }

  // Liste des fiches en attentes de récupération
  enAttenteRecuperation(): Observable<any> {
    const url = environment.BASE_URL+environment.fiche_url+'/fiches/attenterecuperation' ;
    return this.http.get(url) ;
  }

  // Récupérer la prochaine étape d'une fiche
  getNextStep(idFiche: string): Observable<any> {
    const url = environment.BASE_URL+environment.fiche_url+'/'+idFiche+'/next' ;
    return this.http.get(url) ;
  }

  // Liste des fiches récéptionnées
  ficheReception(): Observable<any> {
    const url = environment.BASE_URL+environment.fiche_url+'/fiches/receptionnees' ;
    return this.http.get(url) ;
  }

  // Récapitulation d'une fiche
  ficheRecapitulation(id: string): Observable<any> {
    const url = environment.BASE_URL+environment.fiche_url+'/fiche/recapitulation/'+id ;
    return this.http.get(url) ;
  }

  // Liste des fiches pour un Client
  ficheClient(iduser: string): Observable<any> {
    const url = environment.BASE_URL+environment.fiche_url+'/users/'+iduser ;
    return this.http.get(url) ;
  }

  // Ajouter la prochaine étape à une fiche
  next(idFiche: string): Observable<any> {
    const url = environment.BASE_URL+environment.fiche_url+'/'+idFiche+'/next' ;
    return this.http.put(url, {}) ;
  }

  // Liste des voitures déposées non-récéptionnées
  getFicheDeposeNonReceptionne(): Observable<any> {
    const url = environment.BASE_URL+environment.fiche_url+this.deposeNonReception_url ;
    return this.http.get(url) ;
  }

  // Ajouter une réparation
  saveReparation(idFiche: string, form: any): Observable<any> {
    const url = environment.BASE_URL+environment.fiche_url+'/'+idFiche+'/reparation' ;
    return this.http.post(url, form) ;
  }

  // Détails de fiche
  getDetails(id: string): Observable<any> {
    const url = environment.BASE_URL+environment.fiche_url+'/'+id ;
    return this.http.get(url) ;
  }

  // Supprimer une réparation
  deleteReparation(idFiche: string, idReparation: string): Observable<any> {
    const url = environment.BASE_URL+environment.fiche_url+'/'+idFiche+'/reparations/'+idReparation ;
    return this.http.delete(url) ;
  }

  // Supprimer un état
  deleteEtat(idFiche: string, idEtat: string): Observable<any> {
    const url = environment.BASE_URL+environment.fiche_url+'/'+idFiche+'/etats/'+idEtat ;
    return this.http.delete(url) ;
  }

  // Modifier une réparation
  updateReparation(idFiche: string, form: any): Observable<any> {
    const url = environment.BASE_URL+environment.fiche_url+'/'+idFiche+'/reparations/'+form.id ;
    return this.http.put(url, form) ;
  }

}
