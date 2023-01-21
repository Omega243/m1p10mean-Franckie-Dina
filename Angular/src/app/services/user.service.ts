import { environment } from 'src/environments/environment.dev';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Login
  login(form: any): Observable<any> {
    const url = environment.BASE_URL+environment.user_url+'/login' ;
    return this.http.post(url, form) ;
  }

  // Inscription
  inscription(form: any): Observable<any> {
    const url = environment.BASE_URL+environment.user_url+'/inscription' ;
    return this.http.post(url, form) ;
  }

}
