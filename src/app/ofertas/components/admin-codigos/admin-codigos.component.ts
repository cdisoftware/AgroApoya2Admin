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
  @ViewChild('ModalRespuesta', { static: false }) ModalRespuesta: any;
  IdDescuento: string = '0';
  ArrayTDescuento: any = [];
  IdAplica: string = '0';
  ArrayAplica: any = [];
  FechaCreacion: string = '0';
  IdOferta: string = '';
  IdEstado: string = '0';
  ArrayEstados: any = [];
  ArrayConsulta: any = [];
  TituloModal: string = '';
  IdDescuentoE: string = '0';
  IdAplicaE: string = '0';
  FechaInicioE: string = '0';
  FechaFinE: string = '0';
  IdOfertaE: string = '0';
  MascaraE: string = '';
  DescripcionE: string = ''
  EstadoE: string = '0'
  AplicaDesdeE: string = '0'
  AccionGuardar: string = '0';
  ValorCuponE: string = '0';
  ScriptE: string = '0';
  Respuesta: string = '';

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

  LimpiarFiltros() {
    this.IdDescuento = '0';
    this.IdAplica = '0';
    this.FechaCreacion = '0';
    this.IdOferta = '';
    this.IdEstado = '0';
    this.ArrayConsulta = []
  }

  SelDesc(iddesc: any) {
    this.IdDescuento = iddesc;
  }

  SelDescE(iddesc: any) {
    this.IdDescuentoE = iddesc;
  }

  SelAplica(idaplica: any) {
    this.IdAplica = idaplica;

  }

  SelAplicaE(idaplica: any) {
    this.IdAplicaE = idaplica;
  }

  SelEstado(idestado: any) {
    this.IdEstado = idestado;
  }

  SelEstadoE(idestado: any) {
    this.EstadoE = idestado
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

  LimpiarEditar() {
    this.IdDescuentoE = '0'
    this.IdAplicaE = '0'
    this.ValorCuponE = '0'
    this.AplicaDesdeE = '0'
    this.FechaInicioE = '0';
    this.FechaFinE = '0';
    this.IdOfertaE = '';
    this.MascaraE = '';
    this.ScriptE = '';
    this.DescripcionE = ''
  }

  AbrirEditar(Registro: any) {
    console.log(Registro)
    if (Registro == 'Nuevo') {
      this.AccionGuardar = '3'
      this.LimpiarEditar()
      this.TituloModal = 'Crear Cupon';
      this.modalService.open(this.ModalEditar, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
      
    } else {
      this.AccionGuardar = '2'
      this.TituloModal = 'Editar Cupon';
      this.modalService.open(this.ModalEditar, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
      this.IdDescuentoE = Registro.IdTipoCuponCodigoAplicableGeneral
      this.IdAplicaE = Registro.IdTipoAplicable;
      this.FechaInicioE = Registro.FechaInicio;
      this.FechaFinE = Registro.FechaFin;
      this.IdOfertaE = Registro.Cd_cnsctvo;
      this.MascaraE = Registro.codigo_Mostrar;
      this.DescripcionE = Registro.descripcion;
      this.AplicaDesdeE = Registro.ApartirValor;
      this.ValorCuponE = Registro.DescuentoAplicable;
      this.EstadoE = Registro.Estado;
      this.ScriptE = Registro.scriptAdicional
    }

  }

  GuardarCupon() {
    const DatosInsert = {
      IdGrupoAux: 0,
      codigo_Mostrar: this.MascaraE,
      descripcion: this.DescripcionE,
      IdTipoCuponGeneral: this.IdDescuentoE,
      IdTipoCuponCodigoAplicableGeneral: this.IdAplicaE,
      FechaInicio: this.FechaInicioE,
      FechaFin: this.FechaFinE,
      DescuentoAplicable: this.ValorCuponE,
      Estado: this.EstadoE,
      ApartirValor: this.AplicaDesdeE,
      scriptAdicional: this.ScriptE
    }

    this.ServiciosValorar.ModificaCupones(this.AccionGuardar, DatosInsert).subscribe(Resultado => {
      console.log(Resultado)
      var arrayrespuesta = Resultado.split('|');
      if (Resultado[0] == '-1') {
        this.Respuesta = arrayrespuesta[1]
        this.modalService.open(this.ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      } else {
        this.modalService.dismissAll();
        this.Respuesta = arrayrespuesta[1]
        this.modalService.open(this.ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      }

    })
  }



}
