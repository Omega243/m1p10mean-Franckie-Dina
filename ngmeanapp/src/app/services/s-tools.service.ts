import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { base_url } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SToolsService {

  constructor(private router : Router , private http : HttpClient) { }

  formOption(use_authorization = false){
    const options = {
      headers : {
        'Content-Type' : 'application/json',
        'mode' : 'cors',
      }
    };

    return options;
  }

  formOptionMail(use_authorization = false){
    const options = {
      headers : {
        'Content-Type' : 'multipart/form-data'
      }
    };

    return options;
  }

  checkConnection(): boolean{
    if (localStorage.getItem('token') !== null && sessionStorage.getItem('id') !== null) {
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

  generatePassword(){
    var url = base_url+"User/password";
    const options = this.formOption(true);
    return this.http.get(url, options);
  }

  // sendMail(file ,mail){
  //   var url = base_url+'sendMail';
  //   return this.http.post(url, file, mail);
  // }

  sendMail(formdata: FormData): Observable<any>{
    var url = base_url+'sendMail';
    return this.http.post(url, formdata);
  }

  // upload(mail): Observable<HttpEvent<any>> {
  //   const formData: FormData = new FormData();

  //   formData.append('mail', mail);

  //   const req = new HttpRequest('POST', `${base_url}sendMail`, formData, {
  //     reportProgress: true,
  //     responseType: 'json'
  //   });

  //   return this.http.request(req);
  // }

  getFiles(): Observable<any> {
    return this.http.get(`${base_url}/files`);
  }
}
