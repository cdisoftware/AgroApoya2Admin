import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiciosService } from 'src/app/AgroVersionTres/core/servicios.service'
import { BoundElementProperty } from '@angular/compiler';

@Component({
  selector: 'app-creacionoferta',
  templateUrl: './creacionoferta.component.html',
  styleUrls: ['./creacionoferta.component.css']
})
export class CreacionofertaComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private ServiciosService: ServiciosService,
  ) { }

  @ViewChild('ModalRespuesta', { static: false }) ModalRespuesta: any;
  @ViewChild('ModalFechasOferta', { static: false }) ModalFechasOferta: any;
  @ViewChild('ModalNuevoProducto', { static: false }) ModalNuevoProducto: any;
  @ViewChild('ModalPresentaciones', { static: false }) ModalPresentaciones: any;
  @ViewChild('ModalImfOfertaSector', { static: false }) ModalImfOfertaSector: any;
  @ViewChild('ModalInfoGeneralProducto', { static: false }) ModalInfoGeneralProducto: any;

  //Parametros tranversales para la oferta
  IdOferta: string;
  RutaImagenSector: string = '';
  RutaImagenProducto: string = '';

  //Parametros generales de la  (Primer modulo/modulo superior)
  IdTipoOfertaSelect: string;
  VerOcultarModulos: string = '';
  VerOcultarDomicilio: string = '';
  FechaInicio: string = '';
  FechaFin: string = '';
  FechaEntrega: string = '';
  MascaraSector: string = '';
  IdTipoDomicilio: string = '';
  ValorCompraDomicilio: string = '';
  ValorDomicilio: string = '';
  ArrayTipoOferta: any[];
  ArrayTipoDomicilio: any[];
  ArrayFechasOferta: any[];


  //Sectorizacion
  IdLocalidad: string = '0';
  IdSector: string = '0';
  ArrayImagenesSector: any[];
  ArrayLocalidadesTipo: any[];
  ArraySectorTipo: any[];
  ArraySectoresOferta: any[];
  file: FileList | undefined;

  //Regalos por defecto para la oferta
  IdTipoRegalo: string = "0";
  IdTipoRegaloPersona: string = "0";
  ArrayRegalosTipo: any[];
  ArrayRegalosPersonaTipo: any[];
  ArrayRegalosOferta: any[];
  ArrayRegalosOfertaGeneral: any[];

  //Productos para la oferta
  ArrayProductosGeneralesOferta: any[];
  ArrayProductosGeneralesAUX: any[];
  nombreFiltroProducto: string = '';
  TipoProductoFiltro: string = '0';

  //Presentaciones productos
  IdProductoPres: string = '';
  NombreProducto: string = '';
  IdPresentacionPres: string = '';
  UndTotalPress: string = '';
  MaximoUndPres: string = '';
  ValorRealPres: string = '';
  ValorReferenciaPres: string = '';
  PorcentajePres: string = '';
  ArrayPresentacionProd: any[];
  ArrayDetalleProdPres: any[];
  BanderaInserActu: string = '';

  ngOnInit(): void {
    this.CargaInicialActualizacionOferta()
  }

  CargaIncialCrearOferta() {
    this.VerOcultarModulos = "1";
    this.IdTipoOfertaSelect = "0";
    this.IdTipoDomicilio = "0";
    this.CargarListasIniciales();

    this.RutaImagenProducto = this.ServiciosService.RecuperarRutasOtrasImagenes('4');
    this.RutaImagenSector = this.ServiciosService.RecuperarRutasOtrasImagenes('7');
  }

  CargaInicialActualizacionOferta() {

    this.IdOferta = '11';
    this.VerOcultarModulos = "2";

    this.ListaSectoresOferta();
    this.CargarListasIniciales();
    this.CargarProductosOferta();

    this.RutaImagenProducto = this.ServiciosService.RecuperarRutasOtrasImagenes('4');
    this.RutaImagenSector = this.ServiciosService.RecuperarRutasOtrasImagenes('7');

    this.ServiciosService.conszOfertaActivaProductosCo('1', this.IdOferta).subscribe(Resultado => {
      var AuxFechaIncio = Resultado[0].FechaInicio.split('/');
      var AuxFechaFin = Resultado[0].FechaFin.split('/');
      var AuxFechaEntrega = Resultado[0].FechaEntrega.split('/');

      this.FechaInicio = AuxFechaIncio[0] + '-' + AuxFechaIncio[1] + '-' + AuxFechaIncio[2];
      this.FechaFin = AuxFechaFin[0] + '-' + AuxFechaFin[1] + '-' + AuxFechaFin[2];
      this.FechaEntrega = AuxFechaEntrega[0] + '-' + AuxFechaEntrega[1] + '-' + AuxFechaEntrega[2];
      this.MascaraSector = Resultado[0].MascaraSector;
      this.IdTipoOfertaSelect = Resultado[0].TipoOferta;
      this.IdTipoDomicilio = Resultado[0].TipoDomicilio;
      this.ValorCompraDomicilio = Resultado[0].ValorInicialDomicilio;
      this.ValorDomicilio = Resultado[0].ValorDomicilio;
    })

  }

  CargarListasIniciales() {
    this.ServiciosService.consTipoOferta('1').subscribe(Resultado => {
      this.ArrayTipoOferta = Resultado;
    })

    this.ServiciosService.consZTipoDomicilio('1').subscribe(Resultado => {
      this.ArrayTipoDomicilio = Resultado;
    })

    this.ServiciosService.consTipoLocalidad('1').subscribe(Resultado => {
      this.ArrayLocalidadesTipo = Resultado;
    })

    this.ServiciosService.consTipoRegalo('1').subscribe(Resultado => {
      this.ArrayRegalosTipo = Resultado;
      this.ArrayRegalosLider = Resultado;
      this.ArrayRegalosParticipante = Resultado;
    })

    this.ServiciosService.consPersonasAplicaRegalo('1').subscribe(Resultado => {
      this.ArrayRegalosPersonaTipo = Resultado;
    })
  }

  /*AREA INFORMACIÓN GENERAL PARA LA OFERTA */
  BtnModalFechasAnteriores() {
    this.ServiciosService.conszOfertaActivaProductosCo('1', '0').subscribe(Resultado => {
      this.ArrayFechasOferta = Resultado;
      this.modalService.open(this.ModalFechasOferta, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
    })
  }

  BtnGuardarNuevaOferta() {
    if (this.FechaInicio == '' || this.FechaFin == '' || this.FechaEntrega == '') {
      alert("Las fechas de inicio, fin y entrega son obligatorias")
    }
    else if (this.MascaraSector == '') {
      alert("La mascara del sector es obligatoria")
    }
    else if (this.IdTipoOfertaSelect == '0') {
      alert("El tipo de oferta es obligatorio")
    }
    else if (this.IdTipoDomicilio == '0') {
      alert("El tipo domicilio es obligatorio")
    }
    else if (this.IdTipoDomicilio == '1' && (this.ValorCompraDomicilio == '' || this.ValorDomicilio == '')) {
      alert("El Valor comprar domicilio y el valor domicilio son obligatorios")
    }
    else if (this.IdTipoDomicilio == '3' && this.ValorDomicilio == '') {
      alert("El valor domicilio son obligatorios")
    }
    else {
      const body = {
        IdOferta: 0,
        FechaInicio: this.FechaInicio,
        FechaFin: this.FechaFin,
        FechaEntrega: this.FechaEntrega,
        TipoOfeta: this.IdTipoOfertaSelect,
        MascaraLocali: this.MascaraSector,
        TipoDomicilio: this.IdTipoDomicilio,
        ValorDomicilio: this.ValorDomicilio,
        ValorInicialDomicilio: this.ValorCompraDomicilio
      }

      this.ServiciosService.modOfertaActivaInfo('1', body).subscribe(Resultado => {
        var auxSplit: any = [];
        auxSplit = Resultado.split('|');
        alert(Resultado.toString())
        if (auxSplit[0] != '-1') {
          this.IdOferta = auxSplit[0];
          this.VerOcultarModulos = "2";
          this.CargarProductosOferta();
        }
      })
    }
  }

  BtnActualizarOferta() {
    if (this.FechaInicio == '' || this.FechaFin == '' || this.FechaEntrega == '') {
      alert("Las fechas de inicio, fin y entrega son obligatorias")
    }
    else if (this.MascaraSector == '') {
      alert("La mascara del sector es obligatoria")
    }
    else if (this.IdTipoOfertaSelect == '0') {
      alert("El tipo de oferta es obligatorio")
    }
    else if (this.IdTipoDomicilio == '0') {
      alert("El tipo domicilio es obligatorio")
    }
    else if (this.IdTipoDomicilio == '1' && (this.ValorCompraDomicilio == '' || this.ValorDomicilio == '')) {
      alert("El Valor comprar domicilio y el valor domicilio son obligatorios")
    }
    else if (this.IdTipoDomicilio == '3' && this.ValorDomicilio == '') {
      alert("El valor domicilio son obligatorios")
    }
    else {
      const body = {
        IdOferta: this.IdOferta,
        FechaInicio: this.FechaInicio,
        FechaFin: this.FechaFin,
        FechaEntrega: this.FechaEntrega,
        TipoOfeta: this.IdTipoOfertaSelect,
        MascaraLocali: this.MascaraSector,
        TipoDomicilio: this.IdTipoDomicilio,
        ValorDomicilio: this.ValorDomicilio,
        ValorInicialDomicilio: this.ValorCompraDomicilio
      }

      this.ServiciosService.modOfertaActivaInfo('2', body).subscribe(Resultado => {
        alert(Resultado.toString());
      })
    }
  }

  /*AREA ASOCIACION DE SECTORES */
  BtnModalImagenSector() {
    this.ServiciosService.conszImgAsociadosSectorOferta('1', this.IdOferta).subscribe(Resultado => {
      this.ArrayImagenesSector = Resultado;
    })
    this.modalService.open(this.ModalImfOfertaSector, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  ImgSeleccionarImgSector(Resultados: any) {
    const body = {
      IdImagen: Resultados.Id,
      Nombre: "",
      IdOferta: this.IdOferta
    }
    this.ServiciosService.modImgAsociadasSectorOfertas('4', body).subscribe(Resultado => {
      this.ServiciosService.conszImgAsociadosSectorOferta('1', this.IdOferta).subscribe(Resultado => {
        this.ArrayImagenesSector = Resultado;
      })
    })
  }

  SubirImgMapa(event: any) {
    this.file = event.target.files[0];
    this.ServiciosService.uploadImgSector(event.target.files[0]).subscribe(
      response => {
        alert(response)
        const body = {
          IdImagen: "0",
          Nombre: event.target.files[0].name,
          IdOferta: "0"
        }
        this.ServiciosService.modImgAsociadasSectorOfertas('1', body).subscribe(Resultado => {
          this.ServiciosService.conszImgAsociadosSectorOferta('1', this.IdOferta).subscribe(Resultado => {
            this.ArrayImagenesSector = Resultado;
          })
        })
      },
      error => {
        console.log(error);
      }
    );
  }

  changeSelectLocalidad() {
    this.IdSector = '0';
    if (this.IdLocalidad != '0') {
      this.ServiciosService.consRelacionLocalidadZona('1', this.IdLocalidad).subscribe(Resultado => {
        this.ArraySectorTipo = Resultado;
      })
    } else {
      this.ArraySectorTipo = [];
    }
  }

  BtnAgregarLocalidadOferta() {
    if (this.IdSector == '0') {
      alert('Es obligatorio el campo localidad y sector');
    } else {
      const body = {
        IdZona: this.IdSector,
        IdOferta: this.IdOferta
      }
      this.ServiciosService.modZonaOferta('1', body).subscribe(Resultado => {
        alert(Resultado)
        this.ListaSectoresOferta();
      })
    }
  }

  ListaSectoresOferta() {
    this.ServiciosService.consOfertaActivaZonas('1', this.IdOferta).subscribe(Resultado => {
      this.ArraySectoresOferta = Resultado;
    })
  }

  EliminarSectorOferta(Arreglo: any) {
    const body = {
      IdZona: Arreglo.TipoZona,
      IdOferta: this.IdOferta
    }
    this.ServiciosService.modZonaOferta('2', body).subscribe(Resultado => {
      alert(Resultado)
      this.ListaSectoresOferta();
    })
  }

  /*PRODUCTOS PARA LA OFERTA*/
  CargarProductosOferta() {
    this.ServiciosService.consProductosActivosOferta('1', this.IdOferta).subscribe(ResultadoDos => {
      this.ArrayProductosGeneralesAUX = ResultadoDos;
      this.ArrayProductosGeneralesOferta = ResultadoDos;
    })
  }

  FiltrosGeneralProducto() {
    this.ArrayProductosGeneralesOferta = [];
    if ((this.nombreFiltroProducto == '' || this.nombreFiltroProducto == null || this.nombreFiltroProducto == undefined)
      && this.TipoProductoFiltro == '0') {
      //Sin filtros
      for (let i = 0; i < this.ArrayProductosGeneralesAUX.length; i++) {
        this.ArrayProductosGeneralesOferta.push(this.ArrayProductosGeneralesAUX[i]);
      }
    } else if ((this.nombreFiltroProducto != '' || this.nombreFiltroProducto != null || this.nombreFiltroProducto != undefined)
      && this.TipoProductoFiltro == '0') {
      //Solamente el filtro de nombre
      for (let i = 0; i < this.ArrayProductosGeneralesAUX.length; i++) {
        if (this.ArrayProductosGeneralesAUX[i].NombreProducto.toLowerCase().includes(this.nombreFiltroProducto.toLowerCase())) {
          this.ArrayProductosGeneralesOferta.push(this.ArrayProductosGeneralesAUX[i]);
        }
      }
    } else if ((this.nombreFiltroProducto == '' || this.nombreFiltroProducto == null || this.nombreFiltroProducto == undefined)
      && this.TipoProductoFiltro != '0') {
      //Solamente el filtro de tipo de producto
      for (let i = 0; i < this.ArrayProductosGeneralesAUX.length; i++) {
        //Tradicional
        if (this.TipoProductoFiltro == "1") {
          if (this.ArrayProductosGeneralesAUX[i].TipoVentaProducto == "1") {
            this.ArrayProductosGeneralesOferta.push(this.ArrayProductosGeneralesAUX[i]);
          }
        }
        //Especial
        if (this.TipoProductoFiltro == "2") {
          if (this.ArrayProductosGeneralesAUX[i].TipoVentaProducto != "1") {
            this.ArrayProductosGeneralesOferta.push(this.ArrayProductosGeneralesAUX[i]);
          }
        }
      }
    } else {
      //Todos los filtros
      for (let i = 0; i < this.ArrayProductosGeneralesAUX.length; i++) {
        if (this.ArrayProductosGeneralesAUX[i].NombreProducto.toLowerCase().includes(this.nombreFiltroProducto.toLowerCase())) {
          //Tradicional
          if (this.TipoProductoFiltro == "1") {
            if (this.ArrayProductosGeneralesAUX[i].TipoVentaProducto == "1") {
              this.ArrayProductosGeneralesOferta.push(this.ArrayProductosGeneralesAUX[i]);
            }
          }
          //Especial
          if (this.TipoProductoFiltro == "2") {
            if (this.ArrayProductosGeneralesAUX[i].TipoVentaProducto != "1") {
              this.ArrayProductosGeneralesOferta.push(this.ArrayProductosGeneralesAUX[i]);
            }
          }
        }
      }
    }




  }

  ActivarProductoOferta(IdOferta: string) {
    const body =
    {
      IdOferta: this.IdOferta,
      TipoProducto: IdOferta,
      Orden: 0,
      TipoEstado: 1,
      UsucodigProductor: ""
    }

    this.ServiciosService.modProductosActivosOferta('1', body).subscribe(ResultadoTres => {
      this.ServiciosService.consProductosActivosOferta('1', this.IdOferta).subscribe(ResultadoDos => {
        this.ArrayProductosGeneralesAUX = ResultadoDos;
        this.ArrayProductosGeneralesOferta = ResultadoDos;
      })
    })
  }

  DesActivarProductoOferta(Arreglo: any) {
    const body =
    {
      IdOferta: this.IdOferta,
      TipoProducto: Arreglo.IdOferta,
      Orden: 0,
      TipoEstado: 1,
      UsucodigProductor: ""
    }

    this.ServiciosService.modProductosActivosOferta('2', body).subscribe(ResultadoTres => {
      this.ServiciosService.consProductosActivosOferta('1', this.IdOferta).subscribe(ResultadoDos => {
        this.ArrayProductosGeneralesAUX = ResultadoDos;
        this.ArrayProductosGeneralesOferta = ResultadoDos;
      })
    })
  }

  BtnModalNuevoProducto() {
    this.modalService.open(this.ModalNuevoProducto, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  BtnModalDetalleInfoProducto() {
    this.modalService.open(this.ModalNuevoProducto, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  BtnInformacionGeneral(Arreglo: any) {
    this.modalService.open(this.ModalInfoGeneralProducto, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  /*PRESENTACIONES PRODUCTO*/
  BtnModalDetallePresentaciones(Arreglo: any) {
    this.BanderaInserActu = '1'; //INSERTA
    this.IdProductoPres = Arreglo.IdOferta;
    this.NombreProducto = Arreglo.NombreProducto;
    this.ArrayPresentacionProd = [];
    this.ServiciosService.consRelacionProductoPresentacion('1', this.IdProductoPres).subscribe(ResultadoDos => {
      this.ArrayPresentacionProd = ResultadoDos;
    })

    this.InformacionInicalModalPres();
    this.BuscarDetallePrecentaciones();
    this.modalService.open(this.ModalPresentaciones, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  KeyPressRFeferencia(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let Real = Number(this.ValorRealPres);
    let Referencia = Number(inputElement.value); // Precio original antes del descuento
    let Descuento = Number(this.PorcentajePres); // Porcentaje de descuento

    if (!Real || Real <= 0) {
      return;
    }

    if (Referencia) {
      Descuento = ((Referencia - Real) / Referencia) * 100;
      this.PorcentajePres = Descuento.toFixed(0);
    }

  }

  KeyPressDescu(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    let Real = Number(this.ValorRealPres);
    let Referencia = Number(inputElement.value); // Precio original antes del descuento
    let Descuento = Number(this.PorcentajePres); // Porcentaje de descuento

    if (!Real || Real <= 0) {
      return;
    }
    if (Descuento) {
      Referencia = Real / (1 - (Descuento / 100));
      this.ValorReferenciaPres = (Math.round(Referencia / 100) * 100).toFixed(0);
    }
  }

  InformacionInicalModalPres() {
    this.IdPresentacionPres = '0';
    this.MaximoUndPres = '5';
    this.UndTotalPress = '30';
    this.ValorRealPres = '';
    this.ValorReferenciaPres = '';
    this.PorcentajePres = '';
  }

  BtnGuardarDetallePresentaciones() {
    if (this.IdPresentacionPres != '0' && this.MaximoUndPres && this.UndTotalPress
      && this.ValorRealPres && this.ValorReferenciaPres && this.PorcentajePres) {
      const Body = {
        IdOferta: this.IdOferta,
        IdProducto: this.IdProductoPres,
        TipoPresentacion: this.IdPresentacionPres,
        ValorReal: this.ValorRealPres,
        ValorReferencia: this.ValorReferenciaPres,
        UnidadesDisponibles: this.UndTotalPress,
        MaximoUnidades: this.MaximoUndPres,
        Orden: 0,
        TipoEstado: 1
      }
      this.ServiciosService.modOfertaActivaProductosDetalles('1', Body).subscribe(ResultadoDos => {
        alert(ResultadoDos)
        this.InformacionInicalModalPres();
        this.BuscarDetallePrecentaciones();
      })
    } else {
      alert('Todos los campos con * son obligatorios')
    }
  }

  BuscarDetallePrecentaciones() {
    this.ServiciosService.consOfertaActivaProductosDetalles('1', this.IdProductoPres, this.IdOferta).subscribe(ResultadoDos => {
      this.ArrayDetalleProdPres = ResultadoDos;
    })
  }

  BtnLimpiar() {
    this.BanderaInserActu = '1'; //INSERTA
    this.InformacionInicalModalPres();
  }

  BtnSubirActualizarRegistro(Arreglo: any) {
    this.BanderaInserActu = '2';
    this.IdPresentacionPres = Arreglo.TipoPresentacion;
    this.MaximoUndPres = Arreglo.MaximoUnidades;
    this.ValorRealPres = Arreglo.ValorReal;
    this.ValorReferenciaPres = Arreglo.ValorReferencia;
    this.UndTotalPress = Arreglo.UnidadesDisponibles;

    let Descuento = ((Number(this.ValorReferenciaPres) - Number(this.ValorRealPres)) / Number(this.ValorReferenciaPres)) * 100;
    this.PorcentajePres = Descuento.toFixed(0);
  }

  BtnActualizarDetallePresentaciones() {
    if (this.IdPresentacionPres != '0' && this.MaximoUndPres && this.UndTotalPress
      && this.ValorRealPres && this.ValorReferenciaPres && this.PorcentajePres) {
      const Body = {
        IdOferta: this.IdOferta,
        IdProducto: this.IdProductoPres,
        TipoPresentacion: this.IdPresentacionPres,
        ValorReal: this.ValorRealPres,
        ValorReferencia: this.ValorReferenciaPres,
        UnidadesDisponibles: this.UndTotalPress,
        MaximoUnidades: this.MaximoUndPres,
        Orden: 0,
        TipoEstado: 1
      }
      this.ServiciosService.modOfertaActivaProductosDetalles('2', Body).subscribe(ResultadoDos => {
        alert(ResultadoDos)
        this.BanderaInserActu = '1'; //INSERTA
        this.InformacionInicalModalPres();
        this.BuscarDetallePrecentaciones();
      })
    } else {
      alert('Todos los campos con * son obligatorios')
    }
  }

  BtnEliminarRegistro(Arreglo: any) {
    const Body = {
      IdOferta: this.IdOferta,
      IdProducto: Arreglo.IdProducto,
      TipoPresentacion: Arreglo.TipoPresentacion,
      ValorReal: Arreglo.ValorReal,
      ValorReferencia: Arreglo.ValorReferencia,
      UnidadesDisponibles: 30,
      MaximoUnidades: Arreglo.MaximoUnidades,
      Orden: 0,
      TipoEstado: 1
    }
    this.ServiciosService.modOfertaActivaProductosDetalles('3', Body).subscribe(ResultadoDos => {
      alert(ResultadoDos)
      this.BanderaInserActu = '1'; //INSERTA
      this.InformacionInicalModalPres();
      this.BuscarDetallePrecentaciones();
    })

  }

  SubirImgProducto(event: any) {
    this.ServiciosService.postImgToppings(event.target.files[0]).subscribe(
      response => {
        console.log(response);
        //Todo validar subir y mostrar imagen
      },
      error => {
        console.log(error)
      }
    );
  }

  //Referidos
  ArrayRegalosLider: any[];
  IdLiderRegalos: string = '0';
  ArregloProductosRegaloLider: any[];
  IdProdRegaloLider: string = '';
  ArregloInfoRegaloLider: any[];

  ArrayRegalosParticipante: any[];
  IdParticioanteRegalos: string = '0';
  ArregloProductosRegaloParti: any[];
  IdProdRegaloParti: string = '';
  ArregloInfoRegaloParti: any[];

  /*AREA DE REFERIDOS */
  ChangeRegaloLiderReferidor() {
    this.IdProdRegaloLider = '0';
    if (this.IdLiderRegalos != '0') {
      this.ListaProductosRegaloDisponiblesLider();
    }
  }

  ListaProductosRegaloDisponiblesLider() {
    this.ServiciosService.consProductosActivosOferta('2', this.IdOferta).subscribe(ResultadoDos => {
      console.log(ResultadoDos);
      this.ArregloProductosRegaloLider = ResultadoDos;
    })
  }

  changeProductosRegaloDisponiblesLider() {
    this.ArregloInfoRegaloLider = [];  // Asegúrate de inicializar el array
    if (this.IdProdRegaloLider != '0') {
      for (let i = 0; i < this.ArregloProductosRegaloLider.length; i++) {
        if (this.ArregloProductosRegaloLider[i].IdOferta == this.IdProdRegaloLider) {
          this.ArregloInfoRegaloLider.push(this.ArregloProductosRegaloLider[i]);
          console.log(this.ArregloProductosRegaloLider[i])
        }
      }
    }
  }

  BtnGuardarInformacionLider(){

  }

  //ActivarProductoOferta
  ChangeRegaloParticipanteReferido() {
    this.IdProdRegaloParti = '0';
    if (this.IdParticioanteRegalos != '0') {
      this.ListaProductosRegaloDisponiblesParticipante();
    }
  }

  ListaProductosRegaloDisponiblesParticipante() {
    this.ServiciosService.consProductosActivosOferta('2', this.IdOferta).subscribe(ResultadoDos => {
      console.log(ResultadoDos);
      this.ArregloProductosRegaloParti = ResultadoDos;
    })
  }

  changeProductosRegaloDisponiblesParticipante() {
    this.ArregloInfoRegaloParti = [];  // Asegúrate de inicializar el array
    if (this.IdProdRegaloParti != '0') {
      for (let i = 0; i < this.ArregloProductosRegaloParti.length; i++) {
        if (this.ArregloProductosRegaloParti[i].IdOferta == this.IdProdRegaloParti) {
          this.ArregloInfoRegaloParti.push(this.ArregloProductosRegaloParti[i]);
          console.log(this.ArregloProductosRegaloParti[i])
        }
      }
    }
  }

  /*AREA DE REGALOS POR DEFECTO PARA LA OFERTA*/
  BtnAgregarRegaloDefecto() {
    if (this.IdTipoRegaloPersona == '0' || this.IdTipoRegalo == '0') {
      alert('El campo tipo regalo y aplicable a son obliagatorios');
    } else {
      const body = {
        IdOferta: this.IdOferta,
        IdTipoRegalo: this.IdTipoRegalo,
        AplicablePersona: this.IdTipoRegaloPersona,
        TipoEstado: "1"
      }
      this.ServiciosService.modOfertaRegalos('1', body).subscribe(Resultado => {
        alert(Resultado)
        this.ServiciosService.consOfertaRegalos('1', this.IdOferta).subscribe(Resultado => {
          this.ArrayRegalosOferta = Resultado;
        })
      })
    }
  }


}
