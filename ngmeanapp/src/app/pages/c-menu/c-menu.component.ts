import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SToolsService } from 'src/app/services/s-tools.service';

@Component({
  selector: 'app-c-menu',
  templateUrl: './c-menu.component.html',
  styleUrls: ['./c-menu.component.scss']
})
export class CMenuComponent implements OnInit {

  user:any;
  constructor() { }

  ngOnInit(): void {
  }

}
