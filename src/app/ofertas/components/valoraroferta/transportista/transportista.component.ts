import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transportista',
  templateUrl: './transportista.component.html',
  styleUrls: ['./transportista.component.css']
})
export class TransportistaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  keyword = 'name';
  data = [
    {
      id: 1,
      name: 'Georgia'
    },
    {
      id: 2,
      name: 'Usa'
    },
    {
      id: 3,
      name: 'England'
    }
  ];

  selectSector(item: any) {

  }

  selectTrans(item: any){

  }

  LimpiaForm() {
    window.location.reload();
  }

}
