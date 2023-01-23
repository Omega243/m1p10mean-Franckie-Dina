import { Component } from '@angular/core';
import { FicheService } from 'src/app/services/fiche.service';

@Component({
  selector: 'app-valide-sortie',
  templateUrl: './valide-sortie.component.html',
  styleUrls: ['./valide-sortie.component.css']
})
export class ValideSortieComponent {

  fiches: any;

  constructor (private ficheService: FicheService) { }

  ngOnInit(): void {
    this.valideSortie() ;
  }

  // Récéptionner
  recept(idFiche: string){
    this.ficheService.next(idFiche).subscribe((result) => {
      this.valideSortie() ;
    }) ;
  }

  // Liste des fiches possédant un billet de sortie
  valideSortie() {
    this.ficheService.valideSortie().subscribe((result) => {
      this.fiches = result ;
    }) ;
  }

}
