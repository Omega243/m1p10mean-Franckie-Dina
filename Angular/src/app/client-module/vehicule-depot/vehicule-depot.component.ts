import { VoitureService } from './../../services/voiture.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-vehicule-depot',
  templateUrl: './vehicule-depot.component.html',
  styleUrls: ['./vehicule-depot.component.css']
})
export class VehiculeDepotComponent {

  // Form Dépôt de véhicule
  depotForm: any = {
    matricule: '' ,
    iduser: ''
  } ;

  // Contrôle de dépôt
  depotSuccess: string = '' ;
  depotError: string = '' ;

  constructor (private voitureService: VoitureService) { }

  // Init The IdUser
  ngOnInit(): void {
    const login = JSON.parse(localStorage.getItem('login')!) ;
    this.depotForm.iduser = login.iduser ;
  }

  // Dépôt de véhicule
  depotVehicule() {
    this.voitureService.depotVehicule(this.depotForm).subscribe((result) => {
      if (result.error) {
        this.depotError = result.error ;
        this.depotSuccess = '' ;
      } else {
        this.depotError = '' ;
        this.depotSuccess = result.success ;
        this.resetDepotForm() ;
      }
    }) ;
  }

  resetDepotForm() {
    this.depotForm.matricule = '' ;
    this.depotForm.iduser = '' ;
  }

}
