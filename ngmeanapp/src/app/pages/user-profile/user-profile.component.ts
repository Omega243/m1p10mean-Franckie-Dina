import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SUsersService } from 'src/app/services/s-users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user : any;
  nom:any;
  prenom:any;
  mail:any;
  mdp : any;
  mdpConf : any;
  contact:any;
  role:any;

  _id : any;

  success : any;

  message : any;

  constructor(private service : SUsersService, private router : Router) { }

  ngOnInit(): void {
    this._id = sessionStorage.getItem("_id");
    console.log(this._id);
    this.loadData();
  }

  loadData(){
    const success = response => {
      if(response['status']==200){
        this.user = response['data'];
        this.nom = this.user.nom;
        this.prenom = this.user.nom;
        this.mail = this.user.mail;
        this.contact = this.user.contact;
        this.role = this.user.role;
        this._id = this.user._id;
        console.log(this.user);
      } else {
        this.message="ERREUR!";
      }
    }

    const error = response => {
      this.message="Erreur de chargement de la page.";
    }
    this.service.getById(this._id).subscribe(success,error);
  }

  update(){
    if(this.mdp!=this.mdpConf){
      this.message = "Veuillez vérifier votre nouveau mot de passe.";
    } else {
      let user = {
        id : this._id,
        email : this.mail,
        mdp : this.mdp
      }

      console.log(user);

      const success = response => {
        if(response['status']==200){
          this.success = "Vos modifications ont été enregistrés avec succès !";
          this.router.navigateByUrl('/profile');
        } else {
          this.message="ERREUR!";
        }
      }

      const error = response => {
        this.message="Erreur de chargement de la page.";
      }
      this.service.updateProfil(user).subscribe(success,error);
    }

  }

}
