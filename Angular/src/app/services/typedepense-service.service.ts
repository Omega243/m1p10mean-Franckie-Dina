import { environment } from 'src/environments/environment.dev';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypedepenseService {

  constructor(private http: HttpClient) { }

  // Liste des types de dépense
  findAll(): Observable<any> {
    const url = environment.BASE_URL+environment.typedepense_url ;
    return this.http.get(url) ;
  }

}
