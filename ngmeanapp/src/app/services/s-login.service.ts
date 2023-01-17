import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { base_url } from 'src/environments/environment';
import { user } from 'src/environments/environment';
import { SToolsService } from './s-tools.service';

@Injectable({
  providedIn: 'root'
})
export class SLoginService {

  constructor(private http : HttpClient, private tools : SToolsService) { }

  authenticate(login:string , password:string){
    var url = base_url+'login';
    let input = {
      mail : login,
      mdp : password
    }

    return this.http.post(url, input);
  }

  setUser (data : any) {
    localStorage.setItem('nom', data.nom);
    sessionStorage.setItem('prenom', data.prenom);
    sessionStorage.setItem('mail',data.mail);
    sessionStorage.setItem('mdp',data.mdp);
    sessionStorage.setItem('contact',data.contact);
    sessionStorage.setItem('role',data.role);
  }

    logout(){
    localStorage.clear();
    sessionStorage.clear();
    var urlLogout = base_url+'logout/'+user._id;
    const options = this.tools.formOption(true);
    return this.http.delete(urlLogout , options);
  }

  forgotPassword(mail){
    const options = this.tools.formOption(true);
    return this.http.get(base_url+"/motdepasse/"+mail,  options);
  }

}
