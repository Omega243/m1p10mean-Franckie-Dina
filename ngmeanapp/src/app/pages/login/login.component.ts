import { Component, OnInit, OnDestroy } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service'
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router';
import { SUsersService } from 'src/app/services/s-users.service';
import { ActivatedRoute} from '@angular/router';
import { SToolsService } from 'src/app/services/s-tools.service';
import { base_url } from 'src/environments/environment';
import { user } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  // roles : any;

  // type : any;
  // id : any;
  // user : any;

  mail : any;
  mdp : any;

  isLogin: boolean = false
  message: any
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router:Router,
    private serv : SUsersService,
    private activatedRoute : ActivatedRoute ,
    private tools : SToolsService,
    private http : HttpClient
  ) { }

  ngOnInit() {
    this.isUserLogin();

    // this.id=this.activatedRoute.snapshot.paramMap.get("id");
    // if(this.id!=null){
    //   this.findById();
    // }
    // this.getRoles();
  }

  // getRoles(){
  //   const success = response => {
  //     if(response['status']==200){
  //       this.roles=response['data'];

  //     } else {
  //       this.message="Pas de services disponible.";
  //     }
  //   }

  //   const error = response => {
  //     this.message="Erreur de chargement de la page.";
  //   }
  //   this.serv.getRoles().subscribe(success,error);
  // }

  // findById(){
  //   const success = response => {
  //     if(response['status']==200){
  //       this.user = response['data'];
  //       console.log(this.user);
  //       this.email = this.user.email;
  //       this.type = this.user.type;
  //     } else {
  //       this.message="ERREUR!";
  //     }
  //   }

  //   const error = response => {
  //     this.message="Erreur de chargement de la page.";
  //   }
  //   this.serv.getById(this.id).subscribe(success,error);
  // }


  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
    this._api.postTypeRequest('users/login', form.value).subscribe((res: any) => {

      if (res.status) {
        const data = res['data'];
        this._auth.setUser(data);
        this._auth.setUser(res.token);
        this._router.navigate(['/dashboard']);
        console.log("Hello Success!");
      }else{
        this.message = res.message;
        console.log("diso");
        this.message = "Connection error.";
      }
      this._auth.authenticate(this.mail, this.mdp);
    });
  }
  isUserLogin(){
    if(this._auth.getUserDetails() != null){
        this.isLogin = true;
    }
  }
  logout(){
    this._auth.clearStorage()
    this._router.navigate(['/login']);
  }

  ngOnDestroy() {
  }
}

