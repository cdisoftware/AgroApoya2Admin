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

@Component({
  selector: 'app-seguimientos',
  templateUrl: './seguimientos.component.html',
  styleUrls: ['./seguimientos.component.css']
})
export class SeguimientosComponent implements AfterContentInit, OnInit {
  @ViewChild('ModalMensaje', { static: false }) ModalMensaje: any;
  @ViewChild('ModalMapaSugerido', { static: false }) ModalMapaSugerido: any;

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
  keywordOferta: string = '';
  SelectorOferta: string = '0';
  OfertaSelect: string = '';
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
  viewBar: [number, number] = [1000, 200];
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
    doc.save('Seguimiento - ' + this.OfertaSelect + "_" +  this.Fecha + '.pdf')
  }

  ConsultaTransportista(idconductor: string, idtransportista: string) {
    this.ServiciosValorar.ConsultaDetalleCond('1', idconductor, idtransportista).subscribe(Resultado => {
      this.ArrayConductor = Resultado
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
      this.ArrayOferta = Resultado;
      this.keywordOferta = 'Producto';
    })
  }
  LimpiaOferta(Valor: string) {
    this.Oferta = Valor;
    this.SelectorOferta = '0';
    this.selecsector = '0'
    this.ValidaInsertSec = '0';
    this.LimpiaSector('');
    this.ArrayConductor = []
  }
  selectOfertaFiltro(item: any) {
    this.SelectorOferta = item.cd_cnsctvo.toString();
    this.OfertaSelect = item.Producto;
    this.selecsector = '1'
    this.ConsultaSectores(item.cd_cnsctvo);
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
      this.ServiciosValorar.ConsultaSeguimientoEntregas('1', '1').subscribe(Resultado => {
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
    }
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
    this.ValorTotalCompra = Entrega.VLOR_PGAR;
    this.NumProductos = 0;
    this.TituloModal = 'Detalle Entregas'
    var IdGrupo = Entrega.IdGrupoMilla
    var IdCarro = Entrega.ID_CARRO
    this.ServiciosValorar.ConsultaDetalleEntregas('1', IdCarro).subscribe(Resultado => {
      this.ArrayDetalle = Resultado;
      for (var i = 0; i < this.ArrayDetalle.length; i++) {
        this.NumProductos = this.NumProductos + this.ArrayDetalle[i].Cantidad
      }
    })
    this.modalService.open(TemplateDetalle, { size: 'md', centered: true });
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

      this.ValorDomicilio += Number(this.ArrayConsultaSeg[i].VLOR_DOMICILIO);
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
  ConsReporteEntregas() {
    this.ServiciosValorar.ConsultaReporteEntregas('1', '20').subscribe(Resultado => {
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
        NumRecibidos = NumRecibidos + parseInt(this.ArrayReporte[i].CANTIDAD_ENTREGADA.toString());
        NumPendientes = NumPendientes + parseInt(this.ArrayReporte[i].CANTIDAD_PENDIENTE.toString());
        NumDevuelto = NumDevuelto + parseInt(this.ArrayReporte[i].CANTIDAD_DEVUELTA.toString());
        NumTotal = NumTotal + parseInt(this.ArrayReporte[i].CANTIDAD_TOTAL.toString());

        ValEntregado = ValEntregado + parseInt(this.ArrayReporte[i].VLR_RECAUDADO.toString());
        ValPendiente = ValPendiente + parseInt(this.ArrayReporte[i].VLR_PENDIENTE_RECAUDO.toString());
        ValDevuelto = ValDevuelto + parseInt(this.ArrayReporte[i].VLOR_DEVOLUCION.toString());
        ValTotalRecaudo = ValTotalRecaudo + parseInt(this.ArrayReporte[i].VLOR_TTL_RECAUDAR.toString());




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
                "value": this.ArrayReporte[i].VLR_RECAUDADO
              },
              {
                "name": "Pendiente",
                "value": this.ArrayReporte[i].VLR_PENDIENTE_RECAUDO
              },
              {
                "name": "Devuelto",
                "value": this.ArrayReporte[i].VLOR_DEVOLUCION
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
      this.TotalCosolidado = ValTotalRecaudo;
      this.Centramapa({ address: this.NomDepa + ',' + this.NomCiudad })
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
    const datos = {
      coordernadas: "0"
    }
    this.ServiciosValorar.ConsultaSeguimientoEntregas('2', '1').subscribe(Resultado => {
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

}

