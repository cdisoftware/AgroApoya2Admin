import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluacionoferta',
  templateUrl: './evaluacionoferta.component.html',
  styleUrls: ['./evaluacionoferta.component.css']
})
export class EvaluacionofertaComponent implements OnInit {
  ValidaDetalle: string;
  DataOfertas: any = [];
  NOferta: string;
  keyword: string;
  COferta: string;
  TPregunta: string;

  constructor() { }

  ngOnInit(): void {
  }

  Limpiar() {
    this.ValidaDetalle = '0';
    this.NOferta = '';
    this.COferta = '';
    this.TPregunta = '';
  }

  BuscaEvaluacion() {
    this.ValidaDetalle = '1';
  }

  selectNomOferta(oferta: any) {

  }

}
