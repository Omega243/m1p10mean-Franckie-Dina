import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SToolsService } from 'src/app/services/s-tools.service';
import { SUsersService } from 'src/app/services/s-users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  message : any;
  roles : any;

  idrole : any;
  email : any;
  mdp : any;

  id : any;
  user : any;

  constructor(private serv : SUsersService , private router : Router, private activatedRoute : ActivatedRoute , private tool : SToolsService) { }

  ngOnInit(): void {

    this.id=this.activatedRoute.snapshot.paramMap.get("id");
    if(this.id!=null){
      this.findById();
    }
    this.getRoles();
    this.generatePassword();
  }

  getRoles(){
    const success = response => {
      if(response['status']==200){
        this.roles=response['data'];

      } else {
        this.message="Pas de services disponible.";
      }
    }

    const error = response => {
      this.message="Erreur de chargement de la page.";
    }
    this.serv.getRoles().subscribe(success,error);
  }

  findById(){
    const success = response => {
      if(response['status']==200){
        this.user = response['data'];
        console.log(this.user);
        this.email = this.user.email;
        this.idrole = this.user.idTypeUser;
      } else {
        this.message="ERREUR!";
      }
    }

    const error = response => {
      this.message="Erreur de chargement de la page.";
    }
    this.serv.getById(this.id).subscribe(success,error);
  }

  ajouter(){
    if(this.email==null || this.idrole==null || this.mdp==null){
      this.message = "Tous les champs sont obligatoires.";
    } else {
      if(!this.email.includes("@")){
        this.message = "Email invalide .";
      } else {
        const success = response => {
          if(response['status'] == 200){
            const data = response['data'];
            // this.logServ.setUser(data);
            this.router.navigate(["/user/list"]);
          }else{
            this.message = response['message'];
          }
        };
        const error = response => {
          this.message = "Erreur de connexion";
        }
        this.serv.add(this.idrole, this.email, this.mdp).subscribe(success, error);
      }
    }


  }

  update(){
    this.user.id = this.id ;
    this.user.email = this.email ;
    this.user.idTypeUser = this.idrole;
    const success = response => {
      if(response['status']==200){
        this.router.navigate(["/user/list"]);
      } else {
        this.message="Erreur lors de la modification , veuillez réessayez.";
      }
    }

    const error = response => {
      this.message="Erreur de chargement de la page.";
    }
    this.serv.update(this.user).subscribe(success,error);
  }

  generatePassword(){
    const success = response => {
      if(response['status'] == 200){
        this.mdp = response['data'];
        // this.router.navigateByUrl('/dashboard');
      }else{
        this.message = response['message'];
      }
    };
    const error = response => {
      this.message = "Erreur de connexion";
    }
    this.tool.generatePassword().subscribe(success, error);
  }
}
