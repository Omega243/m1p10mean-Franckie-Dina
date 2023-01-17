import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { base_url } from 'src/environments/environment';
import { user } from 'src/environments/environment';
import { SToolsService } from './s-tools.service';

@Injectable({
  providedIn: 'root'
})
export class SRegisterService {

  constructor(private http : HttpClient, private tools : SToolsService) { }

  register(nom:string , prenom:string, mail:string, password:string, contact:BigInteger){
    var url = base_url+'register';
    let input = {
      nom : nom,
      prenom : prenom,
      mail : mail,
      mdp : password,
      contact : contact
    }

    return this.http.post(url, input);
  }

  setUser (data : any) {
    localStorage.setItem('nom', data.nom);
    sessionStorage.setItem('prenom', data.prenom);
    sessionStorage.setItem('mail',data.mail);
    sessionStorage.setItem('mdp',data.mdp);
    sessionStorage.setItem('contact',data.contact)
  }

}
