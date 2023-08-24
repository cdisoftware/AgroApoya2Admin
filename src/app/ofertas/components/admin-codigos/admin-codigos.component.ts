import { Component, OnInit, ViewChild } from '@angular/core';
import { MetodosglobalesService } from './../../../core/metodosglobales.service'
import { ValorarofertaService } from './../../../core/valoraroferta.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-codigos',
  templateUrl: './admin-codigos.component.html',
  styleUrls: ['./admin-codigos.component.css']
})
export class AdminCodigosComponent implements OnInit {

  @ViewChild('ModalEditar', { static: false }) ModalEditar: any;
  IdDescuento: string = '0';
  ArrayTDescuento: any = [];
  IdAplica: string = '0';
  ArrayAplica: any = [];
  FechaCreacion: string = '0';
  IdOferta: string = '';
  IdEstado: string = '0';
  ArrayEstados: any = [];
  ArrayConsulta: any = [];

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
    var oferta = '0'
    if (this.IdOferta != '') {
      oferta = this.IdOferta
    }
    const datos = {
      FechaCreacion: this.FechaCreacion
    }
    console.log(this.IdDescuento + this.IdAplica + oferta)
    this.ServiciosValorar.ConsultaCupones('1', this.IdDescuento, this.IdAplica, oferta, this.IdEstado, datos).subscribe(Resultado => {
      this.ArrayConsulta = Resultado
      console.log(Resultado)
    })
  }

  AbrirEditar(Registro: any) {
    this.modalService.open(this.ModalEditar, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  }

}
