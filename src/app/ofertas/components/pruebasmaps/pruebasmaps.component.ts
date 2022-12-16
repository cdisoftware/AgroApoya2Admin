import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pruebasmaps',
  templateUrl: './pruebasmaps.component.html',
  styleUrls: ['./pruebasmaps.component.css']
})
export class PruebasmapsComponent implements OnInit {

  //Mapa
  ValidaInsertSec: string = '1'
  geocoder = new google.maps.Geocoder();
  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  Coordenada: string = '';
  ValidaCompra: boolean = false;

  constructor() { }


  ngOnInit(): void {
  }

}
