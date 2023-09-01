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
  ArrayOferta: any = [];
  keywordOferta: string = 'Producto';
  Oferta: string = '';
  CodigoAux: string = '0'
  OfertaE: string = '';
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

    this.ServiciosValorar.ConsultaAplicable('2').subscribe(Resultado => {
      this.ArrayAplica = Resultado;
    })

    const datosbusqueda = {
      UsuCodig: 0,
      Producto: 0,
      NombreCompletoProductor: 0,
      DescripcionProducto: 0,
      Cd_cndcion: 0,
      Cd_tmno: 0,
      ID_EMPAQUE: 0,
      VigenciaDesde: 0,
      VigenciaHasta: 0,
      IdEstado_Oferta: 0,
      CD_RGION: 0,
      CD_MNCPIO: 0
    }
    this.ServiciosValorar.BusquedaOferta('2', '0', '0', '0', datosbusqueda).subscribe(Resultado => {
      this.ArrayOferta = Resultado;
      console.log(Resultado)
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
      console.log(Resultado)
      if (Resultado.length > 0) {
        this.ArrayConsulta = Resultado
      } else {
        this.Respuesta = 'No se encuentran registros asociados'
        this.modalService.open(this.ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      }
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
    this.IdOfertaE = '0'
    this.OfertaE = ''
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
      this.IdAplicaE = Registro.IdTipoCuponGeneral;
      this.FechaInicioE = Registro.FechaInicio;
      this.FechaFinE = Registro.FechaFin;
      this.IdOfertaE = Registro.Cd_cnsctvo;
      this.MascaraE = Registro.codigo_Mostrar;
      this.DescripcionE = Registro.descripcion;
      this.AplicaDesdeE = Registro.ApartirValor;
      this.ValorCuponE = Registro.DescuentoAplicable;
      this.EstadoE = Registro.Estado;
      this.ScriptE = Registro.scriptAdicional;
      this.CodigoAux = Registro.codigo_grupo;
    }

  }

  GuardarCupon() {
    const DatosInsert = {
      IdGrupoAux: this.CodigoAux,
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
    console.log(DatosInsert)
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
        if(this.IdOfertaE != '0' && arrayrespuesta[0].length > 1){
          this.AsociaCuponOferta(this.IdOfertaE, arrayrespuesta[0])
        }
        this.Buscar();
      }

    })
  }

  AsociaCuponOferta(idoferta: string, idcupon: string){
    const DatosInsert = {
      cd_cnsctivo: idoferta,
      Id_cuponCodigo: idcupon
    }
    console.log(DatosInsert)
    this.ServiciosValorar.ModificarCupon('3', DatosInsert).subscribe(Resultado => {
      console.log(Resultado)
    })
  }

  LimpiaOferta(Valor: string) {
    this.Oferta = Valor;
    this.IdOferta = '0';
  }

  selectOfertaFiltro(item: any) {
    this.IdOferta = item.cd_cnsctvo.toString();
  }

  selectOfertaFiltroE(item: any) {
    this.IdOfertaE = item.cd_cnsctvo.toString();
  }

  Eliminar(registro: any) {
    console.log(registro)
    const DatosInsert = {
      IdGrupoAux: registro.codigo_grupo,
      codigo_Mostrar: registro.codigo_Mostrar,
      descripcion: registro.descripcion,
      IdTipoCuponGeneral: registro.IdTipoCuponGeneral,
      IdTipoCuponCodigoAplicableGeneral: registro.IdTipoCuponCodigoAplicableGeneral,
      FechaInicio: registro.FechaInicio,
      FechaFin: registro.FechaFin,
      DescuentoAplicable: registro.DescuentoAplicable,
      Estado: registro.Estado,
      ApartirValor: registro.ApartirValor,
      scriptAdicional: registro.scriptAdicional
    }
    console.log(DatosInsert)

    this.ServiciosValorar.ModificaCupones('4', DatosInsert).subscribe(Resultado => {
      console.log(Resultado)
      this.Buscar()
    })


  }

}
