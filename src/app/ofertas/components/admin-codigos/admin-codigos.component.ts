import { Component, OnInit } from '@angular/core';
import { MetodosglobalesService } from './../../../core/metodosglobales.service'
import { ValorarofertaService } from './../../../core/valoraroferta.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-codigos',
  templateUrl: './admin-codigos.component.html',
  styleUrls: ['./admin-codigos.component.css']
})
export class AdminCodigosComponent implements OnInit {

  IdDescuento: string = '';
  ArrayTDescuento: any = [];
  IdAplica: string = '';
  ArrayAplica: any = [];
  FechaCreacion: string = '';
  IdOferta: string = '';
  IdEstado: string = '';
  ArrayEstados: any = [];

  constructor(
    private SeriviciosGenerales: MetodosglobalesService,
    private ServiciosValorar: ValorarofertaService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

    this.CargarListas();

  }

  CargarListas() {
    this.ServiciosValorar.ConsultaTipoCupon('2').subscribe(Resultado => {
      this.ArrayTDescuento = Resultado
    })

    this.ServiciosValorar.ConsultaAplicable('1').subscribe(Resultado => {
      this.ArrayAplica = Resultado;
    })


  }

  SelDesc(iddesc: any) {
    this.IdDescuento = iddesc;
  }

  SelAplica(idaplica: any) {
    this.IdAplica = idaplica;
  }

  SelEstado(idestado: any) {
    this.IdEstado = idestado;
  }

  Buscar() {
    
  }

}
