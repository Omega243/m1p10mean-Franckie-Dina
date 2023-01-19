import { FicheService } from './../../services/fiche.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-non-reception',
  templateUrl: './non-reception.component.html',
  styleUrls: ['./non-reception.component.css']
})
export class NonReceptionComponent {

  constructor(private ficheService: FicheService) {}

}
