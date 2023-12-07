import {
  Component, OnInit, ViewChild, HostListener,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';
import { ValorarofertaService } from './../../../core/valoraroferta.service';
import { NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements AfterContentInit, OnInit {

  @ViewChild('ModalMensaje', { static: false }) ModalMensaje: any;
  @ViewChild('ModalMapaSugerido', { static: false }) ModalMapaSugerido: any;
  @ViewChild('templateGrupos', { static: false }) ModalGrupos: any;
  @ViewChild('templateTransporte', { static: false }) ModalTransporte: any;
  selecsector: string = '0'
  selectConductor: string = '0'
  Respuesta: string = '';

  //mapas
  markers: google.maps.Marker[] = [];
  Coor1: string = '';
  Coor2: string = '';
  ValidaInsertSec: string = '1';
  ValidaInsertSecs: string = '1';
  CoordenadasParcela: string = ''
  geocoder = new google.maps.Geocoder();
  map: google.maps.Map;
  objCiudad: any = '0';
  objDepartamento: any = '0';
  NomCiudad: string = 'Bogotá';
  NomDepa: string = 'Bogotá';
  infoWindow = new google.maps.InfoWindow();

  ArrayDataRutaSugerida: any = [];
  VerBtnMapSugerido: boolean = false;
  VerBtnDescargarPdf: boolean = false;
  //Buscar
  ArrayConsultaSeg: any = [];

  //Mensaje
  Mensaje: string = '';
  TituloModal: string = "AgroApoya2";

  //VariablesFiltro Oferta
  ArrayOferta: any = [];
  keywordGrupo = 'NombreGrupo';
  keywordOferta = 'Producto'
  SelectorOferta: string = '0';
  OfertaSelect: string = '0';
  Oferta: string = '';

  //VariablesFiltro Oferta
  ArraySector: any = [];
  keywordSector: string = '';
  SelectorSector: string = '';
  Sector: string = '';

  //Tarjeta Transportista
  ArrayConductor: any = [];
  ArrayDetalle: any = [];
  ArrayVentas: any = [];
  ArrayConductores: any = [];
  ImgEvidencia: string = '';
  keywordConductor: string = 'NOMBRE'
  ConductorSelect: string = '0';
  ArrayReporte: any = [];
  CadenaGrafica: string = '';
  colorSchemeTort: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ["#31C231", "#FAA432", "#F02C29", "#AAAAAA"]
  };
  viewBar: [number, number] = [1000, 800];
  ArrayValores: any = [];
  Detalle: string = '';
  Conductor: string = '';
  screenWidth: number = 0;

  //Valor Domicilio General
  ValorDomicilio: number = 0;

  //Variables Fecha
  Dia = new Date().getDate();
  Mes = new Date().getMonth() + 1;
  Año = new Date().getFullYear();

  Fecha: string = this.Año + '-' + this.Mes + '-' + this.Dia;

  FechaInicio: string = '0'
  FechaFin: string = '0';
  ArrayGrupos: any = [];
  IdGrupo: string = '0';
  ArrayGruposSel: any = [];
  Grupo: string = ''
  ArrayTotales: any = [];
  TotalEsperado: number = 0;
  TotalReal: number = 0;
  TotalContra: number = 0;
  TotalElect: number = 0;
  ArrayInfoGeneral: any = [];
  MotivoDevolucion: string = '';
  MotivoDevolucion2: string = '';
  EstadoDetalle: string = '';
  ArrayInfoGeneralTrans: any = []
  ValidaFiltros: boolean = false;
  constructor(
    private modalService: NgbModal,
    private ServiciosValorar: ValorarofertaService) { }

  ngAfterContentInit(): void {
    var div = document.getElementById("rowGraficas");
    if (div) {
      this.RezizePantalla(div?.clientWidth);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    var div = document.getElementById("rowGraficas");
    if (div) {
      this.screenWidth = div?.clientWidth;
      this.RezizePantalla(div?.clientWidth);
    }
  }


  ngOnInit(): void {
    this.ConsultaOferta();
    this.ConsutaGrupos();
  }


  DescargarDatosPdf() {
    const doc = new jsPDF('l', 'px', 'a3');

    autoTable(doc, {
      styles: { fillColor: [37, 150, 190], fontSize: 13 },
      columnStyles: {
        1: { cellWidth: 432 },
        2: { cellWidth: 432 }
      },
      didParseCell: function (data) {
        var rows = data.table.body;
        if (data.row.index === 0) {
          data.cell.styles.fillColor = [37, 150, 190];
          data.cell.styles.textColor = [255, 255, 255];
        }
      },
      margin: { top: 10 },
      body: [
        ["Producto", "Total Producto"],
      ]
    })
    this.ArrayReporte.forEach(function (respuesta: any) {

      var Res =
        [respuesta.PRODUCTO, respuesta.CANTIDAD_TOTAL];

      autoTable(doc, {
        margin: { top: 0, bottom: 0 },
        columnStyles: {
          1: { cellWidth: 432 },
          2: { cellWidth: 432 }
        },
        body:
          [
            Res
          ]
      })
    });
    const cellWidth = 240;
    autoTable(doc, {
      styles: { fillColor: [37, 150, 190], fontSize: 13 },
      columnStyles: {
        1: { cellWidth: cellWidth },
        2: { cellWidth: cellWidth },
        3: { cellWidth: cellWidth },
        4: { cellWidth: cellWidth }
      },
      didParseCell: function (data) {
        var rows = data.table.body;
        if (data.row.index === 0) {
          data.cell.styles.fillColor = [37, 150, 190];
          data.cell.styles.textColor = [255, 255, 255];
        }
      },
      margin: { top: 1 },
      body: [
        ["Cliente", "Celular", "Dirección", "Producto"],
      ]
    })

    this.ArrayConsultaSeg.forEach(function (respuesta: any) {
      const productoFormatted = respuesta.producto_addTodos.replace(/\|/g, '\n');
      var Res =
        [respuesta.NOMBRES_PERSONA, respuesta.CELULAR_PERSONA, respuesta.DRCCION, productoFormatted];

      autoTable(doc, {
        margin: { top: 0, bottom: 0 },
        columnStyles: {
          1: { cellWidth: cellWidth },
          2: { cellWidth: cellWidth },
          3: { cellWidth: cellWidth },
          4: { cellWidth: cellWidth }
        },
        body:
          [
            Res
          ]
      })
    });
    doc.save('Seguimiento - ' + this.OfertaSelect + "_" + this.Fecha + '.pdf')
  }

  ConsultaTransportista(idconductor: string, idtransportista: string) {
    this.ServiciosValorar.ConsultaDetalleCond('1', idconductor, idtransportista).subscribe(Resultado => {
      this.ArrayConductor = Resultado
    })
  }

  ConsutaGrupos() {
    this.ServiciosValorar.ConsultaGruposMilla('1', '0').subscribe(Resultado => {
      console.log(Resultado)
      this.ArrayGrupos = Resultado
    })
  }

  ConsultaOferta() {
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
    this.ServiciosValorar.BusquedaOferta('2', this.SelectorOferta, '0', '0', datosbusqueda).subscribe(Resultado => {
      console.log(Resultado)
      this.ArrayOferta = Resultado;
      this.keywordGrupo = 'NombreGrupo';
      this.keywordOferta = 'Producto'
    })
  }
  LimpiaGrupo(Valor: string) {
    this.ValidaFiltros = false;
    this.ArrayReporte = []
    this.IdGrupo = '0';
    this.Grupo = '';
  }

  LimpiaOferta(Valor: string) {
    this.ValidaFiltros = false
    this.ArrayReporte = []
    this.Oferta = '0';
    this.OfertaSelect = '0';
  }

  selectOfertaFiltro(item: any) {
    this.OfertaSelect = item.cd_cnctivo;
    this.selecsector = '1'
    //this.ConsultaSectores(item.cd_cnsctvo);
  }

  selectGrupoFiltro(item: any) {
    this.IdGrupo = item.IdGrupoMilla;
    //this.Grupo = item.IdGrupoMilla;
    //this.OfertaSelect = item.cd_cnctivo;
    this.selecsector = '1'
    //this.ConsultaSectores(item.cd_cnsctvo);
  }

  ConsultaSectores(cd_cnctivo: string) {
    this.ServiciosValorar.ConsultaSectoresOferta('2', cd_cnctivo).subscribe(Resultado => {
      this.ArraySector = Resultado;
      this.keywordSector = 'DSCRPCION_SCTOR';
    })
  }

  LimpiaSector(Valor: string) {
    this.Sector = Valor;
    this.SelectorSector = '';
    this.selecsector = '0';
  }
  LimpiaConductor() {
    this.Conductor = ''
    this.ConductorSelect = '0'
  }

  SelectSector(item: any) {
    this.SelectorSector = item.ID_SCTOR_OFRTA.toString();

    this.selecsector = '1'
    this.selectConductor = '1'
    this.ConsultarConductores()
  }

  SelectConductor(item: any) {
    this.ConductorSelect = item.CODIGO;
  }

  Buscar(templateRespuesta: any) {
    const BodyConsulta = {
      FechaIncio: this.FechaInicio,
      FechaFin: this.FechaFin
    }
    console.log(BodyConsulta)
    console.log(this.IdGrupo)
    this.ServiciosValorar.ConsultaSegNew('1', this.IdGrupo, this.OfertaSelect, BodyConsulta).subscribe(Resultado => {
      console.log(Resultado)
      this.ArrayGruposSel = Resultado
      if (Resultado.length == 0) {
        this.Respuesta = 'No encontramos registros de compras para este sector.';
        this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' });
        // this.ValidaInsertSec = '0';
        // this.ValidaInsertSecs = '0';
      } else {
        this.modalService.open(this.ModalGrupos, { ariaLabelledBy: 'modal-basic-title' });

      }
    })

    /*
    if (this.SelectorSector == '' && this.SelectorOferta == '0' || this.SelectorSector != '' && this.SelectorOferta == '0' || this.SelectorSector == '' && this.SelectorOferta != '0') {
      this.Respuesta = 'Es necesario que selecciones una oferta y un sector.';
      this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' });
      this.ValidaInsertSec = '0';
      this.ValidaInsertSecs = '0';
    } else {
      const datos = {
        coordernadas: "0"
      }
      //this.ServiciosValorar.ConsultaSeguimiento('1', this.SelectorOferta, this.SelectorSector).subscribe(Resultado => {
      this.ServiciosValorar.ConsultaSeguimientoEntregas('1', this.ConductorSelect, this.SelectorSector, this.SelectorOferta, datos).subscribe(Resultado => {
         if (Resultado.length == 0) {
          this.Respuesta = 'No encontramos registros de compras para este sector.';
          this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' });
          this.ValidaInsertSec = '0';
          this.ValidaInsertSecs = '0';
        } else {
          this.VerBtnMapSugerido = true;
          this.VerBtnDescargarPdf = this.ConductorSelect !== '0';
          this.Detalle = '1';
          this.ArrayConsultaSeg = Resultado;
          this.ValidaInsertSec = '1';
          this.ValidaInsertSecs = '1';
          this.ConsReporteEntregas();
        }

      })
    }*/
  }

  Centramapa2(request: google.maps.GeocoderRequest): void {
    this.geocoder.geocode(request).then((result) => {
      const { results } = result;
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 15,
        }
      );
      this.AgregarMarcador(results[0].geometry.location, this.map);
      this.map.setCenter(results[0].geometry.location);
      return results;
    })
      .catch((e) => {
      });
  }

  Centramapa(request: google.maps.GeocoderRequest): void {
    var lat: number;
    var long: number;
    this.geocoder.geocode(request).then((result) => {
      const { results } = result;
      //this.AgregarSitios();
      var auxcoor = this.ArrayConsultaSeg[0].COORDENADAS_ENTR.split(",");
      lat = parseFloat(auxcoor[0].trim());
      long = parseFloat(auxcoor[1].trim());
      this.map = new google.maps.Map(
        document.getElementById("mapaS") as HTMLElement,
        {
          center: { lat: lat, lng: long },
          zoom: 11,
        }
      );


      this.AgregarSitios();

      return results;
    })
      .catch((e) => {
      });
  }

  AgregarMarcador(latLng: google.maps.LatLng, map: google.maps.Map) {
    if (this.markers.length > 0) {
      this.markers[0].setMap(null)
    }
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
    });
    this.markers = [];
    this.markers.push(marker);
  }

  MostrarMapa(Entrega: any, TemplateMapa: any) {
    this.ValidaInsertSec = '1';
    this.Centramapa2({ address: Entrega.COORDENADAS_ENTR })
    this.modalService.open(TemplateMapa, { size: 'md', centered: true });
  }

  NumProductos: number = 0;
  ValorTotalCompra: string = "";
  MostrarDetalle(Entrega: any, TemplateDetalle: any) {
    this.EstadoDetalle = Entrega.ESTDO;
    console.log(Entrega)
    this.MotivoDevolucion = Entrega.ObsEvidencia
    this.MotivoDevolucion2 = Entrega.ObsEvidenciaDos
    this.ValorTotalCompra = Entrega.VLOR_PGAR;
    this.NumProductos = 0;
    this.TituloModal = 'Detalle Entregas'
    var IdGrupo = Entrega.IdGrupoMilla
    var IdCarro = Entrega.ID
    this.ServiciosValorar.ConsultaDetalleEntregas('1', IdCarro).subscribe(Resultado => {
      this.ArrayDetalle = Resultado;
      this.TotalEsperado = 0;
      this.TotalReal = 0;
      for (var i = 0; i < this.ArrayDetalle.length; i++) {
        this.NumProductos = this.NumProductos + this.ArrayDetalle[i].Cantidad
        this.TotalEsperado = this.TotalEsperado + Number(this.ArrayDetalle[i].valor)
        this.TotalReal = this.TotalReal + Number(this.ArrayDetalle[i].ValorReal)
      }
    })
    this.modalService.open(TemplateDetalle, { size: 'lg', centered: true });
  }

  MostrarEvidencia(Entrega: any, TemplateImagen: any) {
    this.TituloModal = 'Evidencia Entrega'
    this.ImgEvidencia = Entrega.imagen_evidencia;
    this.modalService.open(TemplateImagen, { size: 'md', centered: true });
  }

  AgregarSitios() {
    const features = [];
    const Polylines = [];
    this.ValorDomicilio = 0;
    this.markers = [];
    var lat: number;
    var long: number;
    for (var i = 0; i < this.ArrayConsultaSeg.length; i++) {
      var auxcoor = this.ArrayConsultaSeg[i].COORDENADAS_ENTR.split(",");
      lat = parseFloat(auxcoor[0]);
      long = parseFloat(auxcoor[1]);
      features.push({ position: new google.maps.LatLng(lat, long), Estado: this.ArrayConsultaSeg[i].ESTDO, NomCli: this.ArrayConsultaSeg[i].NOMBRES_PERSONA + ' ' + this.ArrayConsultaSeg[i].APELLIDOS_PERSONA, IdCompra: this.ArrayConsultaSeg[i].ID_CARRO });
      if (this.ArrayConsultaSeg[i].ESTDO != "4") {
        Polylines.push({ lat: lat, lng: long });
      }

      this.ValorDomicilio += Number(this.ArrayConsultaSeg[i].ValorDomicilio);
    }
    this.TotalCosolidado = this.TotalCosolidado + this.ValorDomicilio;
    for (let i = 0; i < features.length; i++) {
      var icon;
      var LabelOption;
      //alert(features[i].Estado)
      if (features[i].Estado == '1') {
        icon = '../../../../assets/ImagenesAgroApoya2Adm/Entregado.png';
        // LabelOption = {
        //   text: "" + (i + 1),
        //   color: "#D35400",
        //   fontSize: "15px",
        //   fontWeight: "bold"
        // }
      } else if (features[i].Estado == '2') {
        icon = '../../../../assets/ImagenesAgroApoya2Adm/Devuelto.png';
      } else if (features[i].Estado == '4') {
        icon = '../../../../assets/ImagenesAgroApoya2Adm/Pendiente.png';
      } else {
        icon = '../../../../assets/ImagenesAgroApoya2Adm/Devuelto.png';
      }

      var marker = new google.maps.Marker({
        title: features[i].NomCli,
        animation: google.maps.Animation.DROP,
        position: features[i].position,
        map: this.map,
        icon: icon,
        zIndex: i,
        label: LabelOption
      });
      this.markers.push(marker);
      const infoWindow = new google.maps.InfoWindow();
      this.markers[i].addListener("click", () => {
        this.InfoWindow(this.markers[i].getZIndex());
      });
    }

    const flightPath = new google.maps.Polyline({
      path: Polylines,
      geodesic: true,
      strokeColor: "#397c97",
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });

    flightPath.setMap(this.map);
  }


  AbreInfoEntrega() {
    this.modalService.dismissAll();
    this.modalService.open(this.ModalMensaje, { size: 'md', centered: true, backdrop: 'static', keyboard: false });
  }

  ConsultaSeguimiento() {
    this.ServiciosValorar.ConsultaSeguimiento('1', this.SelectorOferta, this.SelectorSector).subscribe(Resultado => {
    })
  }


  InfoWindow(i: any) {

    this.infoWindow.close();
    var NomCliente: string = '' + this.ArrayConsultaSeg[i].NOMBRES_PERSONA + ' ' + this.ArrayConsultaSeg[i].APELLIDOS_PERSONA;
    var FechaEntrega: string = '' + this.ArrayConsultaSeg[i].fecha_entrega + ' : ' + this.ArrayConsultaSeg[i].hora_entrega;
    var Direccion: string = '' + this.ArrayConsultaSeg[i].DRCCION;

    var Producto: string = '';
    if (this.ArrayConsultaSeg[i].unidadesEntregar > 0) {
      Producto = '' + this.ArrayConsultaSeg[i].Producto_ppal + ': ' + this.ArrayConsultaSeg[i].unidadesEntregar + ' und x ' + this.ArrayConsultaSeg[i].VlorProductoPrincipal;
    }

    var toppings: string = "";
    if (this.ArrayConsultaSeg[i].producto_add != '' && this.ArrayConsultaSeg[i].producto_add != null && this.ArrayConsultaSeg[i].producto_add != undefined) {
      toppings = '' + this.ArrayConsultaSeg[i].producto_addBr.replaceAll("|", "<br>");
    }

    var Img: string = '';
    if (this.ArrayConsultaSeg[i].imagen_evidencia != null && this.ArrayConsultaSeg[i].imagen_evidencia != '' && this.ArrayConsultaSeg[i].imagen_evidencia != undefined) {
      Img = this.ArrayConsultaSeg[i].imagen_evidencia;
    } else {
      Img = '../../../../assets/ImagenesAgroApoya2Adm/PendienteEntrega.jpg';
    }

    var TotalPagar: string = this.ArrayConsultaSeg[i].Vlor_PagarForm;


    var Pago: string = this.ArrayConsultaSeg[i].descTipoPago
    var Telefono: string = '' + this.ArrayConsultaSeg[i].CELULAR_PERSONA;
    var ValorAPagar: string = '' + this.ArrayConsultaSeg[i].Vlor_PagarForm;
    var Estado: string = '' + this.ArrayConsultaSeg[i].descEstado;

    var Observaciones: string = '';

    if (this.ArrayConsultaSeg[i].observacionesCliente != null && this.ArrayConsultaSeg[i].observacionesCliente != '' && this.ArrayConsultaSeg[i].observacionesCliente != undefined) {
      Observaciones = this.ArrayConsultaSeg[i].observacionesCliente;
    } else {
      Observaciones = 'Pendiente';
    }

    let Html =
      '<div>' +
      '<div class="row col-12" style="overflow: auto; max-height: 320px; width: 630px;">' +
      '<div class="col-sm-12">' +
      '<h1 id="firstHeading" class="firstHeading">' + NomCliente + '</h1>' +
      '<h2 id="firstHeading" class="firstHeading">' + Estado + '</h2>' +
      '</div>' +
      '<hr>' +
      '<div class="col-sm-6">' +
      '<div id="content">' +
      '<div id="bodyContent">' +
      '<p style="font-size: 14px;">' +
      '<b>Dirección: </b> ' + Direccion + '' +
      '<br>' +
      '<b>Valor A Pagar: </b>' + ValorAPagar + '' +
      '<br>' +
      '<b>Fecha Entrega: </b>' + FechaEntrega + '' +
      '<br>' +
      '<b>Metodo de pago: </b>' + Pago + '' +
      '<br>' +
      '<b>Productos: </b>';
    if (this.ArrayConsultaSeg[i].unidadesEntregar > 0) {
      Html = Html + '<br>' + Producto + '';
    }
    if (this.ArrayConsultaSeg[i].producto_add != '' && this.ArrayConsultaSeg[i].producto_add != null && this.ArrayConsultaSeg[i].producto_add != undefined) {
      Html = Html + '<br>' + toppings + '';
    }

    Html = Html +
      '<br>' +
      '<b style="font-weight: bold; font-size: 15px;">Total pago: </b> <span style="color: forestgreen; font-weight: bold; font-size: 15px;">' + TotalPagar + '</span>' +
      '<br>' +
      '<b>Numero de telefono: </b>' + Telefono + '';

    if (this.ArrayConsultaSeg[i].observacionesCliente != null && this.ArrayConsultaSeg[i].observacionesCliente != '' && this.ArrayConsultaSeg[i].observacionesCliente != undefined) {
      Html = Html + '<b>Observación: </b>' + Observaciones + '' +
        '<br>';
    }


    Html = Html + '</p>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="col-sm-6" style="height: 50%;">' +
      '<img src="' + Img + '" style="width: 70%; height:200px; object-fit: cover;">' +
      '</div>' +
      '</div>' +
      '</div>';



    for (var x = 0; x < this.markers.length; x++) {
      if (i == x) {

        this.infoWindow.close();
        this.infoWindow.setContent(Html);
        this.infoWindow.open(this.markers[i].getMap(), this.markers[i]);
      }
    }
  }


  lastPanelId: string = '';
  defaultPanelId: string = "panel2";
  panelShadow($event: NgbPanelChangeEvent, shadow: any) {

    const { nextState } = $event;

    const activePanelId = $event.panelId;
    const activePanelElem = document.getElementById(activePanelId);

    if (!shadow.isExpanded(activePanelId)) {
      //activePanelElem.parentElement.classList.add("open");
    }

    if (!this.lastPanelId) this.lastPanelId = this.defaultPanelId;

    if (this.lastPanelId) {
      const lastPanelElem = document.getElementById(this.lastPanelId);

      if (this.lastPanelId === activePanelId && nextState === false)
        activePanelElem?.parentElement?.classList.remove("open");
      else if (this.lastPanelId !== activePanelId && nextState === true) {
        //lastPanelElem.parentElement.classList.remove("open");
      }

    }

    this.lastPanelId = $event.panelId;
  }

  ConsultarConductores() {
    this.ServiciosValorar.ConsultaConductoresAsociados('1', this.SelectorOferta, this.SelectorSector, '2').subscribe(Resultado => {
      this.ArrayConductores = Resultado
    })
  }
  ObjetEntrega: any;
  TotalCosolidado: number = 0;

  ConsReporteEntregas(idGrupo: string) {
    this.TotalContra = 0
    this.TotalElect = 0
    this.ServiciosValorar.ConsultaReporteEntregas('1', idGrupo).subscribe(Resultado => {
      console.log(Resultado)
      if (Resultado.length > 0) {
        this.ArrayVentas = []
        this.ArrayReporte = Resultado;
        var NumRecibidos: number = 0;
        var NumPendientes: number = 0;
        var NumDevuelto: number = 0;
        var NumTotal: number = 0;
        var ValEntregado: number = 0;
        var ValPendiente: number = 0;
        var ValDevuelto: number = 0;
        var ValTotalRecaudo: number = 0;
        for (var i = 0; this.ArrayReporte.length > i; i++) {
          this.TotalContra = this.TotalContra + Number(this.ArrayReporte[i].VLRRECAUDADOCONTRAENTREGA);
          this.TotalElect = this.TotalElect + Number(this.ArrayReporte[i].VLRRECAUDADOELECTRONICO)
          if (this.ArrayReporte[i].VLR_RECAUDADO == null) {
            this.ArrayReporte[i].VLR_RECAUDADO = '0'
          }
          if (this.ArrayReporte[i].VLR_PENDIENTE_RECAUDO == null) {
            this.ArrayReporte[i].VLR_PENDIENTE_RECAUDO = '0'
          }
          if (this.ArrayReporte[i].VLOR_DEVOLUCION == null) {
            this.ArrayReporte[i].VLOR_DEVOLUCION = '0'
          }
          if (this.ArrayReporte[i].VLOR_TTL_RECAUDAR == null) {
            this.ArrayReporte[i].VLOR_TTL_RECAUDAR = '0'
          }
          NumRecibidos = NumRecibidos + parseInt(this.ArrayReporte[i].CANTIDAD_ENTREGADA);
          NumPendientes = NumPendientes + parseInt(this.ArrayReporte[i].CANTIDAD_PENDIENTE);
          NumDevuelto = NumDevuelto + parseInt(this.ArrayReporte[i].CANTIDAD_DEVUELTA);
          NumTotal = NumTotal + parseInt(this.ArrayReporte[i].CANTIDAD_TOTAL);
          ValEntregado = ValEntregado + parseInt(this.ArrayReporte[i].VLR_RECAUDADO);
          ValPendiente = ValPendiente + parseInt(this.ArrayReporte[i].VLR_PENDIENTE_RECAUDO);
          ValDevuelto = ValDevuelto + parseInt(this.ArrayReporte[i].VLOR_DEVOLUCION);
          ValTotalRecaudo = ValTotalRecaudo + parseInt(this.ArrayReporte[i].VLOR_TTL_RECAUDAR);
          const fila = {
            "name": this.ArrayReporte[i].PRODUCTO, "series":
              [
                {
                  "name": "Entregado",
                  "value": this.ArrayReporte[i].CANTIDAD_ENTREGADA
                },
                {
                  "name": "Pendiente",
                  "value": this.ArrayReporte[i].CANTIDAD_PENDIENTE
                },
                {
                  "name": "Devuelto",
                  "value": this.ArrayReporte[i].CANTIDAD_DEVUELTA
                }
              ]
          }
          this.ArrayVentas.push(fila)
          const fila2 = {
            "name": this.ArrayReporte[i].PRODUCTO, "series":
              [
                {
                  "name": "Recaudado",
                  "value": Number(this.ArrayReporte[i].VLR_RECAUDADO)
                },
                {
                  "name": "Pendiente",
                  "value": this.ArrayReporte[i].VLR_PENDIENTE_RECAUDO
                },
                {
                  "name": "Devuelto",
                  "value": Number(this.ArrayReporte[i].VLOR_DEVOLUCION)
                }
              ]
          }
          this.ArrayValores.push(fila2)
        }
        this.ObjetEntrega = [
          {
            TotalRecibido: NumRecibidos,
            TotalPendiente: NumPendientes,
            TotalDevuelto: NumDevuelto,
            TotalProducto: NumTotal
          },
          {
            ValTotalEntregado: ValEntregado,
            ValTotalPendiente: ValPendiente,
            ValTotalDevuelto: ValDevuelto,
            ValTotalRecaudo: ValTotalRecaudo
          }
        ];
        console.log('////Objeto Entregas')
        console.log(this.ObjetEntrega)


        this.TotalCosolidado = ValTotalRecaudo;
        this.Centramapa({ address: this.NomDepa + ',' + this.NomCiudad })
      } else {
        this.modalService.dismissAll()
        this.TituloModal = 'AgroApoya2';
        this.Mensaje = 'El grupo seleccionado tiene entregas.'
        this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title' });
      }

    })

  }

  CambioDetalle(Bandera: string) {
    this.Detalle = Bandera;
    this.ValidaInsertSecs == '1'
    this.Centramapa({ address: this.NomDepa + ',' + this.NomCiudad });
  }
  RezizePantalla(Tamanio: number) {
    this.viewBar = [Tamanio, 200];
  }


  //#region MapaRutaSugerida
  CargarRutaSugerida() {
    this.ServiciosValorar.ConsultaSeguimientoEntregas('1', this.IdGrupo).subscribe(Resultado => {
      this.modalService.open(this.ModalMapaSugerido, { size: 'xl', centered: true });
      this.ArrayDataRutaSugerida = Resultado;
      if (this.ArrayDataRutaSugerida.length > 0) {
        this.CentramapaRutAsugerida({ address: this.NomDepa + ',' + this.NomCiudad });
      }
    });
  }
  CentramapaRutAsugerida(request: google.maps.GeocoderRequest): void {
    var lat: number;
    var long: number;
    this.geocoder.geocode(request).then((result) => {
      const { results } = result;
      //this.AgregarSitios();
      var auxcoor = this.ArrayDataRutaSugerida[0].COORDENADAS_ENTR.split(",");
      lat = parseFloat(auxcoor[0].trim());
      long = parseFloat(auxcoor[1].trim());
      this.map = new google.maps.Map(
        document.getElementById("mapaRutaSugerida") as HTMLElement,
        {
          center: { lat: lat, lng: long },
          zoom: 11,
        }
      );


      this.AgregarSitiosMapSugerido();
      return results;
    })
      .catch((e) => {
      });
  }
  AgregarSitiosMapSugerido() {
    const features = [];
    const Polylines = [];
    this.markers = [];
    var lat: number;
    var long: number;
    for (var i = 0; i < this.ArrayDataRutaSugerida.length; i++) {
      var auxcoor = this.ArrayDataRutaSugerida[i].COORDENADAS_ENTR.split(",");
      lat = parseFloat(auxcoor[0]);
      long = parseFloat(auxcoor[1]);
      features.push({ position: new google.maps.LatLng(lat, long), Estado: this.ArrayDataRutaSugerida[i].ESTDO, NomCli: this.ArrayDataRutaSugerida[i].NOMBRES_PERSONA + ' ' + this.ArrayDataRutaSugerida[i].APELLIDOS_PERSONA, IdCompra: this.ArrayDataRutaSugerida[i].ID_CARRO });
      Polylines.push({ lat: lat, lng: long });
    }
    for (let i = 0; i < features.length; i++) {
      var icon = "../../../../assets/ImagenesAgroApoya2Adm/pinSugerido.png";

      const labelOptions: google.maps.MarkerLabel = {
        text: '' + (i + 1), // texto del label
        color: '#fff', // Color del texto
        fontWeight: 'bold', // Peso de la fuente
        fontSize: '12px', // Tamaño de la fuente
        fontFamily: 'Arial', // Familia de la fuente
        className: 'textPin' // Clase CSS personalizada
      };

      var marker = new google.maps.Marker({
        title: features[i].NomCli,
        animation: google.maps.Animation.DROP,
        position: features[i].position,
        map: this.map,
        icon: icon,
        zIndex: i,
        label: labelOptions
      });
      this.markers.push(marker);
    }

    const flightPath = new google.maps.Polyline({
      path: Polylines,
      geodesic: true,
      strokeColor: "#397c97",
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });

    flightPath.setMap(this.map);
  }
  //#endregion MapaRutaSugerida

  SeleccionGrupo(Detalle: any) {

    this.IdGrupo = Detalle.idgrupomilla
    this.modalService.dismissAll()
    this.ConsReporteEntregas(Detalle.idgrupomilla);
    this.ConsultaDetalle(Detalle.idgrupomilla);
    this.ConsultaValoresTotales(Detalle.idgrupomilla)
    this.VerBtnMapSugerido = true;
    this.ValidaFiltros = true;
    this.VerBtnDescargarPdf = this.ConductorSelect !== '0';
    this.Detalle = '1';
    this.ValidaInsertSec = '1';
    this.ValidaInsertSecs = '1';
  }

  ConsultaDetalle(IdGrupo: string) {
    this.ServiciosValorar.ConsultaDetalle('1', IdGrupo).subscribe(Resultado => {
      console.log(Resultado)
      this.ArrayConsultaSeg = Resultado;
    })
  }

  ConsultaValoresTotales(idgrupomilla: string) {
    this.ServiciosValorar.ConsultaTotales('1', idgrupomilla).subscribe(Resultado => {
      this.ArrayTotales = Resultado;
      console.log(Resultado);
    })
  }

  GenerarExcel(Reporte: string) {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Reporte " + Reporte);
    let header;
    let temp = []
    if (Reporte == 'Ventas') {
      header = [
        "PRODUCTO",
        "CANTIDAD ENTREGADO",
        "CANTIDAD PENDIENTE",
        "CANTIDAD DEVUELTO",
        "CANTIDAD TOTAL",
        "VALOR ENTREGADO",
        "VALOR PENDIENTE",
        "VALOR DEVUELTO",
        "VALOR CONTRAENTREGA",
        "VALOR ELECTRONICO",
        "TOTAL RECAUDAR"
      ];
    } else if (Reporte == 'Detalle') {
      header = [
        "CLIENTE",
        "CELULAR",
        "DIRECCIÓN",
        "ESTADO",
        "TIPO PAGO",
        "ORDEN ENTREGA",
        "FECHA",
        "VALOR PRODUCTOS",
        "DOMICILIO",
        "VALOR TOTAL",
        "PRODUCTOS",
        "CONDUCTOR"
      ];
    }

    worksheet.addRow(header);
    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1', 'N1', 'O1', 'P1', 'Q1'].map(key => {
      worksheet.getCell(key).fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: '397c97' },
        bgColor: { argb: '397c97' }
      };
      worksheet.getCell(key).font = {
        color: { argb: 'FFFFFF' }
      };
    });
    worksheet.columns = [
      { width: 15, key: 'A' }, { width: 25, key: 'B' }, { width: 25, key: 'C' }, { width: 25, key: 'D' }, { width: 25, key: 'E' }, { width: 15, key: 'F' }, { width: 25, key: 'G' }, { width: 25, key: 'H' }, { width: 15, key: 'I' }, { width: 25, key: 'J' },
      { width: 15, key: 'K' }, { width: 25, key: 'L' }, { width: 25, key: 'M' }, { width: 25, key: 'N' }, { width: 25, key: 'O' }, { width: 15, key: 'P' }, { width: 25, key: 'Q' }, { width: 25, key: 'R' }, { width: 25, key: 'S' }, { width: 25, key: 'T' },
      { width: 15, key: 'U' }, { width: 25, key: 'V' }, { width: 25, key: 'W' }, { width: 25, key: 'X' }, { width: 25, key: 'Y' }, { width: 15, key: 'Z' }, { width: 25, key: 'AA' }, { width: 25, key: 'AB' }, { width: 25, key: 'AC' }, { width: 25, key: 'AD' },
      { width: 15, key: 'AE' }
    ];
    worksheet.autoFilter = 'A1:AE1';
    if (Reporte == 'Ventas') {
      for (let fila of this.ArrayReporte) {
        temp = []
        temp.push(fila["PRODUCTO"])
        temp.push(fila["CANTIDAD_ENTREGADA"])
        temp.push(fila["CANTIDAD_PENDIENTE"])
        temp.push(fila["CANTIDAD_DEVUELTA"])
        temp.push(fila["CANTIDAD_TOTAL"])
        temp.push(this.FormatoValores('USD', fila["VLR_RECAUDADO"]))
        temp.push(this.FormatoValores('USD', fila["VLR_PENDIENTE_RECAUDO"]))
        temp.push(this.FormatoValores('USD', fila["VLOR_DEVOLUCION"]))
        temp.push(this.FormatoValores('USD', fila["VLRRECAUDADOCONTRAENTREGA"]))
        temp.push(this.FormatoValores('USD', fila["VLRRECAUDADOELECTRONICO"]))
        temp.push(this.FormatoValores('USD', fila["VLOR_TTL_RECAUDAR"]))
        worksheet.addRow(temp)
      }
    } else if (Reporte == 'Detalle') {
      for (let fila of this.ArrayConsultaSeg) {
        temp = []
        temp.push(fila["NOMBRES_PERSONA"])
        temp.push(fila["CELULAR_PERSONA"])
        temp.push(fila["DRCCION"])
        temp.push(fila["descEstado"])
        temp.push(fila["descTipoPago"])
        temp.push(fila["orden"])
        temp.push(fila["FechaEntrega"])
        temp.push(this.FormatoValores('USD', fila["ValorPagarSinDomicilio"]))
        temp.push(this.FormatoValores('USD', fila["ValorDomicilio"]))
        temp.push(this.FormatoValores('USD', fila["ValorTotalPagar"]))
        temp.push(fila["TodosLosProductos"])
        temp.push(fila["NMBRE_CNDCTOR"])
        worksheet.addRow(temp)
      }
    }

    let fname = "Reporte " + Reporte;
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname + '.xlsx');
      console.log('generando...')
    });
  }

  FormatoValores(currency: string, value: number) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      minimumFractionDigits: 2,
      currency
    })
    return formatter.format(value)
  }

  InfoConductor() {
    this.ServiciosValorar.ConsultaGeneralTrans('1', this.IdGrupo).subscribe(Resultado => {
      if (Resultado.length > 0) {
        this.ArrayInfoGeneral = Resultado;
      }
    })
    this.ServiciosValorar.ConsultaGeneralTransporte('1', this.IdGrupo).subscribe(Resultado => {
      if (Resultado.length > 0) {
        console.log('/////////')
        console.log(Resultado)
        this.ArrayInfoGeneralTrans = Resultado;
      }
    })
    this.modalService.open(this.ModalTransporte, { size: 'lg', centered: true });
  }




}
