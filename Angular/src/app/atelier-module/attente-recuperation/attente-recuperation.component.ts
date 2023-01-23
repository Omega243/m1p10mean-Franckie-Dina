import { Component } from '@angular/core';
import { FicheService } from 'src/app/services/fiche.service';

@Component({
  selector: 'app-attente-recuperation',
  templateUrl: './attente-recuperation.component.html',
  styleUrls: ['./attente-recuperation.component.css']
})
export class AttenteRecuperationComponent {

  fiches: any ;

  constructor(private ficheService: FicheService) { }

  ngOnInit(): void {
    this.ficheAttenteRecuperation() ;
  }

  // Liste des fiches en attentes de récupération
  ficheAttenteRecuperation() {
    this.ficheService.enAttenteRecuperation().subscribe((result) => {
      this.fiches = result ;
    }) ;
  }

}
