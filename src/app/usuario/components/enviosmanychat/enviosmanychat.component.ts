import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enviosmanychat',
  templateUrl: './enviosmanychat.component.html',
  styleUrls: ['./enviosmanychat.component.css']
})
export class EnviosmanychatComponent implements OnInit {

  DataSectores: any[];
  keywordSec: string = '';

  VerOcultarCampos: string = '';
  
  constructor() { }

  ngOnInit(): void {
    this.keywordSec = 'name';
  }


  selectSector(item: any) {
     
  }

  LimpiaSector() {

  }
}
