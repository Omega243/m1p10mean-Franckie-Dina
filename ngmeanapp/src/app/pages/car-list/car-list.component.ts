import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { VoitureService } from 'src/app/services/voiture.service';
import { SToolsService } from 'src/app/services/s-tools.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

  voitures: any;
  message:any;
  status:any;

  idCurrent : any;

  cols : any;
  first : number = 0;
  constructor(private carserv: VoitureService, private tools: SToolsService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();

    this.cols = [
      { field : 'matricule' , header : 'License plate'},
      { field : 'marque' , header : 'Mark'},
      { field: 'type', header : 'Type'}
    ];
  }

  loadData(){
    const success = response => {
      if(response['status']==200){
        this.voitures=response['data'];
        // this.dtTrigger.next();
      } else {
        this.message="Pas de voiture disponible.";
      }
    }

    const error = response => {
      this.message="Erreur de chargement de la page.";
    }
    this.carserv.getList().subscribe(success,error);
  }

  supprimer(){
    const success = response => {
      if(response['status']==200){
        this.loadData();
      } else {
        this.message="Erreur de suppression , veuillez réessayez.";
      }
    }

    const error = response => {
      this.message="Erreur de chargement de la page.";
    }
    this.carserv.delete(this.idCurrent).subscribe(success,error);
  }

  reset() {
    this.first = 0;
  }

}
