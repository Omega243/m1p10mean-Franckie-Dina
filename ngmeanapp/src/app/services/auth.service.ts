// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { base_url } from "src/environments/environment";
import { user } from 'src/environments/environment';
import { AuthLayoutModule } from "../layouts/auth-layout/auth-layout.module";
import { SToolsService } from './s-tools.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private tools : SToolsService
  ) { }

  authenticate(login:string , password:string){
    var url = base_url+'login';
    let input = {
      mail : login,
      mdp : password
    }

    return this.http.post(url, input);
  }

  register(firstname:string , lastname:string, login:string , password:string, contact:string){
    var url = base_url+'login';
    let input = {
      nom: firstname,
      prenom: lastname,
      mail : login,
      mdp : password,
      contact : contact
    }

    return this.http.post(url, input);
  }

   getUserDetails() {
    if(localStorage.getItem('data')){

      return localStorage.getItem('data')

    }else{
      return null
    }

  }

  setUser (data : any) {
    localStorage.setItem('nom', data.nom);
    sessionStorage.setItem('prenom', data.prenom);
    sessionStorage.setItem('mail',data.mail);
    sessionStorage.setItem('mdp',data.mdp);
    sessionStorage.setItem('contact',data.contact);
    sessionStorage.setItem('role',data.role);
  }

  // setDataInLocalStorage(variableName, data) {
  //     localStorage.setItem(variableName, data);
  // }

  setToken(token: string): void {
    localStorage.setItem('data', token);
  }

  getToken() {
      return localStorage.getItem('data');
  }

  sLoggedIn(): boolean {
    return localStorage.getItem('data') !== null;
}

logIn(donnees: AuthLayoutModule): Observable<any> {
    return this.http.post(base_url + 'user/login',
        donnees, {observe: 'response'});
}

checkConnection(): boolean{
  if (localStorage.getItem('token') !== null && sessionStorage.getItem('_id') !== null) {
    return true;
  } else {
      return false;
  }
}

isConnected(){
  if ( !this.checkConnection()){
    this.router.navigateByUrl('/');
  }
}

logout(){
  localStorage.clear();
  sessionStorage.clear();
  var urlLogout = base_url+'logout/'+user._id;
  const options = this.tools.formOption(true);
  return this.http.delete(urlLogout , options);
}

  clearStorage() {
      localStorage.clear();
  }
}
