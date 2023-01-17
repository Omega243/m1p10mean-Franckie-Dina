import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service'
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router';
import { SToolsService } from 'src/app/services/s-tools.service';
import { base_url } from 'src/environments/environment';
import { user } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  nom : any;
  prenom:any;
  mail : any;
  mdp : any;
  contact : any;

  isLogin: boolean = false
  message: any
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router:Router,
    private tools : SToolsService,
    private http : HttpClient
  ) { }
  ngOnInit() {
    this.isUserLogin();
  }

  onSubmit(form: NgForm) {
    this._api.postTypeRequest('user/register', form.value).subscribe((res: any) => {
      if (res.status) {
        const data = res['data'];
        this._auth.setUser(data);
        this._auth.setUser(res.token);
        this._router.navigate(['/login']);
        console.log("Succès de registre");
      } else {
        console.log(res)
        alert(res.message)
        this.message = "Erreur de registre.";
      }
      this._auth.register(this.nom,this.prenom,this.mail,this.mdp,this.contact);
    });

}
  isUserLogin(){

    if(this._auth.getUserDetails() != null){
        this.isLogin = true;
    }
  }
}
