import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SToolsService } from 'src/app/services/s-tools.service';
import { VoitureService } from 'src/app/services/voiture.service';

@Component({
  selector: 'app-car-depot',
  templateUrl: './car-depot.component.html',
  styleUrls: ['./car-depot.component.scss']
})
export class CarDepotComponent implements OnInit {

  message : any;
  matricule :any;
  marque:any;
  type:any;

  _id:any;
  user:any;

  voiture:any;

  success : any;

  constructor(private carserv : VoitureService , private router : Router, private activatedRoute : ActivatedRoute , private tool : SToolsService) { }

  ngOnInit(): void {
    this._id=this.activatedRoute.snapshot.paramMap.get("_id");
    if(this._id!=null){
      this.findById();
    }
  }

  findById(){
    const success = response => {
      if(response['status']==200){
        this.voiture = response['data'];
        console.log(this.voiture);
        this.matricule = this.voiture.matricule;
        this.marque = this.voiture.marque;
        this.type = this.voiture.type;
      } else {
        this.message="ERREUR!";
      }
    }

    const error = response => {
      this.message="Erreur de chargement de la page.";
    }
    this.carserv.getById(this._id).subscribe(success,error);
  }


  ajouter(){
    if(this.matricule==null || this.marque==null || this.type==null){
      this.message = "Tous les champs sont obligatoires.";
    } else {
        const success = response => {
          if(response['status'] == 200){
            this.success = "Voiture insérée avec succès .";
            const data = response['data'];
            this.router.navigate(["/car/list"]);
          }else{
            this.message = response['message'];
            console.log(this.message);
          }
        };
        const error = response => {
          this.message = "Error of adding";
        }
        this.carserv.add(this.matricule, this.marque, this.type).subscribe(success, error);
      }
    }


}
